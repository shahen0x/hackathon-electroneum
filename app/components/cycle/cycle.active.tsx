import { FC, HTMLAttributes } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { cn } from "~/lib/utils";
import { CountdownRenderer } from "../countdown-renderer";
import { Button } from "../ui/button";

interface CycleActiveProps extends HTMLAttributes<HTMLDivElement> {

}

const CycleActive: FC<CycleActiveProps> = ({ className }) => {
	return (
		<Card className={cn(className, "flex flex-col relative overflow-hidden")}>
			{/* <Progress value={48} className="absolute top-0 left-0 w-full h-full rounded-none mt-auto" /> */}
			<CardHeader className="relative z-10 space-y-3">
				<CardTitle className="font-pixel">Gaming Week #1</CardTitle>
			</CardHeader>
			<Progress value={48} className="h-[0.1rem] rounded-none" />

			{/* <Separator /> */}
			<CardContent className="px-6 py-4">
				<div className="space-y-3">
					<div className="w-full flex items-center justify-between">
						<div className="text-xs text-muted-foreground">This week&apos;s game linup</div>
						<Button size={"sm"} variant={"outline"} className="w-5 h-6 text-[0.7rem]">?</Button>
					</div>

					<div className="grid grid-cols-2 gap-4 ">
						<img
							src={`/games/ballsort/media/poster.jpg`}
							alt={"Ballsort"}
							className="rounded-md"
						/>
						<img
							src={`/games/matchtwo/media/poster.jpg`}
							alt={"Ballsort"}
							className="rounded-md"
						/>
					</div>
				</div>
			</CardContent>
			<CardFooter className="flex-col items-start mt-auto border-t pt-4 pb-3 space-y-2">

				<div className="w-full flex items-center justify-between">
					<div className="text-xs text-muted-foreground">Playtime starts in</div>
					<Button size={"sm"} variant={"outline"} className="h-5 text-[0.7rem]">Schedule</Button>
				</div>

				<div className="">
					<CountdownRenderer layout="cards-sm" date="2025-02-27T19:14:01.000Z" />
				</div>

			</CardFooter>
		</Card>
	)
}

export default CycleActive;