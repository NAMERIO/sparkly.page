import { zValidator } from "@hono/zod-validator";
import type { z } from "zod";

/**
 * middleware for validating JSON request parameters against a Zod schema.
 */
export function validateParams<Schema extends z.ZodSchema>(
	schema: Schema,
	response?: object,
) {
	return zValidator("json", schema, (result, c) => {
		if (!result.success) {
			return c.json(
				response ?? {
					message: "Invalid params",
				},
				400,
			);
		}
	});
}
