"use client";

import { api } from "@/convex/_generated/api";
import { Card, CardBody, CardHeader, Chip, Divider, Progress } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { Preloaded, useConvex, usePreloadedQuery } from "convex/react";
import { FC } from "react";

interface CurrentCycleProps {
	preloadedCycle: Preloaded<typeof api.cycles.getActiveCycleWithPools>;
}

const CurrentCycle: FC<CurrentCycleProps> = ({ preloadedCycle }) => {

	const cycle = usePreloadedQuery(preloadedCycle);

	return (
		<>
			<Card>
				<CardHeader className="flex-col items-start p-4">
					<div className="w-full flex items-center justify-between">
						<h2 className="font-start2p text-sm sm:text-lg uppercase">Earn Rewards</h2>
						<Chip color="primary" variant="flat" size="md" className="text-[0.6rem] sm:text-xs">
							Week #{cycle?.week}
						</Chip>
					</div>
					{/* <p className="text-neutral-500">Cycle 1</p> */}
				</CardHeader>
				<Divider />
				<CardBody className="p-4 justify-center">

					<div className="space-y-2">
						<div className="flex items-center justify-between text-sm">
							<span>Playtime {cycle?.schedule.playtime}</span>
							<span>0d : 0h : 0m : 0s</span>
						</div>
						<Progress aria-label="Progress..." color="primary" size="sm" value={70} className="" />
					</div>
					{/* <div className="w-full flex items-center gap-6">
							<div className="p-2 border border-white/5 rounded-full w-12 h-12 flex items-center justify-center">
								<PiUsersFourThin size={48} />
							</div>
							<div className="flex-1">
								<div className="text-xs font-light opacity-30">Players Joined</div>
								<div className="font-light text-4xl">1000</div>
							</div>
						</div> */}
				</CardBody>
			</Card>
		</>
	)
}

export default CurrentCycle;