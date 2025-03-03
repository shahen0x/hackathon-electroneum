import { ConvexError, v } from "convex/values";
import { internalAction, internalMutation, query } from "./_generated/server";
import { schedule } from "./schema";
import { thirdwebClient, adminAccount } from "./authWallet";
import { deployPublishedContract } from "thirdweb/deploys";
import { chain } from "~/config/chain";
import { api, internal } from "./_generated/api";
import { toWei } from "thirdweb";
import { asyncMap } from "convex-helpers";

export const getAllPools = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db.query("pools").collect();
	},
});

export const getPoolsByCycle = query({
	args: {
		cycleId: v.id("cycles")
	},
	handler: async (ctx, args) => {
		const { cycleId } = args;
		return await ctx.db.query("pools")
		.withIndex("byCycleId", (q) => q.eq("cycleId", cycleId))
		.collect();
	},
});

export const getPoolByCycleAndOwner = query({
	args: {
		cycleId: v.id("cycles"),
		poolOwnerId: v.id("poolOwners")
	},
	handler: async (ctx, args) => {
		const { cycleId, poolOwnerId } = args;
		return await ctx.db.query("pools")
		.withIndex("byCycleId", (q) => q.eq("cycleId", cycleId))
		.filter(q => q.eq(q.field('poolOwner'), poolOwnerId))
		.unique();
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


export const deployPoolContracts = internalAction({
    args: {
		cycleId: v.id("cycles"),
		schedule
	},
    handler: async (ctx, args) => {
		const { cycleId, schedule } = args;

		const activePoolOwners = await ctx.runQuery(api.poolOwners.getActivePoolOwners);
		if (activePoolOwners.length === 0) throw new ConvexError({ message: "No active pool owners found." });

		await asyncMap(activePoolOwners, async (poolOwner) => {
			// Check if their pool already exist in this cycle
			const pool = await ctx.runQuery(api.pools.getPoolByCycleAndOwner, { cycleId, poolOwnerId: poolOwner._id });
			
			if (pool) {
				console.log(`Pool for ${poolOwner.tokenSymbol} already exists in cycle ${cycleId}`);
				return;
			}

			const contractParams : any = {
					canJoinPool_: true,
					poolPrice_: toWei(poolOwner.poolPrice.toString()),
					commissionPercentage_: 30,
					withdrawAddress_: poolOwner.payoutAddress,
					enrollStartTime_: schedule.cycleStart,
					playEndTime_: schedule.playtimeEnd,
			}

			// If not ETN, deploy erc20
			if (poolOwner.tokenSymbol !== "ETN") {
				contractParams.erc20TokenAddress_ = poolOwner.tokenAddress;
			}

			// try {
			// 	// Deploy contract
			// 	const contractAddress = await deployPublishedContract({
			// 		client: thirdwebClient,
			// 		chain,
			// 		account: adminAccount,
			// 		contractId: poolOwner.tokenSymbol === "ETN" ? "GamePoolNative" : "GamePoolERC20",
			// 		contractParams,
			// 		version: "1.0.1",
			// 		publisher: adminAccount.address
			// 	});
				
				// Create pool
				await ctx.scheduler.runAfter(0, internal.pools.createPool, {
					poolOwnerId: poolOwner._id, 
					contractAddress : ""
				});
			// } 
			// catch (error) {
			// 	console.log(error);	
			// }
		});
	}
});

export const createPool = internalMutation({
	args: {
		poolOwnerId: v.id("poolOwners"),
		contractAddress: v.string()
	},
	handler: async (ctx, args) => {
		const { poolOwnerId, contractAddress } = args;

		// Get active cycle
		const activeCycle = await ctx.runQuery(api.adminCycles.getActiveCycle);
		if (!activeCycle) throw new ConvexError({ message: "No active cycle found." });

		// Create pool
		const poolId = await ctx.db.insert("pools", {
			cycleId: activeCycle._id,
			poolOwner: poolOwnerId,
			contractAddress
		});

		// Add pool to current cycle
		await ctx.db.patch(activeCycle._id, {
			pools : activeCycle.pools ? [...activeCycle.pools, poolId] : [poolId]
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
			.withIndex("byCycleId", (q) => q.eq("cycleId", activeCycle._id))
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