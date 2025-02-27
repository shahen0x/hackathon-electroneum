import { ConvexError, v } from "convex/values";
import { internalQuery, mutation, MutationCtx} from "./_generated/server";
import { api, internal } from "./_generated/api";
import { getActiveGameLineup } from "./utils/getActiveGameLineup";
import { parseISO } from "date-fns";
import { asyncMap } from "convex-helpers";
import { getMatchtwoDataForCycle } from "./levelsMatchtwo";
import { getBallsortDataForCycle } from "./levelsBallsort";
import { Doc } from "./_generated/dataModel";
import { GameDataBallsort, GameDataMatchtwo } from "./poolsJoin";

type GameName = "ballsort" | "matchtwo";

export const verifyCompetitionAccess = mutation({
	args: {
		gameName: v.union(
			v.literal("ballsort"),
			v.literal("matchtwo")
		)
	},
	handler: async (ctx, args) => {
	    const { gameName } = args;

        // Check prerequisites
        const { activeCycle } = await checkCompetitionPrerequisites(ctx, gameName);
                
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

export const submitScore = mutation({
	args: {
		gameName: v.union(
			v.literal("ballsort"),
			v.literal("matchtwo")
		),
		gameData: v.string(),
	},
	handler: async (ctx, args) => {
        const {gameName, gameData} = args;

		// Check prerequisites
        const { activeCycle, scorecards } = await checkCompetitionPrerequisites(ctx, gameName);

        const parsedGameData = JSON.parse(gameData);
        let isScoreBased = false;
        let isTimeBased = false;

        // Validate game data type
        switch (gameName) {
            case "ballsort":
                if (!isGameDataBallsort(parsedGameData)) throw new ConvexError({ message: "Invalid game data format." });
                isTimeBased = true;
                break;
            case "matchtwo":
                if (!isGameDataMatchtwo(parsedGameData)) throw new ConvexError({ message: "Invalid game data format." });
                isTimeBased = true;
                break;
            default:
                break;
        }

        // Update leaderboard scorecards
		await asyncMap(scorecards, async (scorecard) => {
            // In case of score-based games, check if score is greater
            if (isScoreBased) {
                const isScoreLess = parsedGameData.finalScore < scorecard.gameData[gameName].finalScore;
                if (isScoreLess) return;
            } else if (isTimeBased) {
                // In case of time-based games, check if time is less
                const isTimeMore = parsedGameData.finalTime > scorecard.gameData[gameName].finalTime && scorecard.gameData[gameName].finalTime !== -1;
                if (isTimeMore) return;
            }

            // Update game data with new game data
            const newGameData = {
                ...scorecard.gameData,
                [gameName]: parsedGameData,
            }

            // Get game lineup & calculate totalPoints
            const totalPoints = await calculateTotalPoints(getActiveGameLineup(activeCycle.gameLineup), newGameData);

            // Update scorecard
            await ctx.db.patch(scorecard._id, {
                gameData: newGameData,
                totalPoints
            });

        });

        return { message: "Score submitted!" }
	}
});

export async function checkCompetitionPrerequisites(ctx: MutationCtx, gameName: GameName) {
    // Get the authenticated user
    const user = await ctx.runQuery(api.users.getCurrentUser);
    if (!user) throw new ConvexError({ message: "You must be authenticated first!" });

    // Get cycle
    const activeCycle = await ctx.runQuery(api.adminCycles.getActiveCycle);
    if (!activeCycle) throw new ConvexError({ message: "Active cycle not found." });
    
    // Check if game is in lineup
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

    if (scorecards.length === 0) throw new ConvexError({ message: "You have not joined any pools." });

    return {user, activeCycle, scorecards};

}

export const getUserScorecards = internalQuery({
	args: {
		userId: v.id("users"),
        pools: v.array(v.id("pools"))
	},
	handler: async (ctx, args) => {
        const {userId, pools} = args;

        const scorecards : Doc<"scorecards">[] = [];

		await asyncMap(pools, async (pool) => {
            const scorecard = await ctx.db.query("scorecards")
                .withIndex("byUserAndPoolId", (q) => q.eq("userId", userId).eq("poolId", pool))
                .unique();

            if (scorecard) scorecards.push(scorecard);
        });

        return scorecards;
	}
});

export async function calculateTotalPoints(gameLineup: string[], newGameData: any) {
	let allScores = 0;
	let allTimes = 0;
	let stopPointsCalculation = false;

	for (let i = 0; i < gameLineup.length; i++) {
		switch (gameLineup[i]) {
			case "ballsort":
				if (newGameData.ballsort.finalTime === -1) stopPointsCalculation = true;
				allTimes += newGameData.ballsort.finalTime;
				continue;
            case "matchtwo":
                if (newGameData.matchtwo.finalTime === -1) stopPointsCalculation = true;
                allTimes += newGameData.matchtwo.finalTime;
                continue;
		}
		if (stopPointsCalculation) break;
	}

	allScores = !stopPointsCalculation && allScores === 0 ? 100000 : allScores;
	allTimes = !stopPointsCalculation && allTimes === 0 ? 1 : allTimes;

	const totalPoints = stopPointsCalculation ? 0 : allScores / allTimes;

	return totalPoints;
}

export function isGameDataBallsort(data: any): data is GameDataBallsort {
    return (
        data !== null &&
        typeof data === 'object' &&
        'finalTime' in data &&
        'transfers' in data &&
        'ballsMoved' in data &&
        typeof data.finalTime === 'number' &&
        typeof data.transfers === 'number' &&
        typeof data.ballsMoved === 'number'
    );
}

export function isGameDataMatchtwo(data: any): data is GameDataMatchtwo {
    return (
        data !== null &&
        typeof data === 'object' &&
        'finalTime' in data &&
        'matchesAttempted' in data &&
        typeof data.finalTime === 'number' &&
        typeof data.matchesAttempted === 'number'
    );
}