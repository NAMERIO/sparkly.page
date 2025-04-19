import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";
import { DATABASE_URL } from "./urls";

export const poolConnection = new pg.Pool({
	connectionString: DATABASE_URL,
});

export const db = drizzle({
	client: poolConnection,
	schema,
});
