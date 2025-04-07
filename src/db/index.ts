import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

export const DATABASE_URL =
	"postgresql://cordpage_owner:npg_0hrLDkACUOM4@ep-weathered-wildflower-a5cyimnr-pooler.us-east-2.aws.neon.tech/cordpage?sslmode=require";

export const poolConnection = new pg.Pool({
	connectionString: DATABASE_URL,
});

export const db = drizzle({
	client: poolConnection,
	schema,
});
