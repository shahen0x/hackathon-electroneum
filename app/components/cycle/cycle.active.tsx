import { FC, HTMLAttributes } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { cn } from "~/lib/utils";
import { useCycleStore } from "~/store/store.cycle";
import { formatDate } from "~/lib/format.date";
import { Link } from "@remix-run/react";
import useCyclePhase from "~/hooks/hook.cycle.phase";
import { CountdownRenderer } from "../countdown-renderer";
import { CyclePhase } from "~/types/types.cycle";
import { Badge } from "../ui/badge";
import { CgArrowLongRight } from "react-icons/cg";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "../ui/popover"

interface CycleActiveProps extends HTMLAttributes<HTMLDivElement> { }

const CycleActive: FC<CycleActiveProps> = ({ className }) => {

	const { cycle } = useCycleStore();
	const { currentPhase } = useCyclePhase();

	console.log(currentPhase);


	return cycle ? (
		<Card className={cn(className, "flex flex-col relative overflow-hidden")}>

			<CardHeader className="relative z-10 space-y-1 border-b">
				<CardTitle className="flex items-center gap-3 font-pixel text-md">
					Gaming Week #{cycle?.activeCycle.week}
				</CardTitle>
				<CardDescription className="flex items-center gap-2 text-sm">
					{formatDate(cycle?.activeCycle.schedule.cycleStart)} <CgArrowLongRight size={20} className="opacity-20" /> {formatDate(cycle?.activeCycle.schedule.playtimeEnd)}
				</CardDescription>
			</CardHeader>

			<CardContent className="pt-4 flex-1">

				<div className="mb-3 w-full flex items-center justify-between">
					<div className="text-xs text-muted-foreground">
						{
							currentPhase === CyclePhase.CycleNotStarted ? "Pools opening in:" :
								currentPhase === CyclePhase.CycleStarted ? "Playtime starting in:" :
									currentPhase === CyclePhase.PlaytimeStarted ? "Playtime ending in:" :
										currentPhase === CyclePhase.PlaytimeEnded ? "Game week closing in:" :
											currentPhase === CyclePhase.CycleEnded ? "Game week closed." : "~"
						}
					</div>

					<Popover>
						<PopoverTrigger>
							<Badge variant={"secondary"}>View Schedule</Badge>
						</PopoverTrigger>
						<PopoverContent side="top" className="bg-neutral-900 space-y-2">
							<div className="flex items-center justify-between">
								<h4>Schedule</h4>
								<span className="text-xs text-muted-foreground">*In your local time</span>
							</div>

							<div className="flex justify-between text-sm bg-neutral-700 px-4 py-2 rounded-lg">
								<span className="text-muted-foreground">Pools open</span>
								<span>{formatDate(cycle?.activeCycle.schedule.cycleStart, "dd MMM - HH:mm")}</span>
							</div>

							<div className="flex justify-between text-sm bg-neutral-700 px-4 py-2 rounded-lg">
								<span className="text-muted-foreground">Playtime start</span>
								<span>{formatDate(cycle?.activeCycle.schedule.playtimeStart, "dd MMM - HH:mm")}</span>
							</div>

							<div className="flex justify-between text-sm bg-neutral-700 px-4 py-2 rounded-lg">
								<span className="text-muted-foreground">Playtime end</span>
								<span>{formatDate(cycle?.activeCycle.schedule.playtimeEnd, "dd MMM - HH:mm")}</span>
							</div>

							<p className="text-xs text-center text-muted-foreground">Next gaming cycle starts: {formatDate(cycle?.activeCycle.schedule.cycleEnd, "dd MMM - HH:mm")}</p>
						</PopoverContent>
					</Popover>
				</div>

				{cycle &&
					<CountdownRenderer
						key={currentPhase}
						className="w-full justify-around"
						layout="cards-sm"
						date={
							currentPhase === CyclePhase.CycleNotStarted ? cycle?.activeCycle.schedule.cycleStart :
								currentPhase === CyclePhase.CycleStarted ? cycle?.activeCycle.schedule.playtimeStart :
									currentPhase === CyclePhase.PlaytimeStarted ? cycle.activeCycle.schedule.playtimeEnd :
										cycle?.activeCycle.schedule.cycleEnd
						}
					/>
				}
			</CardContent>

			<CardFooter className="pt-4 flex-col border-t">
				<div className="mb-3 w-full flex items-center justify-between">
					<div className="text-xs text-muted-foreground">This week&apos;s game linup</div>

					<Popover>
						<PopoverTrigger>
							<Badge variant={"secondary"} className="h-5">?</Badge>
						</PopoverTrigger>
						<PopoverContent side="top" className="bg-neutral-900 text-sm">
							The game lineup consists of games selected for the current cycle, meaning that competition mode will be enabled only for these games.
						</PopoverContent>
					</Popover>
				</div>

				<div className="grid grid-cols-2 gap-4">
					{Object.entries(cycle?.activeCycle.gameLineup || {})
						.filter(([_, isEnabled]) => isEnabled)
						.map(([game]) => (
							<Link to={`/games/${game}`} key={game}>
								<img
									src={`/games/${game}/media/poster.jpg`}
									alt={game}
									className="border rounded-lg aspect-video"
								/>
							</Link>
						))}
				</div>
			</CardFooter>
		</Card>
	) : null;
}

export default CycleActive;