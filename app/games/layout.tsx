"use client";

import Image from "next/image";
import Link from "next/link";

import Background from "@/components/background";
import Navbar from "@/components/navigation/navbar";

import { games } from "@/config/games";
import { Card, Chip, ScrollShadow, Spinner, Switch } from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {

	const pathname = usePathname();
	const router = useRouter();

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
		if (pathname === "/games") {
			router.push(`/games/${game}`);
			return;
		}

		// Show confirmation if enabled
		if (confirmSwitch) {
			const confirmed = window.confirm("Are you sure you want to switch games?");
			if (!confirmed) return;
		}

		router.push(`/games/${game}`);
	};

	return (
		<>
			<Background />
			<Navbar />
			<main className="relative z-30 h-[calc(100vh_-_3.5rem)] mt-14 grid grid-cols-[20rem_1fr]">

				<div className="relative border-r border-neutral-800">
					<ScrollShadow hideScrollBar className="absolute top-0 left-0 w-full h-full p-6">

						<div className="mb-4 flex items-center justify-between">
							<span className="text-sm text-neutral-400">Select Game</span>
							<div>
								<Switch
									size="sm"
									classNames={{
										wrapper: "h-4 w-8",
										thumb: "h-2 w-2",
										label: "text-xs text-neutral-400",
									}}
									isSelected={confirmSwitch}
									onValueChange={toggleConfirmSwitch}
								>
									Switch alert
								</Switch>
							</div>
						</div>

						<div className="space-y-4">
							{games.map((game) => (
								<Card
									key={game.slug}
									isPressable={game.canPlay ? true : false}
									isDisabled={!game.canPlay}
									onPress={() => handleSelectGame(game.slug)}
									className="relative"
									classNames={{
										base: `border hover:border-neutral-600 transition-all ${pathname === `/games/${game.slug}` ? "!border-etn" : "border-neutral-800"}`,
									}}
								>
									{!game.canPlay &&
										<Chip color="warning" size="sm" className="h-4 text-[0.6rem] sm:text-xs absolute top-0 right-0 z-20 m-2">
											Coming Soon
										</Chip>
									}
									<Image
										src={`/games/${game.slug}/media/poster.jpg`}
										alt={game.name}
										width={680}
										height={400}
										className={`w-auto h-auto ${pathname === `/games/${game.slug}` ? "opacity-100" : "opacity-40"}`}
									/>
								</Card>
							))}
						</div>

					</ScrollShadow>
				</div>

				<div className="p-6 flex items-center justify-center">
					{children}
				</div>
			</main>
		</>
	);
}