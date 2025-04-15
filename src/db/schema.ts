import type { UserRole } from "@/components/discord-card/roles";
import type { Link } from "@/components/user-card";
import { discordStatus } from "@/helpers/default-discord-user";
import { json, pgTable, text, timestamp } from "drizzle-orm/pg-core";

const DEFAULT_AVATAR = "https://cdn.discordapp.com/avatars/1140994582209904640/217657ddc4fcdfd2245a47844ff0d302.webp?size=160";

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
	description: text("description").notNull().default(""),
	status: text("status", { enum: [...Object.keys(discordStatus)] as [keyof typeof discordStatus] }).notNull().default("online"),  
	avatar: text("avatar").notNull().default(DEFAULT_AVATAR),
	roles: json("roles").notNull().$type<UserRole[]>().default([        {
		id: "1279788469752696883",
		name: "Survevrs (level 5)",
		color: "rgb(221, 180, 16)",
		icon: "https://cdn.discordapp.com/role-icons/1279788469752696883/ff9f5b60d851aa50fc0e6e72cfce57da.webp?size=20&quality=lossless",
	},
	{
		id: "1306918227925794897",
		name: "Community Membrs",
		color: "rgb(196, 201, 206)",
		icon: undefined,
	},]),
	links: json("links")
		.notNull()
		.$type<Link[]>()
		.default([{
			id: "1",
			name: "jrdsctt#1859",
			iconSrc: "/assets/163c8cb9220efc74.svg",
			profileUrl: null,
		},
		{
			id: "2",
			name: "Jarid Scott Waniger",
			iconSrc: "/assets/d5719388ffc613da.svg",
			profileUrl: "https://open.spotify.com/user/jrdsctt",
		}]),
	bannedColor: text("banned_color").notNull().default("#4b8b8b"),
});

export type UsersTableInsert = typeof usersTable.$inferInsert;
export type UsersTableSelect = typeof usersTable.$inferSelect;
