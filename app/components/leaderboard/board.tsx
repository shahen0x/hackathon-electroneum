"use client";

import { FC, useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "../ui/card";
import { useConvex, usePaginatedQuery } from "convex/react";
import { api } from "~/convex/_generated/api";
import { Id } from "~/convex/_generated/dataModel";
import { useCycleStore } from "~/store/store.cycle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import LeaderboardTable from "./board.table";
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

interface LeaderboardProps {

}

const Leaderboard: FC<LeaderboardProps> = () => {

	const { cycle } = useCycleStore();
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

		// const paytable = await generatePaytable(Number(poolPrice), participants, prizePoolShare);
		// 🛑🛑🛑 TODO: uncomment above line, comment line below 🛑🛑🛑
		const paytable = await generatePaytable(Number(poolPrice), scorecards.length, prizePoolShare);
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

	const { data, isError, error } = useQuery({
		queryKey: [`leaderboard-${activeTab}`],
		queryFn: fetchLeaderboard,
		enabled: !!activeTab,
		staleTime: 1000 * 60 * 5, // 30mins
	})

	if (isError) {
		console.log("errrrorr", error);
	}
	return (
		<>

			{/* <MediaRenderer
				client={clientThirdweb}
				src="ipfs://bafybeihpsl466xecquzhukk7rmopuzylxrkp4aemhhn7baess7owfudfly/1.png"
			/> */}


			<Card>

				<CardHeader className="">

					<div className="bg-neutral-900 flex items-center justify-between gap-6 py-1 pl-4 pr-1 rounded-lg">
						<h2 className="text-xl">Leaderboards</h2>

						<Select value={activeTab} onValueChange={(value) => { if (value) setActiveTab(value as Id<"pools">) }}>
							<SelectTrigger className="w-[130px]">
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

						<div className="hidden md:flex items-center gap-2">
							{cycle?.activePools.map((pool, index) => (
								<button
									key={index}
									onClick={() => setActiveTab(pool.id)}
									className={`flex items-center space-x-2 py-1 px-3 rounded-lg text-xs
								${activeTab === pool.id ? "bg-card text-neutral-100" : ""}
							`}
								>
									<img src={pool.tokenLogo} alt={pool.tokenSymbol} className="w-5 h-5 rounded-full" />
									<span>{pool.tokenSymbol}</span>
								</button>
							))}
						</div>
					</div>

				</CardHeader>

				<CardContent className="space-y-2">
					<div className="w-full grid grid-cols-[0.5fr_1fr_1fr_1fr] gap-6 pt-2 px-4 text-sm text-highlight text-neutral-600 font-semibold">
						<span>Rank</span>
						<span>Player</span>
						<span>Points</span>
						<span>Reward</span>
					</div>

					{data?.map((scorecard) => (
						<div key={scorecard.gamertag} className="w-full items-center grid grid-cols-[0.5fr_1fr_1fr_1fr] gap-6 py-4 px-4 border border-neutral-800 rounded-2xl text-xs">
							<span>#{scorecard.rank}</span>
							<span>{scorecard.gamertag}</span>
							<span>{scorecard.points.toLocaleString()}</span>
							<span>{formatEth(scorecard.reward, scorecard.tokenSymbol)}</span>
						</div>
					))}

				</CardContent>

			</Card>
		</>
	)
}

export default Leaderboard;