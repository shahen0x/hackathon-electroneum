import { query } from "./_generated/server";

export const getAllPools = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db.query("pools").collect();
	},
});