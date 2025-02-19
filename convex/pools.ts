import { v } from "convex/values";
import { Doc } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { asyncMap } from "convex-helpers";

export const createPools = mutation({
	handler: async (ctx) => {
		const pools = [
			{
				cycle: "j97f8gew8m1s3327ccr9xxqt2d7adhdd",
				poolOwner: "jn7dkhkckw978sqfd20mffd9b17acjgm",
				contractAddress: "0x0000000000000000000000000000000000000000",
			},
			{
				cycle: "j97f8gew8m1s3327ccr9xxqt2d7adhdd",
				poolOwner: "jn7cp6rww3336b4e82cvcckthx7acdj8",
				contractAddress: "0x0000000000000000000000000000000000000000",
			},
		] as Doc<"pools">[];
		for (const pool of pools) {
			await ctx.db.insert("pools", pool);
		}
	},
});


export const getActivePools = query({
	handler: async (ctx) => {

		const activeCycle = await ctx.db
			.query("cycles")
			.withIndex("byActive", (q) =>
				q.eq("active", true)
			)
			.unique();

		if (!activeCycle) {
			return null;
		}

		const pools = await ctx.db
			.query("pools")
			.withIndex("byCycle", (q) =>
				q.eq("cycle", activeCycle._id)
			)
			.collect();

		const activePools = await asyncMap(pools, async (pool) => {
			const poolOwner = await ctx.db.get(pool.poolOwner);

			return {
				contractAddress: pool.contractAddress,
				tokenSymbol: poolOwner?.tokenSymbol,
				tokenLogo: poolOwner?.tokenLogo,
				tokenAddress: poolOwner?.tokenAddress
			}
		});

		return activePools;
	},
})