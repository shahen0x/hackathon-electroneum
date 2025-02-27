import { create } from 'zustand';

type Cycle = {
	week: number;
	schedule: {
		enroll: string;
		playtime: string;
		end: string;
	};
	gameLineup: string[];
	pools: {
		contractAddress: string;
		tokenSymbol: string | undefined;
		tokenLogo: string | undefined;
		tokenAddress: string | undefined;
	}[];
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