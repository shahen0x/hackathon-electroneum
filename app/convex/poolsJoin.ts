import { ConvexError, v } from "convex/values";
import { api, internal } from "./_generated/api";
import { action } from "./_generated/server";
import { parseISO } from "date-fns";
import { poolContract } from "./web3";
import { readContract } from "thirdweb";

export const joinPool = action({
    args: {
        poolId: v.id("pools"),
    },
    handler: async (ctx, args) => {
        const { poolId } = args;

        // Get the authenticated user
        const user = await ctx.runQuery(api.users.getCurrentUser);
        if (!user) throw new ConvexError({ message: "You must be authenticated first!" });

        // Check wallet
        if (!user.walletAddress) throw new ConvexError({ message: "Wallet address not linked to account." });

        // Check active cycle
        const activeCycle = await ctx.runQuery(api.adminCycles.getActiveCycle);
        if (!activeCycle) throw new ConvexError({ message: "Active cycle not found." });

        // Check if pool is in active cycle
        if (!activeCycle.pools || activeCycle.pools.length === 0) throw new ConvexError({ message: "No pools found in active cycle." });
        if (!activeCycle.pools.includes(poolId)) throw new ConvexError({ message: "Pool not found in active cycle." });

        // Check schedule
        const now = new Date();
        const cycleStart = parseISO(activeCycle.schedule.cycleStart);
        const playtimeEnd = parseISO(activeCycle.schedule.playtimeEnd);

        // Now has to be within enroll and end
        if (now < cycleStart || now >= playtimeEnd) {
            throw new ConvexError({ message: "Enrollment phase is over." });
        }

        // Get pool
        const pool = await ctx.runQuery(api.pools.getPool, { poolId });
        if (!pool) throw new ConvexError({ message: "Pool not found." });

        // Get contract
        const contract = poolContract(pool.contractAddress);
        
        // Check if user is a participant
        const isParticipant = await readContract({
            contract: contract,
            method: "getUserRecorded",
            params: [user.walletAddress],
          });

        if (!isParticipant) throw new ConvexError({ message: "Address not recorded on contract." });

        // Create scorecard
        const res: string = await ctx.runMutation(internal.scorecards.createScorecard, {
            userId: user._id,
            poolId: poolId,
            walletAddress: user.walletAddress,
            gamertag: user.gamertag || undefined,
            gameLineup: activeCycle.gameLineup
        });

        return res;

    },
})

