import { mutation, query } from "./_generated/server";

export const createMockCycle = mutation({
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
