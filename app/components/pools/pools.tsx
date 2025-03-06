/**
 * POOLS
 * This component displays the active and upcoming pools
 * 
 */
import PoolCardActive from "./pool.card.active";
import { Card } from "../ui/card";
import { useCycleStore } from "~/store/store.cycle";
import PoolCardUpcoming from "./pool.card.upcoming";


const Pools = () => {

	// Store
	const { cycle, isLoading } = useCycleStore();


	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-2">
			{!isLoading && cycle?.activePools.map((pool) => (
				<PoolCardActive key={pool?.tokenSymbol} activePool={pool} />
			))}

			{!isLoading && cycle?.upcomingPools.map((pool) => (
				<PoolCardUpcoming key={pool?.tokenSymbol} pool={pool} />
			))}

			{!isLoading &&
				<>
					<Card className="hidden lg:block min-h-[160px] opacity-30" />
					<Card className="hidden lg:block min-h-[160px] opacity-30" />
				</>
			}
		</div>
	)
}

export default Pools;