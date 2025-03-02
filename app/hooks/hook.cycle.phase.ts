import { parseISO, isBefore, differenceInMilliseconds } from "date-fns";
import { useEffect, useState } from "react";
import { useCycleStore } from "~/store/store.cycle";
import { CyclePhase } from "~/types/types.cycle";

const useCyclePhase = () => {
	const { cycle } = useCycleStore();
	const [currentPhase, setCurrentPhase] = useState<CyclePhase>(CyclePhase.NotOpenYet);

	useEffect(() => {
		if (!cycle) return;

		const enrollTime = parseISO(cycle.activeCycle.schedule.enroll);
		const playTime = parseISO(cycle.activeCycle.schedule.playtime);
		const endTime = parseISO(cycle.activeCycle.schedule.end);

		const updatePhase = () => {
			const now = new Date();
			if (isBefore(now, enrollTime)) {
				setCurrentPhase(CyclePhase.NotOpenYet);
				return enrollTime;
			} else if (isBefore(now, playTime)) {
				setCurrentPhase(CyclePhase.Enroll);
				return playTime;
			} else if (isBefore(now, endTime)) {
				setCurrentPhase(CyclePhase.Playtime);
				return endTime;
			} else {
				setCurrentPhase(CyclePhase.Ended);
				return null;
			}
		};

		// Run immediately
		const nextUpdate = updatePhase();

		// Schedule next update only when needed
		if (nextUpdate) {
			const delay = differenceInMilliseconds(nextUpdate, new Date());
			const timeout = setTimeout(updatePhase, Math.max(delay, 1000)); // Prevents negative values
			return () => clearTimeout(timeout);
		}
	}, [cycle]); // Runs when cycle changes

	return { currentPhase };
};

export default useCyclePhase;
