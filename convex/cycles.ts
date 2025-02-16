import { startOfWeek, addDays, set, formatISO, addWeeks, format } from "date-fns";
import { toZonedTime } from 'date-fns-tz';

import { mutation, query } from "./_generated/server";
import { asyncMap } from "convex-helpers";


export const getActiveCycleWithPools = query({
	handler: async (ctx) => {

		const activeCycle = await ctx.db
			.query("cycles")
			.withIndex("byActive", (q) =>
				q.eq("active", true)
			)
			.unique();

		if (!activeCycle) {
			return null;
		}

		const pools = await ctx.db
			.query("pools")
			.withIndex("byCycle", (q) =>
				q.eq("cycle", activeCycle._id)
			)
			.collect();

		const activePools = await asyncMap(pools, async (pool) => {
			const poolOwner = await ctx.db.get(pool.poolOwner);

			return {
				contractAddress: pool.contractAddress,
				tokenSymbol: poolOwner?.tokenSymbol,
				tokenLogo: poolOwner?.tokenLogo,
				tokenAddress: poolOwner?.tokenAddress
			}
		});

		return {
			week: activeCycle.week,
			schedule: activeCycle.schedule,
			gameLineup: activeCycle.gameLineup,
			pools: activePools
		}
	}
})

export const createCycle = mutation({
	handler: async (ctx) => {


		return await ctx.db.insert("cycles", {
			active: true,
			week: 0,
			schedule: {
				enroll: "2025-02-09T13:00:00.000Z",
				playtime: "2025-02-10T13:00:00.000Z",
				end: "2025-02-28T13:00:00.000Z",
			},
			gameLineup: {
				blitzer: true,
				ballsort: true,
			}
		});
	}
})
