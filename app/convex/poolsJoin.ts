import { ConvexError, v } from "convex/values";
import { api, internal } from "./_generated/api";
import { action } from "./_generated/server";
import { parseISO } from "date-fns";

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
        const enrollDate = parseISO(activeCycle.schedule.cycleStart);
        const endDate = parseISO(activeCycle.schedule.cycleEnd);

        // Now has to be within enroll and end
        if (now < enrollDate || now >= endDate) {
            throw new ConvexError({ message: "Enrollment phase is over." });
        }

        // 🛑🛑🛑 TODO: Check user participation in pool on smart contract 🛑🛑🛑

        // Create scorecard, IF NOT ALREADY CREATED in an internal mutation
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

