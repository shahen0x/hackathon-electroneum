import { v } from "convex/values";
import { query } from "./_generated/server";


export const getPoolOwners = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db.query("poolOwners").collect();
	},
});

export const getPoolOwnerById = query({
	args: {
		poolOwnerId: v.id("poolOwners")
	},
	handler: async (ctx, args) => {
		const { poolOwnerId } = args;
		return await ctx.db.get(poolOwnerId);
	},
});

export const getActivePoolOwners = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db.query("poolOwners")
		.withIndex("byDisabled", (q) => q.eq("disabled", false))
		.filter(q => q.eq(q.field('status'), 'active'))
		.collect();
	},
});


