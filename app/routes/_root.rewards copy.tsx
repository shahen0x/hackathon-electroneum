import type { MetaFunction } from "@remix-run/node";
import { appConfig } from "~/config/app";

import { useConvex, useConvexAuth, usePaginatedQuery } from "convex/react";
import { api } from "~/convex/_generated/api";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useActiveAccount } from "thirdweb/react";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Terminal } from "lucide-react";
import { PiCoinsDuotone, PiExclamationMarkBold, PiWallet, PiWarningDiamondDuotone, PiWarningDiamondLight } from "react-icons/pi";
import { Separator } from "~/components/ui/separator";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import { formatDate } from "~/lib/format.date";



export const meta: MetaFunction = () => {
	return [
		{ title: `Claim Rewards - ${appConfig.name}` },
		{ name: "description", content: "Welcome to Remix!" },
	];
};


const AuthRequired = () => {
	return (
		<div className="container min-h-[calc(100vh_-_18rem)] flex flex-col">
			<div className="w-full max-w-md mx-auto flex-1 flex items-center justify-center">
				<Card className="w-full flex item-center gap-4 p-4">
					<div className="shrink-0 w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center">
						<PiWarningDiamondLight size={26} className="text-rose-500 animate-pulse" />
					</div>
					<div>
						<h2 className="font-bold">Wallet Required</h2>
						<p className="text-xs text-muted-foreground">Sign in with your wallet to claim your rewards.</p>
					</div>
				</Card>
			</div>
		</div>
	)
}


const RewardsList = () => {

	// Hook
	const convex = useConvex();

	// Fetch pool owners only once
	const { data: poolOwners } = useQuery({
		queryKey: ["poolOwners"],
		queryFn: async () => await convex.query(api.client.getActivePoolOwners),
		staleTime: 1000 * 60 * 30,
	})

	// Fetch paginated claims
	const { results: claims, isLoading: isLoadingClaims, status: claimsStatus, loadMore: loadMoreClaims } = usePaginatedQuery(
		api.client.getPaginatedClaims,
		{},
		{ initialNumItems: 1 },
	);

	// Fetch cycles for each claim
	// const cycleQueries = useQueries({
	// 	queries: claims.map((claim) => ({
	// 		queryKey: ["cycle", claim.cycleId],
	// 		queryFn: async () => await convex.query(api.client.getCycleById, { cycleId: claim.cycleId }),
	// 		staleTime: 1000 * 60 * 30,
	// 		enabled: !!claim.cycleId,
	// 	})),
	// });

	// // Check if any of the cycles are still loading
	// const isLoadingCycles = cycleQueries.some((query) => query.isLoading);

	// // Map pool owners to claim rewards
	// const poolOwnerMap = poolOwners?.reduce((acc, owner) => {
	// 	acc[owner.id] = owner;
	// 	return acc;
	// }, {} as Record<string, typeof poolOwners[number]>);

	// // Map claims to cycles and pool rewards
	// const data = claims.map((claim, index) => ({
	// 	...claim,
	// 	cycle: cycleQueries[index]?.data ?? null,
	// 	poolRewards: claim.poolRewards.map((reward) => ({
	// 		...reward,
	// 		poolOwner: poolOwnerMap?.[reward.poolOwnerId] ?? null,
	// 	})),
	// }));

	// console.log(data);



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

	return (
		<div className="container">
			<div className="max-w-lg mx-auto space-y-8 lg:space-y-8">
				{/* {data.map((data) => (
					<Card key={data._id}>
						<CardHeader className="relative z-10 space-y-1 border-b">
							<CardTitle className="flex items-center gap-3 font-pixel text-md">
								Gaming Week #{data.cycle?.week}
							</CardTitle>
							<CardDescription className="flex items-center gap-2 text-sm">
								{formatDate(data.cycle?.schedule.cycleStart)} to {formatDate(data.cycle?.schedule.cycleEnd)}
							</CardDescription>
						</CardHeader>
						<CardContent className="pt-4">
							test
						</CardContent>
					</Card>
				))} */}

				<Button onClick={() => loadMoreClaims(1)} disabled={claimsStatus !== "CanLoadMore"}>
					Load more
				</Button>
			</div>
		</div>
	)
}

export default function Rewards() {

	const wallet = useActiveAccount();
	const { isAuthenticated } = useConvexAuth();

	return (
		<>
			{!wallet || !isAuthenticated ?
				<AuthRequired />
				:
				<RewardsList />
			}
			{/* <RewardsList /> */}
		</>
	);
}