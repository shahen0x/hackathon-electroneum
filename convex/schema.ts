import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


export const gameLineup = {
	ballsort: v.optional(v.boolean()),
	matchtwo: v.optional(v.boolean()),
}


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
		schedule: v.object({
			enroll: v.string(),
			playtime: v.string(),
			end: v.string(),
		}),
		gameLineup: v.object(gameLineup),
		pools: v.optional(v.array(v.id("pools"))),
	})
		.index("byActive", ["active"]),

	poolOwners: defineTable({
		tokenSymbol: v.string(),
		tokenLogo: v.string(),
		tokenAddress: v.string(),
		payoutAddress: v.string()
	}),

	pools: defineTable({
		cycle: v.id("cycles"),
		poolOwner: v.id("poolOwners"),
		contractAddress: v.string(),
	})
		.index("byCycle", ["cycle"]),

	scorecards: defineTable({
		userId: v.id("users"),
		poolId: v.id("pools"),
		gamertag: v.optional(v.string()),
		totalPoints: v.number(),
		gameData: v.any()
	})
		.index("byUserAndPoolId", ["userId", "poolId"]),

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
});