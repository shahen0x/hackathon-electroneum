import { Link, MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
	return [
		{ title: "Games" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export default function Play() {
	return (
		<>
			<div>
				<div>
					<Link to="/play/ballsort">Ballsort</Link>
					<Link to="/play/ballsort">Ballsort</Link>
					<Link to="/play/ballsort">Ballsort</Link>
				</div>
			</div>
		</>
	);
}