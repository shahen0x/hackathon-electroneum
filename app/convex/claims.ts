import { ConvexError, v } from "convex/values";
import { action, internalMutation, query } from "./_generated/server";
import { api } from "./_generated/api";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import { paginationOptsValidator } from "convex/server";
import { claimInfo } from "./schema";

export const getPaginatedClaims = query({
    args: { paginationOpts: paginationOptsValidator },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("claims")
            .order("desc")
            .paginate(args.paginationOpts);
    },
});

export const createClaim = internalMutation({
    args: {
        cycleId: v.id("cycles"),
        userId: v.id("users"),
        claimInfo
    },
    handler: async (ctx, args) => {
        const { cycleId, userId, claimInfo } = args;

        // Get claim document
        const claimDoc = await ctx.db.query("claims")
            .withIndex("byCycleAndUserId", (q) => q.eq("cycleId", cycleId).eq("userId", userId))
            .unique();

        // Add pool rewards to existing document
        if (claimDoc) {
            // Check if claim already exists
            if (claimDoc.poolRewards.filter(pool => pool.poolId === claimInfo.poolId).length > 0) throw new ConvexError({ message: "Claim already exists." });

            await ctx.db.patch(claimDoc._id, {
                cycleId,
                userId,
                poolRewards: [...claimDoc.poolRewards, claimInfo]
            });
        } else {
            // Create new document
            await ctx.db.insert("claims", {
                cycleId,
                userId,
                poolRewards: [claimInfo]
            });
        }
    },
});

export const getRewardClaim = action({
    args: {
        poolId: v.id("pools"),
        amount: v.number()
    },
    handler: async (ctx, args): Promise<string[]> => {
        const { poolId, amount } = args;

        // Get the authenticated user
        const user = await ctx.runQuery(api.users.getCurrentUser);
        if (!user) throw new ConvexError({ message: "You must be authenticated first!" });
        if (!user.walletAddress) throw new ConvexError({ message: "Wallet address not linked to account." });

        // Get Pool
        const pool = await ctx.runQuery(api.pools.getPool, { poolId });
        if (!pool) throw new ConvexError({ message: "Pool not found." });
        if (!pool.storageId) throw new ConvexError({ message: "Rewards not yet generated." });

        // Get merkle tree from storage
        const merkleTreeBlob = await ctx.storage.get(pool.storageId);
        if (!merkleTreeBlob) throw new ConvexError({ message: "Merkle tree file not found." });

        const decoder = new TextDecoder('utf-8');
        const merkleTreeString = decoder.decode(await merkleTreeBlob.arrayBuffer());
        const merkleTree = StandardMerkleTree.load(JSON.parse(merkleTreeString));

        // Form user's merkle entry
        const merkleEntry = [user.walletAddress, amount.toString()];

        try {
            return merkleTree.getProof(merkleEntry);
        } catch (error) {
            throw new ConvexError({ message: "Proof not found." });
        }
    },
});