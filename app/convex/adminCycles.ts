import { ConvexError, v } from "convex/values";
import { api, internal } from "./_generated/api";
import { internalMutation, query } from "./_generated/server";
import { gameLineup, schedule } from "./schema";
import { getActiveGameLineup } from "./utils/getActiveGameLineup";
import { parseISO, formatISO } from "date-fns";
import { isISODate } from "./utils/isISODate";

export const createCycleWithPools = internalMutation({
	args: {
		week: v.number(),
		schedule,
		gameLineup,
	},
	handler: async (ctx, args) => {
		const { week, schedule, gameLineup } = args;

		// Validate game lineup
		const lineup = getActiveGameLineup(gameLineup);
		if (lineup.length === 0) throw new ConvexError({ message: "Game lineup must have at least 1 active game." });

		// Validate schedule
		const isCycleStartISOFormat = isISODate(schedule.cycleStart);
		const isPlaytimeStartISOFormat = isISODate(schedule.playtimeStart);
		const isPlaytimeEndISOFormat = isISODate(schedule.playtimeEnd);
		const isCycleEndISOFormat = isISODate(schedule.playtimeEnd);

		if (!isCycleStartISOFormat || !isPlaytimeStartISOFormat || !isPlaytimeEndISOFormat || !isCycleEndISOFormat) throw new ConvexError({ message: "Schedule must be in ISO format." });

		const cycleStartDate = parseISO(schedule.cycleStart);
		const playtimeStartDate = parseISO(schedule.playtimeStart);
		const playtimeEndDate = parseISO(schedule.playtimeEnd);
		const cycleEndDate = parseISO(schedule.cycleEnd);

		if (cycleStartDate >= cycleEndDate) throw new ConvexError({ message: "Cycle end cannot be before cycle start." });
		if (cycleStartDate > playtimeStartDate) throw new ConvexError({ message: "Cycle start cannot be after playtime start." });
		if (playtimeStartDate >= playtimeEndDate) throw new ConvexError({ message: "Playtime start must be before playtime end." });

		// Check for active cycle
		const activeCycle = await ctx.runQuery(api.adminCycles.getActiveCycle);
		if (activeCycle) throw new ConvexError({ message: "There is already an active cycle." });

		// Create cycle
		const cycleId = await ctx.db.insert("cycles", {
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

		// Create pools with contracts
		await ctx.scheduler.runAfter(0, internal.pools.deployPoolContracts, {
			cycleId,
			schedule
		});

		// Schedule payout generation
		const fiveMinutesAfterPlaytime = new Date(playtimeEndDate.getTime() + 5 * 60 * 1000);
		await ctx.scheduler.runAt(fiveMinutesAfterPlaytime, internal.adminPayout.generatePayouts);

		// Schedule next cycle
		const cycleDuration = cycleEndDate.getTime() - cycleStartDate.getTime(); // Difference in milliseconds
		const nextCycleEnd = new Date(cycleEndDate.getTime() + cycleDuration);
		const nextPlaytimeStart = new Date(playtimeStartDate.getTime() + cycleDuration);
		const nextPlaytimeEnd = new Date(playtimeEndDate.getTime() + cycleDuration);

		const nextCycleSchedule: typeof schedule = {
			cycleStart: schedule.cycleEnd,
			playtimeStart: formatISO(nextPlaytimeStart),
			playtimeEnd: formatISO(nextPlaytimeEnd),
			cycleEnd: formatISO(nextCycleEnd),
		};

		await ctx.scheduler.runAt(cycleEndDate, internal.adminCycles.autoStartNextCycle, {
			schedule: nextCycleSchedule,
			gameLineup
		});

		return cycleId;
	}
})

export const autoStartNextCycle = internalMutation({
	args: {
		schedule,
		gameLineup,
	},
	handler: async (ctx, args) => {
		const { schedule, gameLineup } = args;

		// Check for active cycle
		const activeCycle = await ctx.runQuery(api.adminCycles.getActiveCycle);

		// Close cycle if active
		if (activeCycle) await ctx.db.patch(activeCycle._id, { active: false });

		// Create new cycle
		await ctx.runMutation(internal.adminCycles.createCycleWithPools, {
			week: activeCycle ? activeCycle.week + 1 : 1,
			schedule,
			gameLineup
		});

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


