import { Link, useLocation } from "@remix-run/react";
import { FC } from "react";

interface NavbarProps {

}

const Navbar: FC<NavbarProps> = () => {

	const location = useLocation();

	// Hide the navbar on the game pages
	const isPlaySubRoute = location.pathname.startsWith("/play/") && location.pathname !== "/play/";
	if (isPlaySubRoute) {
		return null;
	}

	return (
		<nav className="fixed top-0 left-0 z-40 w-full h-14 px-2 py-2 border-b flex items-center">
			<Link to={"/"} className="absolute left-1/2 -translate-x-1/2">
				<img src="/logo.svg" alt="ElectroPlay" className="w-8 h-auto" />
			</Link>
		</nav>
	)
}

export default Navbar;