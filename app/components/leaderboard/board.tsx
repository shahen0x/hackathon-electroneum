"use client";

import { FC, useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "../ui/card";
import { useConvex, usePaginatedQuery } from "convex/react";
import { api } from "~/convex/_generated/api";
import { Id } from "~/convex/_generated/dataModel";
import { useCycleStore } from "~/store/store.cycle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { getContract, readContract, toEther } from "thirdweb";
import { clientThirdweb } from "~/thirdweb/client";
import { chain } from "~/config/chain";
import { abiPoolNative } from "~/thirdweb/abi/abi.pool.native";
import { generatePaytable } from "~/lib/paytable/paytable";
import { LeaderboardEntry } from "~/types/types.leaderboard";
import { formatEth } from "~/lib/format.eth";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { shortenAddress } from "thirdweb/utils";
import { MediaRenderer, NFTDescription, NFTMedia, NFTName, NFTProvider } from "thirdweb/react";
import { Skeleton } from "../ui/skeleton";
import { Separator } from "../ui/separator";

interface LeaderboardProps {

}

const Leaderboard: FC<LeaderboardProps> = () => {

	const { cycle, isLoading: cycleIsLoading } = useCycleStore();
	const convex = useConvex();

	const [activeTab, setActiveTab] = useState<Id<"pools">>();

	useEffect(() => {
		if (cycle) {
			setActiveTab(cycle?.activePools[0].id);
		}
	}, [cycle]);



	const fetchLeaderboard = async () => {
		if (!activeTab) throw new Error("Pool not found.");
		const scorecards = await convex.query(api.scorecards.getNonZeroScorecards, { poolId: activeTab });

		// 🛑🛑🛑 TODO: handle case where nobody has played yet 🛑🛑🛑
		// maybe return null or empty array
		if (scorecards.length === 0) throw new Error("No scorecards found for this pool.");

		// find pool contract address from activePools based on poolId
		const activePool = cycle?.activePools.find(pool => pool.id === activeTab);
		if (!activePool) throw new Error("Pool not found.");

		const contract = getContract({
			client: clientThirdweb,
			chain,
			address: activePool.contractAddress,
			abi: abiPoolNative
		});

		const [participants, poolPrice, commission] = await Promise.all([
			readContract({ contract, method: "getUniqueParticipants" }),
			readContract({ contract, method: "getPoolPrice" }),
			readContract({ contract, method: "getCommissionPercentage" }),
		]);

		const prizePoolShare = (100 - commission) / 100;

		// 🛑🛑🛑 TODO: handle case where there is less than 2 participants 🛑🛑🛑

		const paytable = await generatePaytable(Number(poolPrice), participants, prizePoolShare);
		// 🛑🛑🛑 TODO: uncomment above line, comment line below 🛑🛑🛑
		// const paytable = await generatePaytable(Number(poolPrice), scorecards.length, prizePoolShare);
		console.log(paytable);

		const leaderboard: LeaderboardEntry[] = [];
		for (let i = 0; i < scorecards.length; i++) {
			const scorecard = scorecards[i];
			leaderboard.push({
				rank: i + 1,
				gamertag: scorecard.gamertag ? scorecard.gamertag : shortenAddress(scorecard.walletAddress),
				points: scorecard.totalPoints,
				reward: !paytable[i] ? "0" : toEther(BigInt(paytable[i])),
				tokenSymbol: activePool.tokenSymbol ? activePool.tokenSymbol : "~"
			})
		}

		return leaderboard
	}

	const { data, isLoading, isError, error } = useQuery({
		queryKey: [`leaderboard`, activeTab],
		queryFn: fetchLeaderboard,
		enabled: !!activeTab,
		refetchInterval: 1000 * 60 * 5,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		staleTime: 1000 * 60 * 5,
	})

	if (isError) {
		console.log("errrrorr", error);
	}

	return (
		<Card className="overflow-hidden">

			<div className="flex items-center justify-between lg:justify-normal gap-6 py-4 lg:py-6 pl-4 pr-2">
				<h2 className="text-md">Leaderboards</h2>

				<Select value={activeTab} onValueChange={(value) => setActiveTab(value as Id<"pools">)}>
					<SelectTrigger className="w-[130px] lg:hidden">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{cycle?.activePools.map((pool, index) => (
							<SelectItem key={pool.id} value={pool.id}>
								<div className="w-full flex items-center">
									<img src={pool.tokenLogo} alt={pool.tokenSymbol} className="w-5 h-5 rounded-full" />
									<span className="ml-2">{pool.tokenSymbol}</span>
								</div>
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				<div className="hidden lg:flex items-center gap-2">
					{cycle?.activePools.map((pool, index) => (
						<button
							key={index}
							onClick={() => setActiveTab(pool.id)}
							className={`flex items-center space-x-2 py-1 px-3 rounded-lg text-xs
								${activeTab === pool.id ? "bg-neutral-900 text-neutral-100" : ""}
							`}
						>
							<img src={pool.tokenLogo} alt={pool.tokenSymbol} className="w-5 h-5 rounded-full" />
							<span>{pool.tokenSymbol}</span>
						</button>
					))}
				</div>
			</div>

			<Separator />

			<div className="
					w-full grid grid-cols-[0.5rem_2fr_1fr_2fr] gap-6 pt-2 pb-2 px-3 text-sm text-neutral-600 font-semibold
					sm:px-4 md:px-6
				"
			>
				<span>#</span>
				<span>Player</span>
				<span>Points</span>
				<span className="text-right">Reward</span>
			</div>

			{data?.map((scorecard) => (
				<div key={scorecard.gamertag} className="
						w-full items-center grid grid-cols-[0.5rem_2fr_1fr_2fr] gap-6 py-4 px-3 border-t text-xs
						sm:px-4 md:px-6 md:text-sm
					"
				>
					<span className="text-neutral-600">{scorecard.rank}</span>
					<span>{scorecard.gamertag}</span>
					<span>{scorecard.points.toLocaleString()}</span>
					<span className={`text-right ${Number(scorecard.reward) !== 0 ? "font-semibold text-etn text-sm" : "text-neutral-600"}`}>
						{formatEth(scorecard.reward, scorecard.tokenSymbol)}
					</span>
				</div>
			))}

			<div className="space-y-[2px]">
				{(cycleIsLoading || isLoading) &&
					<>
						{[...Array(10)].map((_, index) => (
							<Skeleton key={index} className="w-full h-[50px] opacity-10 rounded-none" />
						))}
					</>
				}
			</div>
		</Card>
	)
}

export default Leaderboard;