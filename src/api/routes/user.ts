import { db } from "@/db";
import {
	type SessionTableSelect,
	type UsersTableInsert,
	type UsersTableSelect,
	usersTable,
} from "@/db/schema";
import { deleteSessionTokenCookie, invalidateSession } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { type Context, Hono } from "hono";
import { z } from "zod";
import { authMiddleware } from "../middleware";

export type HonoAuthWithContext = {
	Variables: {
		user: UsersTableSelect | null;
		session: SessionTableSelect | null;
	};
};

export const UserRouter = new Hono<HonoAuthWithContext>();

UserRouter.use(authMiddleware);

UserRouter.get("/protected", async (c) => {
	return c.json({
		message: "Hello Next.js!",
	});
});

const zUserDataRequest = z
	.object({
		displayName: z.string().min(1).max(20),
		description: z.string(),
		status: z.enum(["online", "idle", "dnd", "offline"]), 
		links: z.array(z.any()),
		roles: z.array(z.any()),
	})
	.partial();

UserRouter.post("/update-data", async (c) => {
	try {
		const user = c.get("user")!;
		const body = await c.req.json();

		const safeBody = zUserDataRequest.safeParse(body);

		if (!safeBody.success) {
			return c.json({}, 400);
		}

		const data: Partial<UsersTableInsert> = safeBody.data!;

		await db
			.update(usersTable)
			.set({
				...data,
			})
			.where(eq(usersTable.id, user.id));

		return c.json({}, 200);
	} catch (err) {
		console.warn("/api/update-user-data: Error updating user data", err);
		return c.json({}, 500);
	}
});

UserRouter.post("/logout", async (c) => {
	try {
		const session = c.get("session")!;

		await logoutUser(c, session.id);

		return c.json({}, 200);
	} catch (err) {
		console.warn("/api/logout: Error logging out", err);
		return c.json({}, 500);
	}
});

UserRouter.post("/delete", async (c) => {
	try {
		const user = c.get("user")!;
		const session = c.get("session")!;

		// logout out the user
		await logoutUser(c, session.id);

		// delete the account
		await db.delete(usersTable).where(eq(usersTable.id, user.id));

		return c.json({}, 200);
	} catch (err) {
		console.warn("/api/delete: Error deleting account", err);
		return c.json({}, 500);
	}
});

async function logoutUser(c: Context, sessionId: string) {
	await invalidateSession(sessionId);
	deleteSessionTokenCookie(c);
}
