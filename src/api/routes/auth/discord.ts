import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { setSessionTokenCookie } from "@/lib/auth";
import { Discord, OAuth2RequestError, generateState } from "arctic";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { getCookie, setCookie } from "hono/cookie";

const baseUrl = process.env.URL ? `https://${process.env.URL}` : "http://localhost:3000";

export const discord = new Discord(
	process.env.DISCORD_CLIENT_ID!,
	process.env.DISCORD_SECRET_ID!,
	`${baseUrl}/api/auth/discord/callback`,
);

const stateCookieName = "discord_oauth_state";

export const DiscordRouter = new Hono();

DiscordRouter.get("/", async (c) => {
	if (!process.env.DISCORD_CLIENT_ID || !process.env.DISCORD_SECRET_ID) {
		return c.json({ err: "Missing Discord credentials" }, 500);
	}
	const state = generateState();

	const url = await discord.createAuthorizationURL(state, {
		scopes: ["identify"],
	});

	setCookie(c, stateCookieName, state, {
		path: "/",
		secure: process.env.NODE_ENV === "production",
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: "Lax",
	});

	url.searchParams.append("prompt", "none");
	return c.redirect(url.toString());
});

DiscordRouter.get("/callback", async (c) => {
	const code = c.req.query("code")?.toString() ?? null;
	const state = c.req.query("state")?.toString() ?? null;
	const storedState = getCookie(c)[stateCookieName] ?? null;
	if (!code || !state || !storedState || state !== storedState) {
		return c.json({}, 400);
	}

	try {
		const tokens = await discord.validateAuthorizationCode(code);

		const discordUserResponse = await fetch(
			"https://discord.com/api/users/@me",
			{
				headers: {
					Authorization: `Bearer ${tokens.accessToken}`,
				},
			},
		);

		const respnose: {
			username: string;
			id: string;
		} = await discordUserResponse.json();

		const { id, username } = respnose;

		const existingUser = await db.query.usersTable.findFirst({
			where: eq(usersTable.id, id),
			columns: {
				id: true,
			},
		});

		if (existingUser) {
			await setSessionTokenCookie(existingUser.id, c);
			return c.redirect("/");
		}

		await db.insert(usersTable).values({ id, username, displayName: username });

		await setSessionTokenCookie(id, c);
		return c.redirect("/");
	} catch (err) {
		console.warn("/api/auth/discord: Failed to create user", err);
		if (
			err instanceof OAuth2RequestError &&
			err.message === "bad_verification_code"
		) {
			// invalid code
			return c.json({ err: "bad_verification_code" }, 400);
		}
		return c.json({}, 500);
	}
});
