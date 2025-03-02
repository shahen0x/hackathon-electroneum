import { ConvexError, v } from "convex/values";
import { internalAction, internalMutation, query } from "./_generated/server";
import { asyncMap } from "convex-helpers";
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