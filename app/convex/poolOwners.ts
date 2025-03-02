import { query } from "./_generated/server";


export const getPoolOwners = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db.query("poolOwners").collect();
	},
});

export const getActivePoolOwners = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db.query("poolOwners")
		.filter(q => q.eq(q.field('status'), 'active'))
		.collect();
	},
});


