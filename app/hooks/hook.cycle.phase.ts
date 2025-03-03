import { parseISO, isBefore, differenceInMilliseconds } from "date-fns";
import { useEffect, useState, useCallback, useRef } from "react";
import { useCycleStore } from "~/store/store.cycle";
import { CyclePhase } from "~/types/types.cycle";

const useCyclePhase = () => {
	const { cycle } = useCycleStore();
	const [currentPhase, setCurrentPhase] = useState<CyclePhase>(CyclePhase.CycleNotStarted);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	// Memoize the phase calculation function to prevent unnecessary recalculations
	const calculatePhase = useCallback(() => {
		if (!cycle?.activeCycle?.schedule) {
			return { phase: CyclePhase.CycleNotStarted, nextTransition: null };
		}

		const { cycleStart, playtimeStart, playtimeEnd, cycleEnd } = cycle.activeCycle.schedule;

		// Parse dates only once
		const parsedCycleStart = parseISO(cycleStart);
		const parsedPlaytimeStart = parseISO(playtimeStart);
		const parsedPlaytimeEnd = parseISO(playtimeEnd);
		const parsedCycleEnd = parseISO(cycleEnd);
		const now = new Date();

		if (isBefore(now, parsedCycleStart)) {
			return { phase: CyclePhase.CycleNotStarted, nextTransition: parsedCycleStart };
		} else if (isBefore(now, parsedPlaytimeStart)) {
			return { phase: CyclePhase.CycleStarted, nextTransition: parsedPlaytimeStart };
		} else if (isBefore(now, parsedPlaytimeEnd)) {
			return { phase: CyclePhase.PlaytimeStarted, nextTransition: parsedPlaytimeEnd };
		} else if (isBefore(now, parsedCycleEnd)) {
			return { phase: CyclePhase.PlaytimeEnded, nextTransition: parsedCycleEnd };
		} else {
			return { phase: CyclePhase.CycleEnded, nextTransition: null };
		}
	}, [cycle]);

	// Update phase and schedule next update
	const updatePhase = useCallback(() => {
		const { phase, nextTransition } = calculatePhase();
		setCurrentPhase(phase);

		// Clear any existing timeout
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}

		// Schedule next update only when needed
		if (nextTransition) {
			const delay = differenceInMilliseconds(nextTransition, new Date());
			// Add 100ms buffer to ensure we don't miss the transition
			const safeDelay = Math.max(delay, 1000);

			timeoutRef.current = setTimeout(() => {
				updatePhase();
			}, safeDelay);
		}
	}, [calculatePhase]);

	// Setup effect to handle cycle changes and cleanup
	useEffect(() => {
		updatePhase();

		// Cleanup function to clear timeout when component unmounts or dependencies change
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
				timeoutRef.current = null;
			}
		};
	}, [updatePhase]);

	return { currentPhase };
};

export default useCyclePhase;