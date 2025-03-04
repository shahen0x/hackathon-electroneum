import { useEffect, useState } from "react";
import { MetaFunction } from "@remix-run/node";
import { Link, Outlet, useLocation, useNavigate } from "@remix-run/react";

import { appConfig } from "~/config/app";
import { games } from "~/config/games";

import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Badge } from "~/components/ui/badge"

import { isMobile } from 'react-device-detect';
import { Spinner } from "~/components/ui/spinner";

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
	const [mobile, setMobile] = useState<boolean | null>(null);

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



	useEffect(() => {
		setMobile(isMobile);
	}, []);


	if (mobile === null) {
		return (
			<div className="h-[calc(100vh_-_4rem)] flex items-center justify-center">
				<Spinner />
			</div>
		);
	}

	if (mobile) {
		return (
			<main className="relative z-30 pt-20 pb-6">
				<div className="container space-y-4">
					{games.map((game) => (
						<Link
							key={game.slug}
							to={`/play/${game.slug}`}
							className={`
								relative block overflow-hidden border-2 transition-all rounded-2xl border-neutral-800
								${!game.canPlay && "cursor-not-allowed pointer-events-none"}
							`}
						>
							{!game.canPlay &&
								<Badge variant="destructive" className="absolute top-0 right-0 z-20 m-2">
									Coming Soon
								</Badge>
							}
							<img
								src={`https://cdn.electroplay.fun/games/${game.slug}/media/poster.jpg`}
								alt={game.name}
								className={`
									w-full h-auto
									${!game.canPlay && "!opacity-40"}
								`}
							/>
						</Link>
					))}
				</div>
			</main>
		)
	}

	return (
		<main className="relative z-30 h-[calc(100vh_-_4rem)] mt-16 grid grid-cols-[20rem_1fr]">
			<div className="overflow-hidden relative border-r">
				<ScrollArea className="absolute top-0 left-0 w-full h-full p-4">
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
									overflow-hidden relative border-2 transition-all rounded-2xl 
									${location.pathname === `/games/${game.slug}` ? "border-etn" : "border-neutral-800"}
									${!game.canPlay && "cursor-not-allowed"}
								`}
							>
								{!game.canPlay &&
									<Badge variant="destructive" className="absolute top-0 right-0 z-20 m-2">
										Coming Soon
									</Badge>
								}
								<img
									src={`https://cdn.electroplay.fun/games/${game.slug}/media/poster.jpg`}
									alt={game.name}
									className={`
										w-full h-auto transition-all
										${location.pathname === `/games/${game.slug}` ? "opacity-100" : "opacity-60 hover:opacity-100"}
										${!game.canPlay && "!opacity-10"}
									`}
								/>
							</button>
						))}
					</div>
				</ScrollArea>
			</div>

			<div className="p-6 flex items-center justify-center">
				<Outlet />
			</div>
		</main>
	);
}