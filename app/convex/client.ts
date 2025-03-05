import { paginationOptsValidator } from "convex/server";
import { query } from "./_generated/server";
import { api } from "./_generated/api";
import { ConvexError, v } from "convex/values";
import { asyncMap } from "convex-helpers";
import { getAuthUserId } from "@convex-dev/auth/server";


export const getActivePoolOwners = query({
	handler: async (ctx) => {
		const poolOwners = await ctx.db.query("poolOwners")
			.withIndex("byDisabled", (q) => q.eq("disabled", false))
			.filter(q => q.eq(q.field('status'), 'active'))
			.collect();

		return poolOwners.map((owner) => ({
			id: owner._id,
			tokenLogo: owner.tokenLogo,
			tokenSymbol: owner.tokenSymbol,
			poolPrice: owner.poolPrice,
		}));
	},
});


export const getPaginatedClaims = query({
	args: { paginationOpts: paginationOptsValidator },
	handler: async (ctx, args) => {

		// Get the authenticated user id
		const userId = await getAuthUserId(ctx);

		// If no user id, return empty page
		if (!userId) return {
			page: [],
			isDone: true,
			continueCursor: "",
			splitCursor: null,
			pageStatus: null
		};

		// Get claims for the user
		const claims = await ctx.db
			.query("claims")
			.withIndex("byUserId", (q) => q.eq("userId", userId))
			.order("desc")
			.paginate(args.paginationOpts);

		// Get cycles for each claim
		const claimsWithCycles = await asyncMap(claims.page, async (claim) => {
			const cycle = await ctx.db.get(claim.cycleId);
			if (!cycle) return;

			return {
				claimId: claim._id,
				poolRewards: claim.poolRewards.map((poolReward) => poolReward),
				cycle: {
					week: cycle.week,
					schedule: cycle.schedule,
				}
			}
		})

		// Return page
		return {
			isDone: claims.isDone,
			continueCursor: claims.continueCursor,
			splitCursor: claims.splitCursor,
			pageStatus: claims.pageStatus,
			page: claimsWithCycles
		}
	},
});


export const getCycleById = query({
	args: {
		cycleId: v.id("cycles")
	},
	handler: async (ctx, args) => {
		return await ctx.db.get(args.cycleId)
	}
})