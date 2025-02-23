import { useEffect, useState } from "react";
import { MetaFunction } from "@remix-run/node";
import { Outlet, useLocation, useNavigate } from "@remix-run/react";

import { appConfig } from "~/config/app";
import { games } from "~/config/games";

import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";

export const meta: MetaFunction = () => {
	return [
		{ title: `🔴 Select Game - ${appConfig.name}` },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export default function LayoutGames() {

	// Hooks
	const location = useLocation();
	const navigate = useNavigate();

	// Hooks
	const [confirmSwitch, setConfirmSwitch] = useState(false);

	// Load setting from localStorage on mount
	useEffect(() => {
		const savedPreference = localStorage.getItem("confirmGameSwitch");
		if (savedPreference !== null) {
			setConfirmSwitch(savedPreference === "true");
		}
	}, []);

	// Save user preference to localStorage
	const toggleConfirmSwitch = (enabled: boolean) => {
		setConfirmSwitch(enabled);
		localStorage.setItem("confirmGameSwitch", String(enabled));
	};

	const handleSelectGame = (game: string) => {
		// Don't trigger confirmation on "/games", only on "/games/[slug]"
		if (location.pathname === "/games") {
			navigate(`/games/${game}`);
			return;
		}

		// Show confirmation if enabled
		if (confirmSwitch) {
			const confirmed = window.confirm("Are you sure you want to switch games?");
			if (!confirmed) return;
		}

		navigate(`/games/${game}`);
	};

	return (
		<main className="relative z-30 h-[calc(100vh_-_4rem)] mt-16 grid grid-cols-[20rem_1fr]">

			<div className="relative border-r  p-6">
				<div className="mb-4 flex items-center justify-between">
					<span className="text-sm text-neutral-400">Select Game</span>
					<div className="flex items-center gap-2">
						<Switch
							id="switch-alert"
							checked={confirmSwitch}
							onCheckedChange={toggleConfirmSwitch}
						/>
						<Label htmlFor="switch-alert" className="cursor-pointer text-xs text-muted-foreground">Alert on switch</Label>
					</div>
				</div>

				<div className="space-y-4">
					{games.map((game) => (
						<button
							key={game.slug}
							onClick={() => handleSelectGame(game.slug)}
							disabled={!game.canPlay}
							className={`
								overflow-hidden border-2 transition-all rounded-2xl 
								${location.pathname === `/games/${game.slug}` ? "border-etn opacity-100" : "border-neutral-800 opacity-40 hover:opacity-100"}
								${!game.canPlay && "cursor-not-allowed !opacity-40"}
							`}
						>
							<img src={`/games/${game.slug}/media/poster.jpg`} alt={game.name} className="w-full h-auto" />
						</button>
					))}
				</div>
			</div>

			<div className="p-6 flex items-center justify-center">
				<Outlet />
			</div>
		</main>
	);
}