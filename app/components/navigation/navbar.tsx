import { Link, useLocation } from "@remix-run/react";
import { FC, useEffect, useState } from "react";
import NavbarMenu from "./navbar.menu";
import WalletConnectButton from "~/thirdweb/wallet/wallet.connect";
import { Button } from "../ui/button";

import { FaTelegram, FaXTwitter } from "react-icons/fa6";
import WalletModal from "~/thirdweb/wallet/wallet.modal";
import { appSocials } from "~/config/app";

interface NavbarProps {

}

const Navbar: FC<NavbarProps> = () => {

	// Hooks
	const location = useLocation();

	// States
	const [isScrolled, setIsScrolled] = useState(false);


	// Detect scroll position and set isScrolled state
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 2);
		};

		// Run once on mount to detect initial scroll position
		handleScroll();

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);


	// Hide the navbar on the game pages
	const isPlaySubRoute = location.pathname.startsWith("/play/") && location.pathname !== "/play/";
	if (isPlaySubRoute) {
		return null;
	}


	return (
		<nav className={`fixed top-0 left-0 z-40 w-full h-16 px-2 py-2 flex items-center justify-between transition-all duration-300 border-b border-neutral-800
			${isScrolled ? "shadow-2xl backdrop-blur-md bg-neutral-950/30" : "shadow-none bg-transparent"}
		`}>
			<Link to={"/"} className="absolute left-1/2 -translate-x-1/2">
				<img src="/logo.svg" alt="ElectroPlay" className="w-8 h-auto" />
			</Link>

			<NavbarMenu />

			<div className="flex items-center gap-2">
				<Button variant={"secondary"} size={"icon"} className="hidden md:block">
					<a href={appSocials.twitter} target="_blank" rel="noreferrer" className="flex items-center justify-center w-full h-full">
						<FaXTwitter size={16} />
					</a>
				</Button>
				<Button variant={"secondary"} size={"icon"} className="hidden md:block">
					<a href={appSocials.telegram} target="_blank" rel="noreferrer" className="flex items-center justify-center w-full h-full">
						<FaTelegram size={20} />
					</a>
				</Button>

				<WalletConnectButton />
				<WalletModal />
			</div>
		</nav>
	)
}

export default Navbar;