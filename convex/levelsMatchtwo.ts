import { shuffleString } from "./utils/shuffleString";
import { internalMutation, internalQuery, MutationCtx } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

enum MatchtwoGridSize {
    FourByFour = 16,
    FourBySix = 24,
    FourByEight = 32,
    FiveByEight = 40,
}

function getRandomBuildString(number: number): string {
    const iconsNeeded = Math.floor(number / 2);
    const chars = "abcdefghijklmnopqrst"; // 20 options

    // We shuffle the string so we get more randomness
    let shuffledString = shuffleString(chars);

    // We take the amount of characters we need
    shuffledString = shuffledString.substring(0, iconsNeeded);

    // Since we need each letter twice to be able to match, we add the string to itself
    shuffledString += shuffledString;

    // Then we shuffle again 
    return shuffleString(shuffledString);
}

const matchtwoPlaylistGenerator = (setAmount: number) => {
    const playlistSpec = [
        MatchtwoGridSize.FourByFour, 
        MatchtwoGridSize.FourBySix, 
        MatchtwoGridSize.FiveByEight
    ];
    
    let playlist: string[][] = [];

    for (let i = 0; i < setAmount; i++) {
        // Initialize the inner array
        playlist[i] = [];
        
        // we want each playlist to have a 4x4, a 4x6, and a 5x8 grid
        for (let j = 0; j < playlistSpec.length; j++) {
            playlist[i][j] = getRandomBuildString(playlistSpec[j]);
        }
    }

    return JSON.stringify({ playlist });

}

export const generateMatchtwoLevels = internalMutation({
    args: {
      cycleId: v.id("cycles"),
    },
    handler: async (ctx, args) => {
        const { cycleId } = args;

        // Check if levels already exist for this cycle
        const levels = await getMatchtwoDataForCycle(ctx, cycleId);
        if (levels) throw new Error("Match two levels already exist for this cycle.");

        // Generate levels
        const setAmount = 30;
        const levelString = matchtwoPlaylistGenerator(setAmount);
        console.log(levelString);

        // Insert new levels
        const levelsId = await ctx.db.insert("levelsMatchtwo", {
            cycleId,
            levels: levelString
        });

        return levelsId;
    },
  });

export async function getMatchtwoDataForCycle(ctx: MutationCtx, cycleId: Id<"cycles">){
    const levels = await ctx.db
        .query("levelsMatchtwo")
        .withIndex("byCycleId", (q) =>
            q.eq("cycleId", cycleId)
        )
        .unique();

    return levels;

}

// export const getLevelsForCycle = internalQuery({
//   args: {
//       cycleId: v.id("cycles"),
//     },
//   handler: async (ctx, args) => {
//       const { cycleId } = args;

//       const levels = await ctx.db
//           .query("levelsMatchtwo")
//           .withIndex("byCycleId", (q) =>
//               q.eq("cycleId", cycleId)
//           )
//           .unique();

//       return levels;

//   }
// })


