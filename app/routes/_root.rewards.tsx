import type { MetaFunction } from "@remix-run/node";
import { appConfig } from "~/config/app";

import { useConvex, useConvexAuth, usePaginatedQuery } from "convex/react";
import { api } from "~/convex/_generated/api";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useActiveAccount } from "thirdweb/react";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Terminal } from "lucide-react";
import { PiExclamationMarkBold, PiWallet, PiWarningDiamondDuotone, PiWarningDiamondLight } from "react-icons/pi";
import { Separator } from "~/components/ui/separator";
import { Button } from "~/components/ui/button";



export const meta: MetaFunction = () => {
	return [
		{ title: `Claim Rewards - ${appConfig.name}` },
		{ name: "description", content: "Welcome to Remix!" },
	];
};



const Get = () => {
	const convex = useConvex();

	const fetchPoolOwners = async () => {
		return await convex.query(api.client.getActivePoolOwners);
	}

	const { results: claims, isLoading: isLoadingClaims, status: claimsStatus, loadMore: loadMoreClaims } = usePaginatedQuery(
		api.client.getPaginatedClaims,
		{},
		{ initialNumItems: 5 },
	);

	const { data: poolOwners } = useQuery({
		queryKey: ["poolOwners"],
		queryFn: fetchPoolOwners,
		staleTime: 1000 * 60 * 30,
	})
	console.log(claims);
	return (
		<>
			test
		</>
	)
}

export default function Rewards() {

	const account = useActiveAccount();
	const { isAuthenticated } = useConvexAuth();


	if (!account || !isAuthenticated) {
		return (
			<>
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
			</>
		)
	}









	return (
		<div className="container">
			<div className="max-w-lg mx-auto space-y-8 lg:space-y-8">
				<Card>
					<CardHeader className="relative z-10 space-y-1 border-b">
						<CardTitle className="flex items-center gap-3 font-pixel text-md">
							Gaming Week #0
						</CardTitle>
						<CardDescription className="flex items-center gap-2 text-sm">
							6 to 10 February 2025
						</CardDescription>
					</CardHeader>
					<CardContent className="pt-4">
						test
					</CardContent>
				</Card>
			</div>
		</div>
	);
}