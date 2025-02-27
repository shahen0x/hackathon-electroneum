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

interface CycleActiveProps extends HTMLAttributes<HTMLDivElement> { }

const CycleActive: FC<CycleActiveProps> = ({ className }) => {

	const { cycle } = useCycleStore();

	const { currentPhase } = useCyclePhase();

	return (
		<Card className={cn(className, "flex flex-col relative overflow-hidden")}>

			<CardHeader className="relative z-10 space-y-1 border-b">
				<CardTitle className="flex items-center gap-3 font-pixel text-md">
					Gaming Week #{cycle?.week}
				</CardTitle>
				<CardDescription className="flex items-center gap-2 text-sm">
					{formatDate(cycle?.schedule.enroll)} <CgArrowLongRight size={20} className="opacity-20" /> {formatDate(cycle?.schedule.end)}
				</CardDescription>
			</CardHeader>

			<CardContent className="pt-4 flex-1">

				<div className="mb-3 w-full flex items-center justify-between">
					<div className="text-xs text-muted-foreground">
						{currentPhase === CyclePhase.NotOpenYet ? "Pools opening in:" :
							currentPhase === CyclePhase.Enroll ? "Playtime starting in:" :
								currentPhase === CyclePhase.Playtime ? "Playtime ending in:" :
									"Gaming Week Closed"
						}
					</div>
					<Badge variant={"secondary"}>View Schedule</Badge>
				</div>

				{cycle &&
					<CountdownRenderer
						className="w-full justify-around"
						layout="cards-sm"
						date={
							currentPhase === CyclePhase.NotOpenYet ? cycle.schedule.enroll :
								currentPhase === CyclePhase.Enroll ? cycle.schedule.playtime :
									cycle.schedule.end
						}
					/>
				}
			</CardContent>

			<CardFooter className="pt-4 flex-col border-t">
				<div className="mb-3 w-full flex items-center justify-between">
					<div className="text-xs text-muted-foreground">This week&apos;s game linup</div>
					<Badge variant={"secondary"} className="h-5">?</Badge>
				</div>

				<div className="grid grid-cols-2 gap-4 ">
					{cycle?.gameLineup.map((game) => (
						<Link to={`/games/${game}`} key={game}>
							<img
								src={`/games/${game}/media/poster.jpg`}
								alt="Ballsort"
								className="border rounded-lg aspect-video"
							/>
						</Link>
					))}
				</div>
			</CardFooter>
		</Card>
	)
}

export default CycleActive;