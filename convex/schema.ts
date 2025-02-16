import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	tasks: defineTable({
		isCompleted: v.boolean(),
		text: v.string(),
	}),

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