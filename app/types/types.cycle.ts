export type ActiveCycle = {
	schedule: {
		enroll: string;
		playtime: string;
		end: string;
	};
	gameLineup: {
		ballsort?: boolean | undefined;
		matchtwo?: boolean | undefined;
	};
	week: number;
}

export type ActivePool = {
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
	NotOpenYet = 'Not open yet',
	Enroll = 'Enroll',
	Playtime = 'Playtime',
	Ended = 'Ended',
}