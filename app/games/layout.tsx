"use client";

import Image from "next/image";
import Link from "next/link";

import Background from "@/components/background";
import Navbar from "@/components/navigation/navbar";

import { games } from "@/config/games";
import { Card, Chip, ScrollShadow } from "@heroui/react";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {

	const pathname = usePathname();

	return (
		<>
			<Background />
			<Navbar />
			<main className="relative z-30 h-[calc(100vh_-_3.5rem)] mt-14 grid grid-cols-[20rem_1fr]">

				<div className="relative border-r border-neutral-800">
					<ScrollShadow hideScrollBar className="absolute top-0 left-0 w-full h-full p-6">
						<div className="space-y-4">
							{games.map((game) => (
								<Card
									key={game.slug}
									isPressable={true}
									as={Link}
									href={`/games/${game.slug}`}
									classNames={{
										base: `border hover:border-neutral-600 transition-all ${pathname === `/games/${game.slug}` ? "!border-etn" : "border-neutral-800"}`,
									}}
								>
									<Image
										src={`/games/${game.slug}/media/poster.jpg`}
										alt={game.name}
										width={680}
										height={400}
										className={`w-auto h-auto ${pathname === `/games/${game.slug}` ? "opacity-100" : "opacity-40"}`}
									/>
								</Card>
								// <Link key={game.slug} href={`/game/${game.slug}`} className={`relative ${!game.canPlay && "pointer-events-none"}`}>
								// 	{!game.canPlay &&
								// 		<Chip color="warning" size="sm" className="h-4 text-[0.6rem] sm:text-xs absolute top-0 right-0 z-20 m-2">
								// 			Coming Soon
								// 		</Chip>
								// 	}
								// 	<Image
								// 		src={`/games/${game.slug}/media/poster.jpg`}
								// 		alt={game.name}
								// 		width={680}
								// 		height={400}
								// 		className={`w-full h-full rounded-2xl ${!game.canPlay && "opacity-40"}`}
								// 	/>
								// </Link>
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