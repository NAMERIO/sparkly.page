import { defineConfig } from "drizzle-kit";
import { DATABASE_URL } from "./urls";

export default defineConfig({
	dialect: "postgresql",
	schema: "src/db/schema.ts",
	out: "./src/db/drizzle",
	dbCredentials: {
		url: DATABASE_URL!,
	},
});
