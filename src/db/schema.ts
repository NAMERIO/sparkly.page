import type { UserRole } from "@/components/discord-card/roles";
import type { DiscordLink } from "@/components/user-card";
import { discordStatus } from "@/helpers/default-discord-user";
import { json, pgTable, text, timestamp } from "drizzle-orm/pg-core";

const DEFAULT_AVATAR =
	"https://cdn.discordapp.com/avatars/1140994582209904640/217657ddc4fcdfd2245a47844ff0d302.webp?size=160";

export const sessionTable = pgTable("session", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => usersTable.id, {
			onDelete: "cascade",
			onUpdate: "cascade",
		}),
	expiresAt: timestamp("expires_at").notNull(),
});

export type SessionTableSelect = typeof sessionTable.$inferSelect;

export const usersTable = pgTable("user", {
	id: text("id").primaryKey(),
	username: text("username").notNull(),
	displayName: text("display_name").notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	description: text("description")
		.notNull()
		.default("such description such wow"),
	status: text("status", {
		enum: [...Object.keys(discordStatus)] as [keyof typeof discordStatus],
	})
		.notNull()
		.default("online"),
	avatar: text("avatar").notNull().default(DEFAULT_AVATAR),
	roles: json("roles")
		.notNull()
		.$type<UserRole[]>()
		.default([
			{
				id: "1279788469752696883",
				name: "such role such wow",
				color: "rgb(221, 180, 16)",
			},
		]),
	links: json("links")
		.notNull()
		.$type<DiscordLink[]>()
		.default([
			{
				id: "2",
				name: "such link such wow",
				iconSrc: "/assets/d5719388ffc613da.svg",
				profileUrl: "https://open.spotify.com/",
			},
		]),
	bannedColor: text("banned_color").notNull().default("#4b8b8b"),
});

export type UsersTableInsert = typeof usersTable.$inferInsert;
export type UsersTableSelect = typeof usersTable.$inferSelect;
