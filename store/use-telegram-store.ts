import { Doc } from '@/convex/_generated/dataModel';
import { create } from 'zustand';

interface TelegramStore {
	telegramInitData: string | undefined;
	setTelegramInitData: (telegramInitData: string) => void;

	isAuthenticated: boolean;
	setIsAuthenticated: (isAuthenticated: boolean) => void;

	userData: Doc<"users"> | null;
	setUserData: (userData: Doc<"users"> | null) => void;
}

export const useTelegramStore = create<TelegramStore>((set) => ({
	telegramInitData: undefined,
	setTelegramInitData: (telegramInitData: string) => set({ telegramInitData }),

	isAuthenticated: false,
	setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),

	userData: null,
	setUserData: (userData: Doc<"users"> | null) => set({ userData }),
}));