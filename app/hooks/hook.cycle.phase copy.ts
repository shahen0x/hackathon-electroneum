import { parseISO, isBefore, differenceInMilliseconds, eachDayOfInterval, format, isBefore as isBeforeDate } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { useCycleStore } from "~/store/store.cycle";
import { CyclePhase } from "~/types/types.cycle";

interface CycleDayData {
	dayName: string;
	dateTime: Date;
	hasPassed: boolean;
}

const useCyclePhase = () => {
	// Store
	const { cycle } = useCycleStore();

	// States
	const [currentPhase, setCurrentPhase] = useState<CyclePhase>(CyclePhase.NotOpenYet);
	const [percentage, setPercentage] = useState<number>(0);
	const [cycleDays, setCycleDays] = useState<CycleDayData[]>([]);

	// Memoized schedule
	const { enrollTime, playTime, endTime } = useMemo<{
		enrollTime: Date;
		playTime: Date;
		endTime: Date;
	}>(() => {
		if (cycle) {
			return {
				enrollTime: parseISO(cycle.schedule.enroll),
				playTime: parseISO(cycle.schedule.playtime),
				endTime: parseISO(cycle.schedule.end),
			};
		}
		return { enrollTime: new Date(), playTime: new Date(), endTime: new Date() }; // Default value
	}, [cycle]);

	// Effect to update phase, percentage, and cycle days array
	useEffect(() => {
		const now = new Date();

		// Calculate and set the days of the cycle between enroll and end time with datetime and passed flag
		const days = eachDayOfInterval({ start: enrollTime, end: endTime });
		const cycleDaysArray = days.map((day) => {
			const dayName = format(day, 'EEE'); // Get weekday name (Mon, Tue, etc.)
			const hasPassed = isBeforeDate(day, now); // Check if the day has passed
			return {
				dayName,
				dateTime: day,
				hasPassed,
			};
		});
		setCycleDays(cycleDaysArray);

		// Update phase and percentage
		if (isBefore(now, enrollTime)) {
			setCurrentPhase(CyclePhase.NotOpenYet);
			setPercentage(0);
		} else if (isBefore(now, playTime)) {
			setCurrentPhase(CyclePhase.Enroll);
			setPercentage(Math.min(100, (differenceInMilliseconds(now, enrollTime) / differenceInMilliseconds(playTime, enrollTime)) * 100));
		} else if (isBefore(now, endTime)) {
			setCurrentPhase(CyclePhase.Playtime);
			setPercentage(Math.min(100, (differenceInMilliseconds(now, playTime) / differenceInMilliseconds(endTime, playTime)) * 100));
		} else {
			setCurrentPhase(CyclePhase.Ended);
			setPercentage(100);
		}
	}, [enrollTime, playTime, endTime]);

	// Exporting current phase, percentage, and cycle days with full data
	return { currentPhase, percentage, cycleDays };
};

export default useCyclePhase;
