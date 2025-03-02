import { ConvexError, v } from "convex/values";
import { api, internal } from "./_generated/api";
import { internalAction, internalMutation, query } from "./_generated/server";
import { gameLineup, schedule } from "./schema";
import { getActiveGameLineup } from "./utils/getActiveGameLineup";
import { parseISO } from "date-fns";
import { asyncMap } from "convex-helpers";
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
		if (activeCycle) throw new ConvexError({ message: "There is already an active cycle" });

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

		// 🛑🛑🛑 TODO: Schedule cycle closure 🛑🛑🛑

		return cycleId;
	}
})



export const endCycle = internalAction({
	handler: async (ctx) => {
		// Get active cycle
		const activeCycle = await ctx.runQuery(api.adminCycles.getActiveCycle);
		if (!activeCycle) throw new ConvexError({ message: "Active cycle not found." });

		// Check if pool is in active cycle
		if (!activeCycle.pools || activeCycle.pools.length === 0) throw new ConvexError({ message: "No pools found in active cycle." });

		// Check playtime is over
		// const now = new Date();
		// const endDate = parseISO(activeCycle.schedule.end);
		// if (now < endDate) throw new ConvexError({ message: "Playtime is not over yet." });

		// Create payouts for each pool
		await asyncMap(activeCycle.pools, async (poolId) => {
			await ctx.scheduler.runAfter(0, internal.adminPayout.createPoolPayouts, { poolId });
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


