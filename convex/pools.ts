import { Doc } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";

export const getAllPools = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db.query("pools").collect();
	},
});

export const createMockPools = mutation({
	handler: async (ctx) => {
		const pools = [
			{
				cycle: "jx71bdzv3fyr92v43yt7grmf857azcag",
				poolOwner: "k97e0nzf8zxy634sd993vwthah7ayskc",
				contractAddress: "0x0000000000000000000000000000000000000000",
			},
			{
				cycle: "jx71bdzv3fyr92v43yt7grmf857azcag",
				poolOwner: "k9725nd6wmv9myrtbbec29114n7aybbw",
				contractAddress: "0x0000000000000000000000000000000000000000",
			},
		] as Doc<"pools">[];
		for (const pool of pools) {
			await ctx.db.insert("pools", pool);
		}
	},
});