import { MutationBuilder } from "convex/server";
import { ConvexError, v } from "convex/values";
import { internalQuery, mutation} from "./_generated/server";
import { api, internal } from "./_generated/api";
import { getActiveGameLineup } from "./utils/getActiveGameLineup";
import { parseISO } from "date-fns";
import { asyncMap } from "convex-helpers";
import { getMatchtwoDataForCycle } from "./levelsMatchtwo";
import { getBallsortDataForCycle } from "./levelsBallsort";
import { Id } from "./_generated/dataModel";

export const verifyCompetitionAccess = mutation({
	args: {
		gameName: v.union(
			v.literal("ballsort"),
			v.literal("matchtwo")
		)
	},
	handler: async (ctx, args) => {
	    const { gameName } = args;
        // Get the authenticated user
        const user = await ctx.runQuery(api.users.getCurrentUser);
        if (!user) throw new ConvexError({ message: "You must be authenticated first!" });

        // Check if game is in lineup
        const activeCycle = await ctx.runQuery(api.cycles.getActiveCycle);
        if (!activeCycle) throw new ConvexError({ message: "Active cycle not found." });

        const activeGames = getActiveGameLineup(activeCycle.gameLineup);
        if (!activeGames.includes(gameName)) throw new ConvexError({ message: "Game is not in lineup." });
        
        // Check within playtime
        const now = new Date();
        const playtimeDate = parseISO(activeCycle.schedule.playtime);
        if (now < playtimeDate) throw new ConvexError({ message: "Playtime phase hasn't started yet." });
        
        const endDate = parseISO(activeCycle.schedule.end);
        if (now >= endDate) throw new ConvexError({ message: "Playtime phase is over." });

        // Check if pool is in active cycle
        if (!activeCycle.pools || activeCycle.pools.length === 0) throw new ConvexError({ message: "No pools found in active cycle." });

        // Check if user has at least 1 scorecard in a pool
        const scorecards = await ctx.runQuery(internal.compete.getUserScorecards, {
            userId: user._id,
            pools: activeCycle.pools
        });

        if (!scorecards || scorecards.length === 0) throw new ConvexError({ message: "You have not joined any pools." });
                
        // Respond with game levels        
        let gameLevels : string | undefined = undefined;
        
        switch (gameName) {
            case "ballsort":
                const ballsortData = await getBallsortDataForCycle(ctx, activeCycle._id);
                gameLevels = ballsortData?.levels;
                break;
            case "matchtwo":
                const matchtwoData = await getMatchtwoDataForCycle(ctx, activeCycle._id);
                gameLevels = matchtwoData?.levels;
                break;
        }

        if (gameLevels === undefined) throw new ConvexError({ message: "Competition levels not found" });

        return gameLevels;
	}
});

export const getUserScorecards = internalQuery({
	args: {
		userId: v.id("users"),
        pools: v.array(v.id("pools"))
	},
	handler: async (ctx, args) => {
        const {userId, pools} = args;

        const scorecards: Id<"scorecards">[] = [];

		await asyncMap(pools, async (pool) => {
            const scorecard = await ctx.db.query("scorecards")
                .withIndex("byUserAndPoolId", (q) => q.eq("userId", userId).eq("poolId", pool))
                .unique();

            if (scorecard) scorecards.push(scorecard._id);
        });

        return scorecards;
	}
});