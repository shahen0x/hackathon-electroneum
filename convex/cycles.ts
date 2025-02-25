import { ConvexError, v } from "convex/values";
import { api, internal } from "./_generated/api";
import { internalMutation, query} from "./_generated/server";
import { gameLineup, schedule } from "./schema";
import { getActiveGameLineup } from "./utils/getActiveGameLineup";
import { parseISO } from "date-fns";

export const createMockCycle = internalMutation({
	handler: async (ctx) => {
		return await ctx.db.insert("cycles", {
			active: true,
			week: 0,
			schedule: {
				enroll: "2025-02-24T10:34:26.862Z",
				playtime: "2025-02-24T10:34:26.862Z",
				end: "2025-02-28T10:34:26.862Z",
			},
			gameLineup: {
				ballsort: true,
				matchtwo: true,
			}
		});
	}
})

export const createCycle = internalMutation({
	args: {
		week : v.number(),
		schedule,
		gameLineup,
	},
	handler: async (ctx, args) => {
		const {week, schedule, gameLineup} = args;

		// Validate game lineup
		const lineup = getActiveGameLineup(gameLineup);
		if (lineup.length === 0) throw new ConvexError({ message: "Game lineup must have at least 1 active game." });

		// Validate schedule
		const isEnrollISOFormat = isISODate(schedule.enroll);
		const isPlaytimeISOFormat = isISODate(schedule.playtime);
		const isEndISOFormat = isISODate(schedule.end);
		
		if (!isEnrollISOFormat || !isPlaytimeISOFormat || !isEndISOFormat) throw new ConvexError({ message: "Schedule must be in ISO format." });

        const enrollDate = parseISO(schedule.enroll);
		const playtimeDate = parseISO(schedule.playtime);
        const endDate = parseISO(schedule.end);

		if (enrollDate > playtimeDate) throw new ConvexError({ message: "Enrollment date cannot be after playtime date." });
		if (enrollDate >= endDate) throw new ConvexError({ message: "Enrollment date must be before end date." });
		if (playtimeDate >= endDate) throw new ConvexError({ message: "Playtime date must be before end date." });

		// Check for active cycle
		const activeCycle = await ctx.runQuery(api.cycles.getActiveCycle);
		if (activeCycle) throw new ConvexError({ message: "There is already an active cycle" });

		// Create cycle
		const cycleId =  await ctx.db.insert("cycles", {
			active: true,
			week,
			schedule,
			gameLineup
		});

		// Create ball sort levels, if needed
		if (gameLineup.ballsort) {
			await ctx.scheduler.runAfter(0, internal.levelsBallsort.generateBallsortLevels, {
				cycleId: cycleId,
			});
		}

		// Create match two levels, if needed
		if (gameLineup.matchtwo) {
			await ctx.scheduler.runAfter(0, internal.levelsMatchtwo.generateMatchtwoLevels, {
				cycleId: cycleId,
			});
		}

        // 🛑🛑🛑 TODO: Schedule cycle closure 🛑🛑🛑

		return cycleId;
	}
})

export const getActiveCycle = query({
	handler: async (ctx) => {
		const activeCycle = await ctx.db
			.query("cycles")
			.withIndex("byActive", (q) =>
				q.eq("active", true)
			)
			.unique();

		return activeCycle;
	}
})

function isISODate(str: string): boolean {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(str)) {
        return false;
    }
    
    const timestamp = Date.parse(str);
    return !isNaN(timestamp);
}
