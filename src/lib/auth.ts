import { sha256 } from "@oslojs/crypto/sha2";
import {
	encodeBase32LowerCaseNoPadding,
	encodeHexLowerCase,
} from "@oslojs/encoding";
import { eq, lt } from "drizzle-orm";
import type { Context } from "hono";
import { setCookie } from "hono/cookie";
import { cookies } from "next/headers";
import { cache } from "react";
import { db } from "../db";
import {
	type SessionTableSelect,
	type UsersTableSelect,
	sessionTable,
	usersTable,
} from "../db/schema";

export const sessionCookieName = "auth_session";

export function generateSessionToken(): string {
	const bytes = new Uint8Array(20);
	crypto.getRandomValues(bytes);
	const token = encodeBase32LowerCaseNoPadding(bytes);
	return token;
}

export async function createSession(
	token: string,
	userId: string,
): Promise<SessionTableSelect> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session: SessionTableSelect = {
		id: sessionId,
		userId,
		expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
	};
	await db.insert(sessionTable).values(session);
	return session;
}

export async function validateSessionToken(
	token: string,
): Promise<SessionValidationResult> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const result = await db
		.select({ user: usersTable, session: sessionTable })
		.from(sessionTable)
		.innerJoin(usersTable, eq(sessionTable.userId, usersTable.id))
		.where(eq(sessionTable.id, sessionId));
	if (result.length < 1) {
		return { session: null, user: null };
	}
	const { user, session } = result[0];
	if (Date.now() >= session.expiresAt.getTime()) {
		await db.delete(sessionTable).where(eq(sessionTable.id, session.id));
		return { session: null, user: null };
	}
	if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
		session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
		await db
			.update(sessionTable)
			.set({
				expiresAt: session.expiresAt,
			})
			.where(eq(sessionTable.id, session.id));
	}
	return { session, user };
}

export async function invalidateSession(sessionId: string): Promise<void> {
	await db.delete(sessionTable).where(eq(sessionTable.id, sessionId));
}

export async function invalidateAllSessions(userId: string): Promise<void> {
	await db.delete(sessionTable).where(eq(sessionTable.userId, userId));
}

export async function deleteExpiredSessions(): Promise<void> {
	await db.delete(sessionTable).where(lt(sessionTable.expiresAt, new Date()));
}

export type SessionValidationResult =
	| { session: SessionTableSelect; user: UsersTableSelect }
	| { session: null; user: null };

export async function setSessionTokenCookie(userId: string, c: Context) {
	const sessionToken = generateSessionToken();
	const session = await createSession(sessionToken, userId);

	setCookie(c, "session", sessionToken, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/",
		expires: session.expiresAt,
	});
	return session;
}

export async function logoutUser(c: Context, sessionId: string) {
	await invalidateSession(sessionId);
	deleteSessionTokenCookie(c);
}

export function deleteSessionTokenCookie(c: Context) {
	setCookie(c, "session", "", {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/",
		maxAge: 0,
	});
}

export const validateRequest = cache(
	async (): Promise<{
		session: SessionTableSelect | null;
		user: UsersTableSelect | null;
		isAuthenticated: boolean;
	}> => {
		const cookieStore = await cookies();
		const sessionId = cookieStore.get("session")?.value ?? null;

		if (!sessionId) {
			return {
				user: null,
				session: null,
				isAuthenticated: false,
			};
		}

		const { session, user } = await validateSessionToken(sessionId);
		// next.js throws when you attempt to set cookie when rendering page;
		try {
			if (session) {
				const sessionToken = generateSessionToken();
				const session = await createSession(sessionToken, user.id);

				cookieStore.set("session", sessionToken, {
					httpOnly: true,
					secure: process.env.NODE_ENV === "production",
					sameSite: "lax",
					path: "/",
					expires: session.expiresAt,
				});
			} else {
				cookieStore.set("session", "", {
					httpOnly: true,
					secure: process.env.NODE_ENV === "production",
					sameSite: "lax",
					path: "/",
					maxAge: 0,
				});
			}
		} catch {}

		return {
			session,
			user,
			isAuthenticated: true,
		};
	},
);
