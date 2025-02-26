"use client";

import { FC } from "react";
import { Card, CardHeader, CardContent } from "../ui/card";

interface LeaderboardProps {

}

const Leaderboard: FC<LeaderboardProps> = () => {
	return (
		<>
			<Card>
				<CardHeader>
					<div className="w-full grid grid-cols-[0.5fr_1fr_1fr_1fr] gap-6 pt-2 px-4 text-highlight text-neutral-600 font-semibold">
						<span>Rank</span>
						<span>Player</span>
						<span>Points</span>
						<span>Reward</span>
					</div>
				</CardHeader>

				<CardContent className="space-y-2">
					<div className="w-full items-center grid grid-cols-[0.5fr_1fr_1fr_1fr] gap-6 py-4 px-4 border border-neutral-800 rounded-2xl">
						<span>#1</span>
						<span>Shahen0x</span>
						<span>900</span>
						<span>1000 ETN</span>
					</div>
					<div className="w-full items-center grid grid-cols-[0.5fr_1fr_1fr_1fr] gap-6 py-4 px-4 border border-neutral-800 rounded-2xl">
						<span>#2</span>
						<span>Shahen0x</span>
						<span>900</span>
						<span>800 ETN</span>
					</div>
					<div className="w-full items-center grid grid-cols-[0.5fr_1fr_1fr_1fr] gap-6 py-4 px-4 border border-neutral-800 rounded-2xl">
						<span>#3</span>
						<span>Shahen0x</span>
						<span>900</span>
						<span>600 ETN</span>
					</div>
					<div className="w-full items-center grid grid-cols-[0.5fr_1fr_1fr_1fr] gap-6 py-4 px-4 border border-neutral-800 rounded-2xl">
						<span>#4</span>
						<span>Shahen0x</span>
						<span>900</span>
						<span>400 ETN</span>
					</div>
				</CardContent>
			</Card>
		</>
	)
}

export default Leaderboard;