import { FC } from "react";
import Link from "next/link";
import { Image } from "@heroui/image";
import NextImage from "next/image";
import { games } from "@/config/games";

interface ListGamesProps {

}

const ListGames: FC<ListGamesProps> = () => {
	return (
		<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
			{games.map((game, index) => (
				<Link key={game.slug} href={`/game/${game.slug}`} className="">
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
	)
}

export default ListGames;