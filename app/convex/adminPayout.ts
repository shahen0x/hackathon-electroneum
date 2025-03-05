import { ConvexError, v } from "convex/values";
import { internalAction, internalMutation } from "./_generated/server";
import { api, internal } from "./_generated/api";
import { generatePaytable } from "~/lib/paytable/paytable";
import { StandardMerkleTree } from '@openzeppelin/merkle-tree'
import { Id } from "./_generated/dataModel";
import { base64ToBlob } from "./utils/base64toBlob";
import { asyncMap } from "convex-helpers";
import { parseISO } from "date-fns";
import { poolContract } from "./web3";
import { prepareContractCall, readContract, sendTransaction } from "thirdweb";
import { adminAccount } from "./authWallet";

export const generatePayouts = internalAction({
    handler: async (ctx) => {
        // Get active cycle
        const activeCycle = await ctx.runQuery(api.adminCycles.getActiveCycle);
        if (!activeCycle) throw new ConvexError({ message: "Active cycle not found." });

        // Check if pool is in active cycle
        if (!activeCycle.pools || activeCycle.pools.length === 0) throw new ConvexError({ message: "No pools found in active cycle." });

        // Check playtime is over
        const now = new Date();
        const playtimeEndDate = parseISO(activeCycle.schedule.playtimeEnd);
        if (now < playtimeEndDate) throw new ConvexError({ message: "Playtime is not over yet." });

        // Create payouts for each pool
        await asyncMap(activeCycle.pools, async (poolId) => {
            await ctx.scheduler.runAfter(0, internal.adminPayout.generatePoolPayoutInstructions, { cycleId: activeCycle._id, poolId });
        });
    }
})

export const generatePoolPayoutInstructions = internalAction({
    args: {
        cycleId: v.id("cycles"),
        poolId: v.id("pools")
    },
    handler: async (ctx, args) => {
        const { cycleId, poolId } = args;

        // Fetch pool
        const pool = await ctx.runQuery(api.pools.getPool, { poolId });
        if (!pool) throw new ConvexError({ message: "Pool not found." });
        if (pool.storageId) throw new ConvexError("Merkle tree already stored for this pool.");

        const { poolPrice, totalParticipants, prizePoolShare } = await GetPoolDataFromContract(pool.contractAddress);

        // 🛑🛑🛑 TODO LATER: Try catch paytable then handle according 🛑🛑🛑
        const paytable = await generatePaytable(poolPrice, totalParticipants, prizePoolShare);
        console.log(paytable);

        // Get scorecards for this pool
        const scorecards = await ctx.runQuery(api.scorecards.getNonZeroScorecards, {
            poolId,
            amount: paytable.length
        });

        if (scorecards.length === 0) throw new ConvexError({ message: "No scorecards found for this pool." });

        // Form merkle entries
        const merkleEntries: string[][] = [];
        const claimPromises: Promise<any>[] = [];

        // Using scorecards length since there may be less scorecards than paid places
        for (let i = 0; i < scorecards.length; i++) {
            merkleEntries[i] = [scorecards[i].walletAddress, paytable[i].toString()];

            // Create claim promises
            const promise = ctx.scheduler.runAfter(0, internal.claims.createClaim, {
                cycleId,
                userId: scorecards[i].userId,
                claimInfo: {
                    amount: paytable[i],
                    contractAddress: pool.contractAddress,
                    poolOwnerId: pool.poolOwner,
                    poolId,
                },
            });

            claimPromises.push(promise);
        }

        // Create all claims
        await Promise.all(claimPromises);

        // Create merkle tree
        const merkleTree = createStandardMerkleTree(merkleEntries);

        // Save tree to storage
        await ctx.scheduler.runAfter(0, internal.adminPayout.storeMerkleTree, {
            poolId,
            merkleTreeString: JSON.stringify(merkleTree.dump()),
        });

        // Schedule function to set merkle root on contract
        await ctx.scheduler.runAfter(0, internal.adminPayout.setMerkleRootOnContract, {
            contractAddress: pool.contractAddress,
            merkleRoot: merkleTree.root
        });
    }
});

export async function GetPoolDataFromContract(contractAddress: string) {
    const contract = poolContract(contractAddress);

    // Form promises
    const promises = [
        readContract({ contract, method: "getPoolPrice" }),
        readContract({ contract, method: "getUniqueParticipants" }),
        readContract({ contract, method: "getCommissionPercentage" })
    ];

    const results = await Promise.allSettled(promises);
    const failures = results.filter(result => result.status === 'rejected');
    if (failures.length > 0) {
        throw new ConvexError({ message: "Failed to fetch pool data from contract." });
    }

    // Extract values
    const poolPrice = Number((results[0] as PromiseFulfilledResult<bigint>).value);
    const totalParticipants = (results[1] as PromiseFulfilledResult<number>).value;
    const commissionPercentage = (results[2] as PromiseFulfilledResult<number>).value;

    const prizePoolShare = (100 - commissionPercentage) / 100;

    return { poolPrice, totalParticipants, prizePoolShare };
}

export const storeMerkleTree = internalAction({
    args: {
        poolId: v.id('pools'),
        merkleTreeString: v.string(),
    },
    handler: async (ctx, args) => {
        const { poolId, merkleTreeString } = args;

        const base64merkleTree = btoa(merkleTreeString);
        const blob = base64ToBlob(base64merkleTree);
        const storageId: Id<"_storage"> = await ctx.storage.store(blob);

        // Save storage id to pool
        await ctx.scheduler.runAfter(0, internal.adminPayout.storeMerkleTreeId, {
            poolId,
            storageId
        });
    }
});

export const storeMerkleTreeId = internalMutation({
    args: {
        poolId: v.id('pools'),
        storageId: v.id('_storage')
    },
    handler: async (ctx, args) => {
        const { poolId, storageId } = args;

        return await ctx.db.patch(poolId, {
            storageId
        });
    }
});

export const setMerkleRootOnContract = internalAction({
    args: {
        contractAddress: v.string(),
        merkleRoot: v.string(),
    },
    handler: async (ctx, args) => {
        const { contractAddress, merkleRoot } = args;

        // Get contract
        const contract = poolContract(contractAddress);

        // Prepare tx
        const transaction = prepareContractCall({
            contract,
            method: "setPrizeMerkleRoot",
            params: [merkleRoot as `0x${string}`],
        });

        // Send tx
        const transactionResult = await sendTransaction({
            transaction,
            account: adminAccount,
        });

        console.log(transactionResult);
    }
});


function createStandardMerkleTree(entries: string[][]) {
    return StandardMerkleTree.of(entries, ['address', 'uint'], { sortLeaves: true });
}
