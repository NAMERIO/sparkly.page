import { setSessionTokenCookie } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { db } from "../../../db";
import { usersTable } from "../../../db/schema";

export const MockRouter = new Hono();

export const MOCK_USER_ID = "MOCK_USER_ID";

MockRouter.get("/", async (c) => {
	try {
		const existingUser = await db.query.usersTable.findFirst({
			where: eq(usersTable.id, MOCK_USER_ID),
			columns: {
				id: true,
			},
		});

		if (existingUser) {
			await setSessionTokenCookie(existingUser.id, c);
			return c.redirect("/");
		}

		await db.insert(usersTable).values({
			id: MOCK_USER_ID,
			displayName: MOCK_USER_ID,
			username: MOCK_USER_ID,
		});

		await setSessionTokenCookie(MOCK_USER_ID, c);
		return c.redirect("/");
	} catch (err) {
		console.warn("/api/auth/mock: Failed to create user", err);
		return c.json({}, 500);
	}
});
