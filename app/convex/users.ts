import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";


// Get the current authenticated user
export const getCurrentUser = query({
	handler: async (ctx) => {
		const userId = await getAuthUserId(ctx);
		if (userId === null) return null;

		return await ctx.db.get(userId);
	},
});

export const setGamertag = mutation({
	args: {
		gamertag: v.string(),
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (userId === null) throw new Error("Wallet not authenticated");
		
		const {gamertag} = args;

		// 🛑🛑🛑 TODO: Treat gamertag 🛑🛑🛑

		await ctx.db.patch(userId, {
			gamertag
		});
	},
});