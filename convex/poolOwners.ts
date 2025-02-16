import { Doc } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";


export const getPoolOwners = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db.query("poolOwners").collect();
	},
});


export const createPoolOwners = mutation({
	handler: async (ctx) => {
		const poolOwners = [
			{
				tokenSymbol: "ETN",
				tokenLogo: "https://s2.coinmarketcap.com/static/img/coins/64x64/2137.png",
				tokenAddress: "0x0000000000000000000000000000000000000000",
				payoutAddress: "0x911934037F313B28967001589ab2A46d0d6B8c0a"
			},
			{
				tokenSymbol: "MEME",
				tokenLogo: "https://wary-raccoon-546.convex.cloud/api/storage/48404d7f-ec8b-4830-9293-cb3155cfc0ba",
				tokenAddress: "0x0000000000000000000000000000000000000000",
				payoutAddress: "0x911934037F313B28967001589ab2A46d0d6B8c0a"
			},
		] as Doc<"poolOwners">[];

		for (const poolOwner of poolOwners) {
			await ctx.db.insert("poolOwners", poolOwner);
		}
	},
})