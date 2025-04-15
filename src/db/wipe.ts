import { poolConnection } from ".";

async function dropDatabase() {
	try {
		await poolConnection.query(`DROP TABLE "public"."user" CASCADE`);
		await poolConnection.query(`DROP TABLE "public"."session" CASCADE`);

		console.log("Database wiped successfully");
	} catch (error) {
		console.error("Error dropping database:", error);
	} finally {
		await poolConnection.end();
	}
}

dropDatabase();
