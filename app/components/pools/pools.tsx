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


	// Shuffle and sort function
	//
	function shuffleArray<T>(array: T[]): T[] {
		return array
			.map(item => ({ item, sort: Math.random() }))
			.sort((a, b) => a.sort - b.sort)
			.map(({ item }) => item);
	}


	// Sort active pools by ETN and shuffle the order of the rest
	//
	function sortActivePools(cycle: { activePools: any[] } | null | undefined) {
		if (!cycle?.activePools || cycle.activePools.length === 0) return [];

		const etnPool = cycle.activePools.find(pool => pool.tokenSymbol === "ETN");
		const otherPools = cycle.activePools.filter(pool => pool.tokenSymbol !== "ETN");

		return etnPool ? [etnPool, ...shuffleArray(otherPools)] : shuffleArray(otherPools);
	}


	// Sort the active pools
	const sortedPools = sortActivePools(cycle);


	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-2">
			{!isLoading && sortedPools.map((pool) => (
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