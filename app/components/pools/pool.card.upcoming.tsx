import { FC } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { UpcomingPool } from "~/types/types.cycle";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

interface PoolCardUpcomingProps {
	pool: UpcomingPool;
}

const PoolCardUpcoming: FC<PoolCardUpcomingProps> = ({ pool }) => {

	return (
		<Card key={pool?.tokenSymbol} className="flex flex-col">
			<CardHeader className="sm:p-3 sm:pr-2 flex-row items-center gap-2 space-y-0">
				<img src={pool.tokenLogo} alt={pool.tokenSymbol} className="shrink-0 w-8 h-8 rounded-full" />

				<div className="leading-[0.6] w-full">
					<h4 className="text-sm font-bold">{pool.tokenSymbol} Pool</h4>
					<span className="text-[0.75rem] text-muted-foreground">Not active yet</span>
				</div>
			</CardHeader>

			<Separator />

			<CardContent className="my-auto p-3">
				<div className="w-full flex items-center gap-6">
					<div className="flex-1">
						<div className="text-[0.6rem] text-neutral-500">Rewards</div>
						<div className="flex items-center gap-2">
							<span className="text-xl font-semibold">~</span>
							<span className="text-xs uppercase"> {pool.tokenSymbol}</span>
						</div>
					</div>
				</div>
			</CardContent>

			<CardFooter className="p-3 pt-0 flex-col">
				<Button
					size={"sm"}
					className="w-full"
					variant={"secondary"}
					disabled={true}
				>
					Coming Soon
				</Button>
			</CardFooter>
		</Card>
	);
}

export default PoolCardUpcoming;