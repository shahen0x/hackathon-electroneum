"use node"

import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import crypto from "crypto";


const BOT_TOKEN = process.env.BOT_TOKEN as string;

if (!BOT_TOKEN) {
	console.error("No bot token found");
}

export const verifyTelegramHash = internalAction({
	args: {
		telegramInitData: v.string(),
	},
	handler: (_, args) => {

		const { telegramInitData } = args;
		const urlParams = new URLSearchParams(telegramInitData);

		// Extract the hash from parameters and remove it from urlParams
		const hash = urlParams.get("hash");
		urlParams.delete("hash");

		// Sort parameters alphabetically (a -> z)
		urlParams.sort();

		// Construct data check string
		let dataCheckString = "";
		for (const [key, value] of urlParams.entries()) {
			dataCheckString += key + "=" + value + "\n";
		}
		dataCheckString = dataCheckString.slice(0, -1);

		// Generate secret key using HMAC-SHA256 with "WebAppData" as key
		const secretKey = new Uint8Array(crypto.createHmac('sha256', "WebAppData")
			.update(BOT_TOKEN)
			.digest());

		// Generate expected hash using HMAC-SHA256
		const expectedHash = crypto.createHmac('sha256', new Uint8Array(secretKey))
			.update(dataCheckString)
			.digest('hex');

		// Validate the received hash
		if (expectedHash !== hash) {
			console.error("Invalid signature");
			return null;
		}

		// Get and return Telegram user
		const telegramUser = urlParams.get("user");
		if (telegramUser) {
			try {
				const user: {
					id: number;
					first_name: string;
					last_name?: string;
					username?: string;
					language_code?: string;
					allows_write_to_pm?: boolean;
					photo_url?: string;
				} = JSON.parse(telegramUser);

				return user;
			} catch (error) {
				console.error("Failed to parse Telegram user data:", error);
				return null;
			}
		}

		// Return null to prevent returning undefined
		return null;
	},
});