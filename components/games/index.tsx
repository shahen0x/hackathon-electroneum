"use client";

import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { games } from "@/config/games";
import { Chip } from "@heroui/react";

interface ListGamesProps { }

const ListGames: FC<ListGamesProps> = () => {
	return (
		<div className="space-y-4 border-dotted border-3 border-neutral-800 rounded-2xl p-4 sm:p-6">
			<div className="flex items-center justify-between">
				<h2 className="font-start2p text-sm sm:text-lg uppercase">Play Games</h2>
				{/* <Chip color="warning" variant="flat" size="sm" className="text-[0.6rem] sm:text-xs">
					Not available on mobile yet
				</Chip> */}
			</div>
			<div className="grid grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-4">
				{games.map((game) => (
					<Link key={game.slug} href={`/game/${game.slug}`} className={`relative ${!game.canPlay && "pointer-events-none"}`}>
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
							className={`w-full h-full rounded-2xl ${!game.canPlay && "opacity-40"}`}
						/>
					</Link>
				))}
			</div>
		</div>

	)
}

export default ListGames;