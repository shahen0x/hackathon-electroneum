import { useQuery } from "@tanstack/react-query";
import { useConvex, usePaginatedQuery } from "convex/react";
import { api } from "~/convex/_generated/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { formatDate } from "~/lib/format.date";
import { toEther } from "thirdweb/utils";
import { Button } from "../ui/button";
import RewardsCard from "./rewards.card";


const RewardsList = () => {

	// Hook
	const convex = useConvex();

	// Fetch pool owners only once
	const { data: poolOwners } = useQuery({
		queryKey: ["poolOwners"],
		queryFn: async () => await convex.query(api.client.getActivePoolOwners),
		staleTime: 1000 * 60 * 30,
	})

	// Convert poolOwners into a Map for O(1) lookup
	const poolOwnersMap = new Map(poolOwners?.map((owner) => [owner.id, owner]));

	// Fetch paginated claims
	const { results: claims, isLoading: isLoadingClaims, status: claimsStatus, loadMore: loadMoreClaims } = usePaginatedQuery(
		api.client.getPaginatedClaims,
		{},
		{ initialNumItems: 1 },
	);

	// Combine claims with respective pool owners
	const data = claims.map((claim) => {
		// Keep undefined claims as they are
		if (!claim) return claim;

		return {
			...claim,
			poolRewards: claim.poolRewards.map((reward) => {
				// Get the poolOwner from the map (it is guaranteed to be found)
				const poolOwner = poolOwnersMap.get(reward.poolOwnerId);
				if (!poolOwner) return null;

				// Remove poolOwnerId and enrich reward with poolOwner data
				const { poolOwnerId, ...rewardWithoutOwnerId } = reward;

				return {
					...rewardWithoutOwnerId,
					poolPrice: poolOwner.poolPrice,
					tokenLogo: poolOwner.tokenLogo,
					tokenSymbol: poolOwner.tokenSymbol,
				};
			}),
		};
	});



	return (
		<div className="container">
			<div className="max-w-lg mx-auto space-y-8 lg:space-y-6">
				{data.map((claim) => (
					<RewardsCard key={claim?.claimId} claim={claim} />
				))}

				<div className="text-center">
					<Button variant={"secondary"} size={"sm"} onClick={() => loadMoreClaims(1)} disabled={claimsStatus !== "CanLoadMore"}>
						Load more
					</Button>
				</div>
			</div>
		</div>
	)
}

export default RewardsList;









// console.log(data);

// const getExpiry = async (contractAddress: string) => {
// 	const contract = getContract({
// 		client: clientThirdweb,
// 		chain,
// 		address: contractAddress,
// 		abi: abiPoolNative
// 	});

// 	const expiryBigInt = await readContract({ contract, method: "getClaimExpiryTime" });
// 	return toEther(expiryBigInt);
// }



// if (isLoadingClaims || isLoadingCycles) {
// 	return (
// 		<div className="container">
// 			<div className="max-w-lg mx-auto space-y-6">
// 				<Skeleton className="col-span-1 h-32 w-full" />
// 				<Skeleton className="col-span-1 h-32 w-full" />
// 				<Skeleton className="col-span-1 h-32 w-full" />
// 				<Skeleton className="col-span-1 h-32 w-full" />
// 			</div>
// 		</div>
// 	)
// }


// If no rewards are found,
// if (!isLoadingClaims && claims.length === 0) {
// 	return (
// 		<div className="container min-h-[calc(100vh_-_18rem)] flex flex-col">
// 			<div className="w-full max-w-md mx-auto flex-1 flex items-center justify-center">
// 				<Card className="w-full flex item-center gap-4 p-4">
// 					<div className="shrink-0 w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center">
// 						<PiCoinsDuotone size={24} className="text-rose-500 animate-pulse" />
// 					</div>
// 					<div>
// 						<h2 className="font-bold">No Rewards Available</h2>
// 						<p className="text-xs text-muted-foreground">We did not find any rewards for you.</p>
// 					</div>
// 				</Card>
// 			</div>
// 		</div>
// 	)
// }