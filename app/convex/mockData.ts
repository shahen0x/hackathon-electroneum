import { v } from "convex/values";
import { Doc } from "./_generated/dataModel";
import { internalMutation, mutation } from "./_generated/server";


export const createMockCycle = internalMutation({
	handler: async (ctx) => {
		return await ctx.db.insert("cycles", {
			active: true,
			week: 0,
			schedule: {
				cycleStart: "2025-02-24T10:34:26.862Z",
				playtimeStart: "2025-02-24T10:34:26.862Z",
				playtimeEnd: "2025-03-01T12:45:44+00:00",
				cycleEnd: "2025-03-02T12:45:44+00:00",
			},
			gameLineup: {
				ballsort: true,
				matchtwo: true,
			}
		});
	}
})


export const createMockPoolOwners = mutation({
	handler: async (ctx) => {
		const poolOwners = [
			{
				status: "active",
				disabled: false,
				poolPrice: 2500,
				tokenSymbol: "ETN",
				tokenLogo: "https://s2.coinmarketcap.com/static/img/coins/64x64/2137.png",
				tokenAddress: "0x0000000000000000000000000000000000000000",
				payoutAddress: "0x37E5831239785039Ce8A76AfF44AD0E53AA25c8C",
				brandColor: "#00ff00"
			},
			{
				status: "active",
				disabled: false,
				poolPrice: 1000,
				tokenSymbol: "MEME",
				tokenLogo: "https://wary-raccoon-546.convex.cloud/api/storage/48404d7f-ec8b-4830-9293-cb3155cfc0ba",
				tokenAddress: "0xf1010CcbD24017a0e76988AF962f54C6EF4a090b",
				payoutAddress: "0x37E5831239785039Ce8A76AfF44AD0E53AA25c8C"
			},
			{
				status: "upcoming",
				disabled: false,
				poolPrice: 0,
				tokenSymbol: "Buddy",
				tokenLogo: "https://app.electroswap.io/images/0x38B54f147303887BD2E932373432FfCBD11Ff6a5.png",
				tokenAddress: "0x38B54f147303887BD2E932373432FfCBD11Ff6a5",
				payoutAddress: "0x00"
			},
			{
				status: "upcoming",
				disabled: false,
				poolPrice: 0,
				tokenSymbol: "PDY",
				tokenLogo: "https://app.electroswap.io/images/0xc20d02538368D8F7deBeAeB99D9a8b4d4D1DDC1C.png",
				tokenAddress: "0xc20d02538368D8F7deBeAeB99D9a8b4d4D1DDC1C",
				payoutAddress: "0x00"
			},
			{
				status: "upcoming",
				disabled: false,
				poolPrice: 0,
				tokenSymbol: "MEGA",
				tokenLogo: "https://pbs.twimg.com/profile_images/1889018389420777472/YIOt0clC_400x400.jpg",
				tokenAddress: "0x00",
				payoutAddress: "0x00"
			}
		] as Doc<"poolOwners">[];

		for (const poolOwner of poolOwners) {
			await ctx.db.insert("poolOwners", poolOwner);
		}
	},
})


export const createMockPools = internalMutation({
	handler: async (ctx) => {

		const activeCycle = await ctx.db.query("cycles").withIndex("byActive", (q) =>
			q.eq("active", true)
		).unique();

		if (!activeCycle) return;

		const poolOwners = await ctx.db.query("poolOwners")
			.withIndex("byStatus", (q) =>
				q.eq("status", "active")
			)
			.collect();

		for (const owner of poolOwners) {
			await ctx.db.insert("pools", {
				cycleId: activeCycle._id,
				poolOwner: owner._id,
				contractAddress: "0x0000000000000000000000000000000000000000",
			});
		}
	},
});

export const createMockScorecards = internalMutation({
    args: {
		poolId: v.id("pools"),
        amount: v.number(),
    },
    handler: async (ctx, args) => {
        const {poolId, amount} = args;

		const randomUser = await ctx.db.query("users").take(1);

		if (!randomUser) throw new Error("Add a user first so we can use their id");

        for (let i = 1; i <= amount; i++) {
            await ctx.db.insert("scorecards", {
                userId: randomUser[0]._id,
                poolId,
                walletAddress: "0x0000000000000000000000000000000000000000",
                gamertag: "tester" + i,
                totalPoints: i * 50,
                gameData: {},
            });
        }
    }
});