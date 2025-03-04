import { v } from "convex/values";
import { query } from "./_generated/server";




export const getCycleById = query({
	args: {
		cycleId: v.id("cycles")
	},
	handler: async (ctx, args) => {
		return await ctx.db.get(args.cycleId)
	}
})
