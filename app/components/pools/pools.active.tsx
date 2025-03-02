import { FC, HTMLAttributes } from "react";
import PoolCard from "./pool.card";
import { Card } from "../ui/card";
import { cn } from "~/lib/utils";
import { useCycleStore } from "~/store/store.cycle";

interface ActivePoolsProps extends HTMLAttributes<HTMLDivElement> { }

export type PoolStatus = "active" | "upcoming" | "disabled";

// export type Pool = {
// 	status: PoolStatus;
// 	poolPrice: number;
// 	tokenSymbol: string,
// 	tokenLogo: string,
// 	tokenAddress: string,
// 	contractAddress: string,
// 	brandColor?: string;
// }

export type PoolType = {
	isNative: boolean;
	tokenSymbol: string;
	tokenLogo: string;
	contractAddress: string;
	tokenAddress: string;
	participants: number;
	poolPrice: number;
	commissionPercentage: number;
} | undefined;

const ActivePools: FC<ActivePoolsProps> = ({ className }) => {

	const { cycle } = useCycleStore();

	return (
		<div className={cn(className, "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-2")}>
			{cycle?.pools.map((pool) => (
				<PoolCard key={pool?.tokenSymbol} pool={pool} />
			))}
			<Card className="min-h-[160px] opacity-30" />
			<Card className="min-h-[160px] opacity-30" />
			<Card className="min-h-[160px] opacity-30" />
		</div>
	)
}

export default ActivePools;