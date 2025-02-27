import { v } from "convex/values";
import { internalMutation, MutationCtx } from "./_generated/server";
import { shuffleString } from "./utils/shuffleString";
import { Id } from "./_generated/dataModel";

// /** BALLSORT */
export const ballsortGameData = {
    finalTime: -1,
    transfers: 0,
    ballsMoved: 0,
}
export type GameDataBallsort = typeof ballsortGameData;

type LevelSpecBallsort = {
    ta: number,
    bd: string
}

type SpecsBallsort = {
    levels: LevelSpecBallsort[]
}

function findColorAmount(tubeAmount: number) {
    switch (tubeAmount) {
        case 3:
        case 4:
            return tubeAmount - 1;
        case 12:
        case 13:
        case 14:
        case 15:
            return tubeAmount - 3;
        default:
            return tubeAmount - 2;
    }
}

const ballSortPlaylistGenerator = (setAmount: number) => {
    const ballsAvailable = "123456789abcdef";

    let specs: SpecsBallsort[] = [];

    for (let i = 0; i < setAmount; i++) {
        specs[i] = { levels: [] }
        for (let j = 8; j < 16; j++) {
            specs[i].levels.push(generateLevel(j));
        }
    }

    return JSON.stringify({ specs });

    function generateLevel(tubeAmount: number) {
        const totalColors = findColorAmount(tubeAmount);
        const ballsPerColor = tubeAmount == 4 ? 3 : 4;

        let buildInstructions = "";
        for (let i = 0; i < totalColors; i++) {
            for (let j = 0; j < ballsPerColor; j++) {
                buildInstructions += ballsAvailable[i];
            }
        }

        const levelSpec: LevelSpecBallsort = {
            ta: tubeAmount,
            bd: shuffleString(buildInstructions)
        }
        return levelSpec;
    }
}

export const generateBallsortLevels = internalMutation({
    args: {
      cycleId: v.id("cycles"),
    },
    handler: async (ctx, args) => {
        const { cycleId } = args;

        // Check if levels already exist for this cycle
        const levels = await getBallsortDataForCycle(ctx, cycleId);
        
        if (levels) throw new Error("Ball Sort levels already exist for this cycle.");

        // Generate levels
        const setAmount = 3;
        const levelString = ballSortPlaylistGenerator(setAmount);

        // Insert new levels
        const levelsId = await ctx.db.insert("levelsBallsort", {
            cycleId,
            levels: levelString
        });

        return levelsId;
    },
});

export async function getBallsortDataForCycle(ctx: MutationCtx, cycleId: Id<"cycles">){
    const levels = await ctx.db
        .query("levelsBallsort")
        .withIndex("byCycleId", (q) =>
            q.eq("cycleId", cycleId)
        )
        .unique();

    return levels;

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





