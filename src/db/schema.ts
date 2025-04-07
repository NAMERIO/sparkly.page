import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

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
});

export type UsersTableInsert = typeof usersTable.$inferInsert;
export type UsersTableSelect = typeof usersTable.$inferSelect;
