import { ConvexError, v } from "convex/values";
import { internalAction, internalMutation, query } from "./_generated/server";
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

		// Get the active cycle
		const activeCycle = await ctx.db
			.query("cycles")
			.withIndex("byActive", (q) => q.eq("active", true))
			.unique();
		if (!activeCycle) throw new ConvexError("No active cycle found.");

		// Filter active cycle
		const { _id, active, _creationTime, ...filteredActiveCycle } = activeCycle;

		// Get pool owners that are not disabled
		const poolOwners = await ctx.db
			.query("poolOwners")
			.withIndex("byDisabled", (q) => q.eq("disabled", false))
			.collect();
		if (!poolOwners) throw new ConvexError("An error occured while fetching pool owners.");

		// Filter active and upcoming pool owners
		const activePoolOwners = poolOwners.filter(poolOwner => poolOwner.status === "active");
		const upcomingPoolOwners = poolOwners.filter(poolOwner => poolOwner.status === "upcoming");

		// Lookup map for active pool owners
		const activePoolOwnersMap = new Map(activePoolOwners.map(poolOwner => [poolOwner._id, poolOwner]));

		// Get pools for the active cycle
		const pools = await ctx.db
			.query("pools")
			.withIndex("byCycle", (q) => q.eq("cycle", activeCycle._id))
			.collect();
		if (pools.length === 0) throw new ConvexError("An error occured while fetching pool.");

		// Filter pools to only include those with an active pool owner
		const activePools = pools
			.filter(pool => activePoolOwnersMap.has(pool.poolOwner))
			.map(pool => {
				const poolOwner = activePoolOwnersMap.get(pool.poolOwner);
				return {
					contractAddress: pool.contractAddress,
					tokenAddress: poolOwner?.tokenAddress,
					tokenLogo: poolOwner?.tokenLogo,
					tokenSymbol: poolOwner?.tokenSymbol,
					brandColor: poolOwner?.brandColor
				};
			});

		// Format upcomingPools with only required fields
		const upcomingPools = upcomingPoolOwners.map(poolOwner => ({
			tokenLogo: poolOwner.tokenLogo,
			tokenSymbol: poolOwner.tokenSymbol,
			brandColor: poolOwner.brandColor
		}));

		return {
			activeCycle: filteredActiveCycle,
			activePools,
			upcomingPools
		}
	}
});