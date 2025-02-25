import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server";


// Get the current authenticated user
export const getCurrentUser = query({
	handler: async (ctx) => {
		const userId = await getAuthUserId(ctx);
		if (userId === null) return null;

		return await ctx.db.get(userId);
	},
});