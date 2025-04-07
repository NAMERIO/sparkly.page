import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";
import { validateParams } from "../utils";

export const PublicRouter = new Hono();

PublicRouter.post(
	"/check-username",
	validateParams(
		z.object({
			username: z.string().min(1).max(20),
		}),
	),
	async (c) => {
		try {
			const { username } = c.req.valid("json");

			const existingUser = await db.query.usersTable.findFirst({
				where: eq(usersTable.username, username),
				columns: {
					id: true,
				},
			});

			if (existingUser) {
				return c.json({
					available: false,
					message: `Username ${username} is already taken.`,
				});
			}

			return c.json({
				available: true,
				message: `Username ${username} is available.`,
			});
		} catch (err) {
			console.warn("/api/check-username: Error checking username", err);
			return c.json(
				{ available: false, message: "An unexpected error occurred." },
				500,
			);
		}
	},
);
