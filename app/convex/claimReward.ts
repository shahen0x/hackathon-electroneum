import { ConvexError, v } from "convex/values";
import { action } from "./_generated/server";
import { api } from "./_generated/api";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";

export const getRewardClaim = action({
    args: {
        poolId: v.id("pools")
    },
    handler: async (ctx, args) : Promise<{proof: string[], amount: number}> => {
        const { poolId } = args;
        // Get the authenticated user
        const user = await ctx.runQuery(api.users.getCurrentUser);
        if (!user) throw new ConvexError({ message: "You must be authenticated first!" });
        if (!user.walletAddress) throw new ConvexError({ message: "Wallet address not linked to account." });

        // Get Pool
        const pool = await ctx.runQuery(api.pools.getPool, { poolId });
        if (!pool) throw new ConvexError({ message: "Pool not found." });
        if (!pool.storageId) throw new ConvexError({ message: "Rewards not yet generated." });

        // Get user scorecard
        const scorecard = await ctx.runQuery(api.scorecards.getScorecard, { poolId, userId: user._id });

        if (!scorecard) throw new ConvexError({ message: "You have not joined this pool." });
        if (!scorecard.reward) throw new ConvexError({ message: "No reward found" });

        // Get merkle tree from storage
        const merkleTreeBlob = await ctx.storage.get(pool.storageId);
        if (!merkleTreeBlob) throw new ConvexError({ message: "Merkle tree file not found." });

        const decoder = new TextDecoder('utf-8');
        const merkleTreeString = decoder.decode(await merkleTreeBlob.arrayBuffer());
        const merkleTree = StandardMerkleTree.load(JSON.parse(merkleTreeString));

        // Form user's merkle entry
        const merkleEntry = [user.walletAddress, scorecard.reward.toString()];

        try {
            // Get proof and return
            const proof = merkleTree.getProof(merkleEntry);

            return {
                proof, 
                amount: scorecard.reward
            }
        } catch (error) {
            throw new ConvexError({ message: "Proof not found." });
        }
    },
});