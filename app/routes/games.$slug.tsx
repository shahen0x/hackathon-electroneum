import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { games } from "~/config/games";

export async function loader({ params }: LoaderFunctionArgs) {
	return params.slug;
}

export const meta: MetaFunction = ({ params }) => {
	const slug = params.slug
	const game = games.find((game) => game.slug === slug);

	return [
		{ title: `🟢 Playing: ${game?.name}` },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export default function GamesPage() {

	const gameSlug = useLoaderData() as string;

	return (
		<iframe
			title={gameSlug}
			src={`/play/${gameSlug}`}
			className="w-full max-w-7xl aspect-video rounded-2xl bg-[#231F20] border border-neutral-800"
		/>
	)
}