import { generateRandomString } from "@oslojs/crypto/random";

const random = {
	read(bytes: Uint8Array) {
		crypto.getRandomValues(bytes);
	},
};
export function generateId(length: number) {
	const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
	return generateRandomString(random, alphabet, length);
}
