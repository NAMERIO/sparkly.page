import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";
import { validateParams } from "../utils";
import { zValidator } from "@hono/zod-validator";
import { sendAnalyticsEvent } from "@/helpers/analytics";

export const PublicRouter = new Hono();

PublicRouter.get(
  "/create_your_own_page",
  zValidator("param", z.object({
    userId: z.string()
  }), (result, c) => {
    if ( !result.success ) {
      return c.redirect('/')
    }
  }),
  async (c) => {
    try {
      const { userId } = c.req.valid("param");
      if ( userId ) {
        sendAnalyticsEvent({
          event: "create_your_own_page_clicked",
          properties: {
            userId,
            referral: "create_your_own_page",
            createdAt: new Date().toISOString()
          }
        });
      }

      return c.redirect('/')
    } catch(e) {
      return c.redirect('/')
    }
  }
)

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
