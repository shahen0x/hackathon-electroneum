'use client';

import { parseISO } from "date-fns";
import { FC, Fragment, HTMLAttributes, useEffect, useState } from "react";
import Countdown from "react-countdown";
import { cn } from "~/lib/utils";

interface CountdownRendererProps extends HTMLAttributes<HTMLDivElement> {
	date: string;
	layout?: "cards" | "cards-sm" | "text";
}

export const CountdownRenderer: FC<CountdownRendererProps> = ({ className, date, layout = "text", ...props }) => {

	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const styles = {
		container: "bg-secondary/20 text-white flex flex-col items-center justify-center",
		title: "text-[0.7rem] text-muted-foreground",
		colon: "text-white text-xl animate-ping",
	}

	if (!mounted) return null;

	const Render = ({ days, hours, minutes, seconds }: any) => {

		const timeUnits = [
			{ value: days, label: "Days" },
			{ value: hours, label: "Hours" },
			{ value: minutes, label: "Mins" },
			{ value: seconds, label: "Secs" },
		];

		if (layout === "cards") {
			return (
				<div className={cn("flex gap-1 items-center", className)} {...props}>

					{timeUnits.map((unit, index) => (
						<Fragment key={index}>
							<div className={`w-[3.5rem] h-[3.5rem] flex-shrink-0 sm:w-[70px] sm:h-[70px] rounded-2xl sm:rounded-3xl ${styles.container}`}>
								<span className="text-xl sm:text-2xl">{unit.value}</span>
								<span className={styles.title}>{unit.label}</span>
							</div>

							{index < timeUnits.length - 1 && (
								<span className={styles.colon}>:</span>
							)}
						</Fragment>
					))}
				</div>
			)
		}

		if (layout === "cards-sm") {
			return (
				<div className={cn("flex gap-1 items-center", className)} {...props}>

					{timeUnits.map((unit, index) => (
						<Fragment key={index}>
							<div className={`w-[3.5rem] h-[3.5rem] flex-shrink-0 sm:w-14 sm:h-14 rounded-2xl ${styles.container}`}>
								<span className="text-xl sm:text-xl">{unit.value}</span>
								<span className={styles.title}>{unit.label}</span>
							</div>

							{index < timeUnits.length - 1 && (
								<span className={styles.colon}>:</span>
							)}
						</Fragment>
					))}
				</div>
			)
		}

		if (layout === "text") {
			return (
				<>
					<span className={cn(className)}>{days}d : {hours}h : {minutes}m : {seconds}s</span>
				</>
			)
		}


	}

	// if (!mounted) {
	// 	return (
	// 		<div className="flex gap-1 items-center">
	// 			{Array.from({ length: 4 }).map((_, index) => (
	// 				<React.Fragment key={index}>
	// 					<Skeleton className={styles.container} />
	// 					{index < 3 && (
	// 						<span className={styles.colon}>:</span>
	// 					)}
	// 				</React.Fragment>
	// 			))}
	// 		</div>
	// 	)

	// }


	return (
		<Countdown
			date={parseISO(date)}
			renderer={Render}
		/>
	)
}