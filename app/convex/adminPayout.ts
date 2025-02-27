import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import { api } from "./_generated/api";
import { generatePaytable } from "~/lib/paytable/paytable";

export const createPoolPayouts = internalAction({
    args: {
		poolId: v.id("pools")
	},
    handler: async (ctx, args) => {
        const {poolId } = args;

        // Fetch pool
        // const pool = await ctx.runQuery(api.pools.getPool, { poolId });
        
        // 🛑🛑🛑 TODO: // Use contract address to fetch price, totalParticipants and commission 🛑🛑🛑
        // 🛑🛑🛑 TODO?: // Handle the case where less scorecards than paid places 🛑🛑🛑
        
        const price = 100000000000000000; // in wei
        const totalParticipants = 17;
        const commission = 30;
        const prizePoolShare = (100 - commission) / 100;

        const paytable = await generatePaytable(price, totalParticipants, prizePoolShare);
        // console.log(paytable);

        // Get scorecards for this pool
        const scorecards = await ctx.runQuery(api.scorecards.getScorecards, {
            poolId, 
            amount : paytable.length
        });

        // console.log(scorecards);

        // Form merkle entries
        const merkleEntries : string[][] = [];

        for (let i = 0; i < paytable.length; i++) {
            merkleEntries[i] = [scorecards[i].walletAddress, paytable[i].toString()];
        }

        console.log(merkleEntries);

    }
});