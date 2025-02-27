import { query } from "./_generated/server";


export const getPoolOwners = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db.query("poolOwners").collect();
	},
});


