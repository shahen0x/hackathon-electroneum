import { ConvexError, v } from "convex/values";
import { api, internal } from "./_generated/api";
import { Doc, Id } from "./_generated/dataModel";
import { action, internalMutation } from "./_generated/server";
import { parseISO } from "date-fns";
import { gameLineup } from "./schema";

// /** BALLSORT */
export const ballsortGameData = {
	finalTime: 0,
	transfers: 0,
	ballsMoved: 0,
}
export type GameDataBallsort = typeof ballsortGameData;

export const matchtwoGameData = {
	finalTime: 0,
	matchesAttempted: 0,
}
export type GameDataMatchtwo = typeof matchtwoGameData;

export const joinPool = action({
    handler: async (ctx, args) => {
        const user = {
            _id : "k57cdqhnpr5pw5pg8xx2g6mybx7azmp0",
            walletAddress: "adiadihsadasan",
            gamertag: "shahil"
        } as Doc<"users">;
        
        const poolId = "k172nvwjmndxkmbav96qsfd2pd7ayny7" as Id<"pools">;

        // TODO: Authenticate user with convex
        // TODO: Verify user wallet
        
        // Fetch active cycle
        const activeCycle = await ctx.runQuery(api.cycles.getActiveCycle);

        if (!activeCycle) {
            throw new ConvexError({ message: "Active cycle not found." });
        }

        // Check if pool is in active cycle
        if (!activeCycle.pools || activeCycle.pools.length === 0) {
            throw new ConvexError({ message: "No pools found in active cycle." });
        }

        if (!activeCycle.pools.includes(poolId)) {
            throw new ConvexError({ message: "Pool not found in active cycle." });
        }

        // Check schedule
        const now = new Date();
		const enrollDate = parseISO(activeCycle.schedule.enroll);
		const endDate = parseISO(activeCycle.schedule.end);

        // Now has to be within enroll and end
        if (now < enrollDate || now >= endDate) {
            throw new ConvexError({ message: "Enrollment phase is over." });
        }

        // TODO: Check user participation in pool on smart contract

        // Create scorecard, IF NOT ALREADY CREATED in an internal mutation
        const res: string = await ctx.runMutation(internal.poolsJoin.createScorecard, {
			userId: user._id,
		    poolId: poolId,
		    gamertag: user.gamertag || undefined,
            gameLineup: activeCycle.gameLineup
		});

		return res;

    },
})

export const createScorecard = internalMutation({
    args: {
		userId: v.id("users"),
		poolId: v.id("pools"),
		gamertag: v.optional(v.string()),
        gameLineup: v.object(gameLineup),
	},
	handler: async (ctx, args) => {
        const { userId, poolId, gamertag, gameLineup } = args;

        // Check if user scorecard already exists
		const userScorecard = await ctx.db.query("scorecards")
        .withIndex("byUserAndPoolId", (q) => q.eq("userId", userId).eq("poolId", poolId))
        .unique();

        if (userScorecard) throw new ConvexError({ message: "You have already joined this pool." });

        // Create empty gameData based on game lineup
        const gameData: any = {};
        const gameLineupArray = Object.keys(gameLineup);
        gameLineupArray.forEach((game: string) => {
            gameData[game] = emptyScorecard(game);
        });

        // Create empty scorecard
        await ctx.db.insert("scorecards", {
            userId,
            poolId,
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