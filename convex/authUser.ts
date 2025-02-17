import { v } from "convex/values";
import { internalMutation, internalQuery } from "./_generated/server";
import { generateWallet } from "./telegramWallet";



export const getUserByTelegramId = internalQuery({
	args: {
		telegramId: v.number()
	},
	handler: async (ctx, args) => {
		const user = await ctx.db.query("users")
			.withIndex("byTelegramId", (q) =>
				q.eq("telegramId", args.telegramId)
			)
			.unique();

		return user?._id;
	}
})


export const createUserByTelegramId = internalMutation({
	args: {
		telegramId: v.number(),
		username: v.optional(v.string()),
		avatar: v.optional(v.string()),
		firstName: v.optional(v.string()),
		lastName: v.optional(v.string()),
	},
	handler: async (ctx, args) => {

		// Generate a new wallet for the user
		const { address, encryptedPrivateKey } = await generateWallet();

		// Store the private key in the database
		await ctx.db.insert("usersPrivateKeys", {
			walletAddress: address,
			privateKey: encryptedPrivateKey,
			identifier: "telegram",
		});

		// Insert the user into the database
		return await ctx.db.insert("users", {
			telegramId: args.telegramId,
			gamertag: args.username,
			avatar: args.avatar,
			name: args.firstName ? `${args.firstName} ${args.lastName}` : undefined,
			telegramWallet: address,
		})
	}
});