import { FC, HTMLAttributes } from "react";
import PoolCardActive from "./pool.card.active";
import { Card, CardHeader } from "../ui/card";
import { cn } from "~/lib/utils";
import { useCycleStore } from "~/store/store.cycle";
import { Separator } from "../ui/separator";
import PoolCardUpcoming from "./pool.card.upcoming";

interface PoolsProps extends HTMLAttributes<HTMLDivElement> { }

const Pools: FC<PoolsProps> = ({ className }) => {

	const { cycle } = useCycleStore();

	return (
		<div className={cn(className, "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-2")}>
			{cycle?.activePools.map((pool) => (
				<PoolCardActive key={pool?.tokenSymbol} activePool={pool} />
			))}
			{cycle?.upcomingPools.map((pool) => (
				<PoolCardUpcoming key={pool?.tokenSymbol} pool={pool} />
			))}
			<Card className="min-h-[160px] opacity-30" />
			<Card className="min-h-[160px] opacity-30" />
			<Card className="min-h-[160px] opacity-30" />
		</div>
	)
}

export default Pools;