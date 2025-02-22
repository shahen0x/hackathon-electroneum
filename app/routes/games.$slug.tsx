import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader({ params }: LoaderFunctionArgs) {
	return params.slug;
}

export const meta: MetaFunction = () => {
	return [
		{ title: "Games" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export default function GamesPage() {

	const gameSlug = useLoaderData() as string;

	return (
		<iframe
			title={gameSlug}
			src="/player/ballsort"
			className="w-full max-w-7xl aspect-video rounded-2xl bg-[#231F20] border border-neutral-800"
		/>
	)
}