import { useQuery } from "@tanstack/react-query";
import { useConvex } from "convex/react";
import { useEffect } from "react";
import { api } from "~/convex/_generated/api";
import { useCycleStore } from "~/store/store.cycle";



const DataCycle = () => {

	// States
	const { cycle, setCycle, setIsLoading } = useCycleStore();

	// Hooks
	const convex = useConvex();

	// Fetch data function
	const fetchCycleWithPools = async () => {
		console.log("🔃 Fetching cycle data...");
		return await convex.query(api.pools.getActiveCycleWithPools);
	}

	// Fetch and set cycle store
	const { data: cycleData, error: cycleError, isError: isCycleError } = useQuery({
		queryKey: ["cycleData"],
		queryFn: fetchCycleWithPools,
		enabled: !cycle,
		staleTime: 1000 * 60 * 30, // 30mins
	});

	useEffect(() => {
		if (cycleData) {
			setCycle(cycleData);
			setIsLoading(false);
		} else if (isCycleError) {
			console.error(cycleError);
			setIsLoading(false);
		}
	}, [cycleData, isCycleError, cycleError]);


	return null;
}

export default DataCycle;