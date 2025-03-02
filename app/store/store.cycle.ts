import { create } from 'zustand';
import { Cycle } from '~/types/types.cycle';

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