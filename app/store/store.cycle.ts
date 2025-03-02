import { create } from 'zustand';


export type PoolStatus = "active" | "upcoming" | "disabled";

export type Pool = {
	status: PoolStatus;
	brandColor: string | undefined;
	contractAddress: string;
	tokenSymbol: string;
	tokenLogo: string;
	tokenAddress: string;
}

export type Cycle = {
	week: number;
	schedule: {
		enroll: string;
		playtime: string;
		end: string;
	};
	gameLineup: string[];
	pools: Pool[];
} | null

interface CycleStore {

	isLoading: boolean;
	setIsLoading: (isLoading: boolean) => void;

	cycle: Cycle;
	setCycle: (cycle: Cycle) => void;

}

export const useCycleStore = create<CycleStore>((set) => ({

	isLoading: true,
	setIsLoading: (isLoading) => set({ isLoading }),

	cycle: null,
	setCycle: (cycle) => set({ cycle })

}));