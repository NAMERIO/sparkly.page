import { deleteSessionTokenCookie, validateSessionToken } from "@/lib/auth";
import type { Context, Next } from "hono";
import { getCookie, setCookie } from "hono/cookie";

export const authMiddleware = async (c: Context, next: Next) => {
	try {
		const sessionToken = getCookie(c, "session") ?? null;

		if (!sessionToken) {
			c.set("user", null);
			c.set("session", null);
			return c.json({ err: "Authentication failed" }, 401);
		}
		const { session, user } = await validateSessionToken(sessionToken);

		if (!user) {
			return c.json({ err: "Authentication failed" }, 401);
		}

		if (session) {
			setCookie(c, "session", sessionToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "lax",
				path: "/",
				expires: session.expiresAt,
			});
		} else {
			deleteSessionTokenCookie(c);
		}

		c.set("user", user);
		c.set("session", session);
		return next();
	} catch (err) {
		console.warn("Error trying to authenticate user", err);
		return c.json({ error: "Authentication failed" }, 500);
	}
};
