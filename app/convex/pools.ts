import { v } from "convex/values";
import { internalAction, internalMutation, query } from "./_generated/server";
import { asyncMap } from "convex-helpers";
import { schedule } from "./schema";

export const getAllPools = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db.query("pools").collect();
	},
});

export const getPool = query({
	args: {
		poolId: v.id("pools")
	},
	handler: async (ctx, args) => {
		const { poolId } = args;
		return await ctx.db.get(poolId);
	},
});


export const deployPoolContract = internalAction({
	args: {
		poolPrice: v.number(),
		commissionPercentage: v.number(),
		withdrawAddress: v.string(),
		tokenAddress: v.optional(v.string()),
		schedule
	},
	handler: async (ctx, args) => {
		// canJoinPool, poolPrice, commissionPercentage, withdrawAddress, enrollStartTime, playEndTime
		// convert price to wei
		// canJoinPool = true
		// commissionPercentage = 30;
		// tokenAddress, poolprice & payoutAddress from pool owners
		// schedule from cycle
		// based on token symbol "ETN" - deploy native, else deploy erc20

	},
});


export const createPool = internalMutation({
	args: {
		cycleId: v.id("cycles"),
		poolOwnerId: v.id("poolOwners"),
		contractAddress: v.string()
	},
	handler: async (ctx, args) => {

		const { cycleId, poolOwnerId, contractAddress } = args;

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
				status: poolOwner?.status,
				brandColor: poolOwner?.brandColor,
				contractAddress: pool.contractAddress,
				tokenSymbol: poolOwner?.tokenSymbol,
				tokenLogo: poolOwner?.tokenLogo,
				tokenAddress: poolOwner?.tokenAddress
			}
		});

		// Convert game lineup object to array
		const gameLineupArray = Object.keys(activeCycle.gameLineup)
			.filter(key => activeCycle.gameLineup[key as keyof typeof activeCycle.gameLineup] === true);

		return {
			week: activeCycle.week,
			schedule: activeCycle.schedule,
			gameLineup: gameLineupArray,
			pools: activePools
		}
	}
})