import { v } from "convex/values";
import { Doc } from "./_generated/dataModel";
import { internalMutation, query } from "./_generated/server";
import { asyncMap } from "convex-helpers";

export const getAllPools = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db.query("pools").collect();
	},
});

export const createMockPools = internalMutation({
	handler: async (ctx) => {
		const pools = [
			{
				cycle: "jx71bdzv3fyr92v43yt7grmf857azcag",
				poolOwner: "k97e0nzf8zxy634sd993vwthah7ayskc",
				contractAddress: "0x0000000000000000000000000000000000000000",
			},
			{
				cycle: "jx71bdzv3fyr92v43yt7grmf857azcag",
				poolOwner: "k9725nd6wmv9myrtbbec29114n7aybbw",
				contractAddress: "0x0000000000000000000000000000000000000000",
			},
		] as Doc<"pools">[];
		for (const pool of pools) {
			await ctx.db.insert("pools", pool);
		}
	},
});

export const createPool = internalMutation({
	args: {
		cycleId: v.id("cycles"),
		poolOwnerId: v.id("poolOwners"),
		contractAddress: v.string()
	},
	handler: async (ctx, args) => {

		const {cycleId, poolOwnerId, contractAddress} = args;

		return await ctx.db.insert("pools", {
			cycle: cycleId,
			poolOwner: poolOwnerId,
			contractAddress
		});
	},
});

export const getActiveCycleWithPools = query({
	handler: async (ctx) => {
		const activeCycle = await ctx.db
			.query("cycles")
			.withIndex("byActive", (q) =>
				q.eq("active", true)
			)
			.unique();


		if (!activeCycle) return null;

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

		return {
			week: activeCycle.week,
			schedule: activeCycle.schedule,
			gameLineup: activeCycle.gameLineup,
			pools: activePools
		}
	}
})