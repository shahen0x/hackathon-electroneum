import { FC } from "react";
import { CardContent } from "../ui/card";
import { usePaginatedQuery } from "convex/react";
import { api } from "~/convex/_generated/api";
import { Id } from "~/convex/_generated/dataModel";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";

interface LeaderboardTableProps {
	poolId: Id<"pools">;
}

const LeaderboardTable: FC<LeaderboardTableProps> = ({ poolId }) => {


	const { results, status, loadMore, isLoading } = usePaginatedQuery(api.scorecards.getPaginatedScorecards, { poolId }, { initialNumItems: 10 },);

	console.log("status", status);

	return (
		<>
			{results?.map((scorecard, index) => (
				<div key={scorecard.id} className="w-full items-center grid grid-cols-[0.5fr_1fr_1fr_1fr] gap-6 py-4 px-4 border border-neutral-800 rounded-2xl">
					<span>#{index + 1}</span>
					<span>{scorecard.gamertag || scorecard.walletAddress}</span>
					<span>{scorecard.totalPoints.toLocaleString()}</span>
					<span>1000 ETN</span>
				</div>
			))}


			{isLoading &&
				<>
					{[...Array(10)].map((_, index) => (
						<Skeleton key={index} className="w-full h-[58px] opacity-10" />
					))}
				</>
			}

			<div className="pt-4 pb-2 flex justify-center">
				<Button
					variant={"secondary"}
					onClick={() => loadMore(10)}
					disabled={status !== "CanLoadMore"}
				>
					Load More
				</Button>
			</div>
		</>
	)
}

export default LeaderboardTable;