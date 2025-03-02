import { ConvexError, v } from "convex/values";
import { internalAction, internalMutation, query } from "./_generated/server";
import { schedule } from "./schema";
import { thirdwebClient, adminAccount } from "./authWallet";
import { deployPublishedContract, getOrDeployInfraForPublishedContract } from "thirdweb/deploys";
import { chain } from "~/config/chain";
import { api } from "./_generated/api";
import { toWei } from "thirdweb";

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


export const deployPoolContracts = internalAction({
    args: {
        // schedule
    },
    handler: async (ctx, args) => {
		// const { schedule } = args;

		const poolOwners = await ctx.runQuery(api.poolOwners.getActivePoolOwners);
		if (poolOwners.length === 0) throw new ConvexError({ message: "No active pool owners found." });

		console.log(poolOwners);
		await asyncMap(poolOwners, async (poolOwner) => {

			const contractParams : any = {
					canJoinPool_: true,
					poolPrice_: toWei(poolOwner.poolPrice.toString()),
					commissionPercentage_: 30,
					withdrawAddress_: poolOwner.payoutAddress,
					// enrollStartTime_: schedule.enroll,
					// playEndTime_: schedule.end,
					enrollStartTime_: 1740840749,
					playEndTime_: 1740927149,
			}

			// If not ETN, deploy erc20
			if (poolOwner.tokenSymbol !== "ETN") {
				contractParams.erc20TokenAddress_ = poolOwner.tokenAddress;
			}

			// Deploy contract
			const address = await deployPublishedContract({
				client: thirdwebClient,
				chain,
				account: adminAccount,
				contractId: poolOwner.tokenSymbol === "ETN" ? "GamePoolNative" : "GamePoolERC20",
				contractParams,
				version: "v1.0.1",
				publisher: adminAccount.address
			});

			console.log(address);
		});
	}
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