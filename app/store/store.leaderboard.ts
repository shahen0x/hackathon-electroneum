import { create } from "zustand";
import { Id } from "~/convex/_generated/dataModel";

interface LeaderboardStore {
	activeTab: Id<"pools"> | null;
	setActiveTab: (activeTab: Id<"pools">) => void;
}

export const useLeaderboardStore = create<LeaderboardStore>((set) => ({
	activeTab: null,
	setActiveTab: (activeTab) => set({ activeTab })
}));