import { Id } from "~/convex/_generated/dataModel";

export type ActiveCycle = {
	schedule: {
		cycleStart: string;
		playtimeStart: string;
		playtimeEnd: string;
		cycleEnd: string;
	};
	gameLineup: {
		ballsort?: boolean | undefined;
		matchtwo?: boolean | undefined;
	};
	week: number;
}

export type ActivePool = {
	id: Id<"pools">;
	contractAddress: string;
	tokenAddress: string | undefined;
	tokenLogo: string | undefined;
	tokenSymbol: string | undefined;
	brandColor: string | undefined;
}

export type UpcomingPool = {
	tokenLogo: string;
	tokenSymbol: string;
	brandColor: string | undefined;
}

export type Cycle = {
	activeCycle: ActiveCycle;
	activePools: ActivePool[];
	upcomingPools: UpcomingPool[]
} | null


export enum CyclePhase {
	CycleNotStarted = "Cycle not started",
	CycleStarted = "Cycle started",
	PlaytimeStarted = "Playtime started",
	PlaytimeEnded = "Playtime ended",
	CycleEnded = "Cycle ended",
}