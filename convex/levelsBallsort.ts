import { v } from "convex/values";
import { internalMutation, internalQuery, query } from "./_generated/server";
import { api, internal } from "./_generated/api";
import { shuffleString } from "./utils/shuffleString";

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
        const levels = await ctx.runQuery(internal.levelsBallsort.getLevelsForCycle, { cycleId });
        
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

  export const getLevelsForCycle = internalQuery({
    args: {
        cycleId: v.id("cycles"),
      },
    handler: async (ctx, args) => {
        const { cycleId } = args;

        const levels = await ctx.db
            .query("levelsBallsort")
            .withIndex("byCycleId", (q) =>
                q.eq("cycleId", cycleId)
            )
            .unique();
  
        return levels;
  
    }
  })



