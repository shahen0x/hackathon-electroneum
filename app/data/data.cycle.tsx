/**
 * DATA CYCLE
 * This component autofetches the current data cycle and updates the store
 * It does not rerender because the data is the same during the cycle
 * 
 */
import { useQuery } from "@tanstack/react-query";
import { useConvex } from "convex/react";
import { useEffect } from "react";
import { api } from "~/convex/_generated/api";
import { useCycleStore } from "~/store/store.cycle";
import { Cycle } from "~/types/types.cycle";


const DataCycle = () => {

	// States
	const { cycle, setCycle, setIsLoading } = useCycleStore();

	// Hooks
	const convex = useConvex();


	// Fetch and set cycle store
	//
	const { data: cycleData, error: cycleError, isError: isCycleError } = useQuery({
		queryKey: ["cycleData"],
		queryFn: async () => await convex.query(api.pools.getActiveCycleWithPools),
		enabled: !cycle,
		staleTime: 1000 * 60 * 30, // 30mins
	});


	// Function to sort activePools
	//
	function sortActivePools(cycle: Cycle | null): Cycle | null {
		if (!cycle || !cycle.activePools || cycle.activePools.length === 0) return cycle;

		const etnPool = cycle.activePools.find(pool => pool.tokenSymbol === "ETN");
		const otherPools = cycle.activePools.filter(pool => pool.tokenSymbol !== "ETN");

		return {
			...cycle,
			activePools: etnPool ? [etnPool, ...shuffleArray(otherPools)] : shuffleArray(otherPools),
		};
	}

	function shuffleArray<T>(array: T[]): T[] {
		return array
			.map(item => ({ item, sort: Math.random() }))
			.sort((a, b) => a.sort - b.sort)
			.map(({ item }) => item);
	}

	useEffect(() => {
		if (cycleData) {
			const sortedCycleData = sortActivePools(cycleData);
			setCycle(sortedCycleData);
			setIsLoading(false);
		} else if (isCycleError) {
			console.error(cycleError);
			setIsLoading(false);
		}
	}, [cycleData, isCycleError, cycleError]);


	return null;
}

export default DataCycle;