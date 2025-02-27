import { FC } from "react";
import { useCycleStore } from "~/store/store.cycle";
import { CountdownRenderer } from "../countdown-renderer";

interface CycleCountdownProps {

}

const CycleCountdown: FC<CycleCountdownProps> = () => {

	const { cycle, isLoading } = useCycleStore();

	if (!cycle) return null;

	return (
		<CountdownRenderer layout="cards-sm" date={cycle.schedule.playtime} />
	);
}

export default CycleCountdown;