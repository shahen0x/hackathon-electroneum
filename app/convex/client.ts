import { paginationOptsValidator } from "convex/server";
import { query } from "./_generated/server";
import { api } from "./_generated/api";
import { ConvexError } from "convex/values";


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

		// Get the authenticated user
		const user = await ctx.runQuery(api.users.getCurrentUser);
		if (!user) throw new ConvexError({ message: "You must be authenticated first!" });

		return await ctx.db
			.query("claims")
			.order("desc")
			.paginate(args.paginationOpts);
	},
});