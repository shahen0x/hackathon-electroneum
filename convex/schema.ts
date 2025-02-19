import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({

	...authTables,

	users: defineTable({
		name: v.optional(v.string()),
		gamertag: v.optional(v.string()),
		avatar: v.optional(v.string()),
		email: v.optional(v.string()),
		emailVerificationTime: v.optional(v.number()),
		walletAddress: v.optional(v.string()),
	})
		.index("byWalletAddress", ["walletAddress"]),


	cycles: defineTable({
		active: v.boolean(),
		week: v.number(),
		schedule: v.object({
			enroll: v.string(),
			playtime: v.string(),
			end: v.string(),
		}),
		gameLineup: v.object({
			blitzer: v.optional(v.boolean()),
			ballsort: v.optional(v.boolean()),
		}),
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
		.index("byCycle", ["cycle"])


});