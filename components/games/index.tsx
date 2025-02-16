import { FC } from "react";
import Link from "next/link";
import { Image } from "@heroui/image";
import { games } from "@/config/games";
import { Chip } from "@heroui/react";

interface ListGamesProps { }

const ListGames: FC<ListGamesProps> = () => {
	return (
		<div className="space-y-4 border-dotted border-3 border-neutral-800 rounded-2xl p-4 sm:p-6">
			<div className="flex items-center justify-between">
				<h2 className="font-start2p text-sm sm:text-lg uppercase">Play Games</h2>
				<Chip color="warning" variant="flat" size="sm" className="text-[0.6rem] sm:text-xs">
					Not available on mobile yet
				</Chip>
			</div>
			<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
				{games.map((game) => (
					<Link key={game.slug} href={`/game/${game.slug}`} className="pointer-events-none lg:pointer-events-auto">
						<Image
							isBlurred
							src={`/games/${game.slug}/media/poster.jpg`}
							alt={game.name}
							width={680}
							className="w-full h-full"
						/>
					</Link>
				))}
			</div>
		</div>

	)
}

export default ListGames;