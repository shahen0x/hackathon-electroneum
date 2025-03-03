import { ConvexError, v } from "convex/values";
import { internalMutation, internalQuery, query } from "./_generated/server";
import { gameLineup } from "./schema";
import { getActiveGameLineup } from "./utils/getActiveGameLineup";
import { ballsortGameData } from "./levelsBallsort";
import { matchtwoGameData } from "./levelsMatchtwo";
import { Doc } from "./_generated/dataModel";
import { asyncMap } from "convex-helpers";
import { paginationOptsValidator } from "convex/server";
import { shortenAddress } from "thirdweb/utils";

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


export const getNonZeroScorecards = query({
    args: {
        poolId: v.id("pools"),
        amount: v.optional(v.number())
    },
    handler: async (ctx, args) => {
        const { poolId, amount } = args;

        if (amount) {
            return await ctx.db.query("scorecards")
                .withIndex("byPoolIdAndTotalPoints", (q) => q.eq("poolId", poolId))
                .filter(q => q.gt(q.field('totalPoints'), 0))
                .order("desc")
                .take(amount);
        } else {
            return await ctx.db.query("scorecards")
                .withIndex("byPoolIdAndTotalPoints", (q) => q.eq("poolId", poolId))
                .filter(q => q.gt(q.field('totalPoints'), 0))
                .order("desc")
                .collect()
        }
    },
});

export const getScorecard = query({
    args: {
        poolId: v.id("pools"),
        userId: v.id("users")
    },
    handler: async (ctx, args) => {
        const { poolId, userId } = args;
        return await ctx.db.query("scorecards")
            .withIndex("byUserAndPoolId", (q) => q.eq("userId", userId).eq("poolId", poolId))
            .unique();
    },
});

export const getUserScorecards = internalQuery({
    args: {
        userId: v.id("users"),
        pools: v.array(v.id("pools"))
    },
    handler: async (ctx, args) => {
        const { userId, pools } = args;

        const scorecards: Doc<"scorecards">[] = [];

        await asyncMap(pools, async (pool) => {
            const scorecard = await ctx.db.query("scorecards")
                .withIndex("byUserAndPoolId", (q) => q.eq("userId", userId).eq("poolId", pool))
                .unique();

            if (scorecard) scorecards.push(scorecard);
        });

        return scorecards;
    }
});

export const updateScorecardsReward = internalMutation({
    args: {
        scorecardIds: v.array(v.id("scorecards")),
        rewards: v.array(v.number()),
    },
    handler: async (ctx, args) => {
        const { scorecardIds, rewards } = args;

        for (let i = 0; i < scorecardIds.length; i++) {
            await ctx.db.patch(scorecardIds[i], {
                reward: rewards[i]
            });
        }
    }
});

export const getPaginatedScorecards = query({
    args: {
        poolId: v.id("pools"),
        paginationOpts: paginationOptsValidator,
    },
    handler: async (ctx, args) => {
        const { poolId, paginationOpts } = args;

        const scorecards = await ctx.db.query("scorecards")
            .withIndex("byPoolIdAndTotalPoints", (q) => q.eq("poolId", poolId))
            .filter(q => q.gt(q.field('totalPoints'), 0))
            .order("desc")
            .paginate(paginationOpts);

        return {
            ...scorecards,
            page: scorecards.page.map((score) => ({
                id: score._id,
                gamertag: score.gamertag,
                totalPoints: score.totalPoints,
                walletAddress: shortenAddress(score.walletAddress, 4),
                // gameData: score.gameData,
            })),
        };
    }
});
