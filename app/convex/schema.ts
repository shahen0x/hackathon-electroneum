import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


export const gameLineup = v.object({
	ballsort: v.optional(v.boolean()),
	matchtwo: v.optional(v.boolean()),
});

export const schedule = v.object({
	cycleStart: v.string(),
	playtimeStart: v.string(),
	playtimeEnd: v.string(),
	cycleEnd: v.string()
});

export const poolStatus = v.union(
	v.literal("active"),
	v.literal("upcoming")
);

export const claimInfo = v.object({
	amount: v.number(),
	poolId: v.id("pools"),
	contractAddress: v.string(),
	poolOwnerId: v.id("poolOwners")
});

export default defineSchema({

	...authTables,

	authNonces: defineTable({
		nonce: v.string(),
	})
		.index("byNonce", ["nonce"]),

	users: defineTable({
		gamertag: v.optional(v.string()),
		avatar: v.optional(v.string()),
		walletAddress: v.optional(v.string()),
	})
		.index("byWalletAddress", ["walletAddress"]),

	usersFrozen: defineTable({
		userId: v.id("users")
	})
		.index("byUserId", ["userId"]),


	cycles: defineTable({
		active: v.boolean(),
		week: v.number(),
		schedule,
		gameLineup,
		pools: v.optional(v.array(v.id("pools"))),
	})
		.index("byActive", ["active"]),

	poolOwners: defineTable({
		status: poolStatus,
		disabled: v.boolean(),
		poolPrice: v.number(), // in ether
		tokenSymbol: v.string(),
		tokenLogo: v.string(),
		tokenAddress: v.string(),
		payoutAddress: v.string(),
		brandColor: v.optional(v.string()),
	})
		.index("byStatus", ["status"])
		.index("byDisabled", ["disabled"]),

	pools: defineTable({
		cycleId: v.id("cycles"),
		poolOwner: v.id("poolOwners"),
		contractAddress: v.string(),
		storageId: v.optional(v.id("_storage")),
	})
		.index("byCycleId", ["cycleId"]),

	scorecards: defineTable({
		userId: v.id("users"),
		poolId: v.id("pools"),
		walletAddress: v.string(),
		gamertag: v.optional(v.string()),
		totalPoints: v.number(),
		gameData: v.any()
	})
		.index("byUserAndPoolId", ["userId", "poolId"])
		.index("byTotalPoints", ["totalPoints"])
		.index("byPoolIdAndTotalPoints", ["poolId", "totalPoints"]),

	claims: defineTable({
		cycleId: v.id("cycles"),
		userId: v.id("users"),
		poolRewards: v.array(claimInfo),
	})
		.index("byCycleAndUserId", ["cycleId", "userId"]),

	levelsBallsort: defineTable({
		cycleId: v.id("cycles"),
		levels: v.string()
	})
		.index("byCycleId", ["cycleId"]),

	levelsMatchtwo: defineTable({
		cycleId: v.id("cycles"),
		levels: v.string()
	})
		.index("byCycleId", ["cycleId"]),

	test: defineTable({
		test: v.string()
	})
});