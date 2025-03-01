import { ConvexError, v } from "convex/values";
import { internalMutation, query } from "./_generated/server";
import { gameLineup } from "./schema";
import { getActiveGameLineup } from "./utils/getActiveGameLineup";
import { ballsortGameData } from "./levelsBallsort";
import { matchtwoGameData } from "./levelsMatchtwo";

export const createScorecard = internalMutation({
    args: {
        userId: v.id("users"),
        poolId: v.id("pools"),
        walletAddress: v.string(),
        gamertag: v.optional(v.string()),
        gameLineup,
    },
    handler: async (ctx, args) => {
        const { userId, poolId, walletAddress, gamertag, gameLineup } = args;

        // Check if user scorecard already exists
        const userScorecard = await ctx.db.query("scorecards")
            .withIndex("byUserAndPoolId", (q) => q.eq("userId", userId).eq("poolId", poolId))
            .unique();

        if (userScorecard) throw new ConvexError({ message: "You have already joined this pool." });

        // Create empty gameData based on game lineup
        // @ts-ignore
        const gameData: any = {};

        // Only take keys that are true
        const gameLineupArray = getActiveGameLineup(gameLineup);

        gameLineupArray.forEach((game: string) => {
            gameData[game] = emptyScorecard(game);
        });

        // Create empty scorecard
        await ctx.db.insert("scorecards", {
            userId,
            poolId,
            walletAddress,
            gamertag: gamertag ? gamertag : undefined,
            totalPoints: 0,
            gameData
        });

        return 'Pool joined successfully!';
    }
});

function emptyScorecard(game: string) {
    switch (game) {
        case "ballsort":
            return ballsortGameData;
        case "matchtwo":
            return matchtwoGameData;
    }
}


export const getScorecards = query({
    args: {
        poolId: v.id("pools"),
        amount: v.number()
    },
    handler: async (ctx, args) => {
        const {poolId, amount} = args;

        const scorecards = await ctx.db.query("scorecards")
			.withIndex("byTotalPoints")
			.filter(q => q.eq(q.field('poolId'), poolId))
			.order("desc")
            .take(amount);

        return scorecards;
    },
});

export const getScorecard = query({
    args: {
        poolId: v.id("pools"),
        userId: v.id("users")
    },
    handler: async (ctx, args) => {
        const {poolId, userId} = args;
        return await ctx.db.query("scorecards")
        .withIndex("byUserAndPoolId", (q) => q.eq("userId", userId).eq("poolId", poolId))
        .unique();
    },
});