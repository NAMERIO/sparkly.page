import { defineConfig } from "drizzle-kit";

export default defineConfig({
	dialect: "postgresql",
	schema: "src/db/schema.ts",
	out: "./src/db/drizzle",
	dbCredentials: {
		url: "postgresql://cordpage_owner:npg_0hrLDkACUOM4@ep-weathered-wildflower-a5cyimnr-pooler.us-east-2.aws.neon.tech/cordpage?sslmode=require"!,
	},
});
