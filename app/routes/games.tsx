import { MetaFunction } from "@remix-run/node";
import { Link, Outlet } from "@remix-run/react";
import Navbar from "~/components/navigation/navbar";

export const meta: MetaFunction = () => {
	return [
		{ title: "Games" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export default function Games() {
	return (
		<>
			<div>
				<div>
					<Link to="/games/ballsort">Ballsort</Link>
					<Link to="/games/ballsort">Ballsort</Link>
					<Link to="/games/ballsort">Ballsort</Link>
				</div>

				<div>
					<Outlet />
				</div>
			</div>
		</>
	);
}