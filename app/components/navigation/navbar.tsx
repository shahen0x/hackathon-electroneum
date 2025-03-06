/**
 * MAIN NAVIGATION BAR
 * 
 */
import { useEffect, useState } from "react";
import { Link, useLocation } from "@remix-run/react";
import { appSocials } from "~/config/app";
import { FaTelegram, FaXTwitter } from "react-icons/fa6";
import WalletConnectButton from "~/thirdweb/wallet/wallet.connect";
import WalletModal from "~/thirdweb/wallet/wallet.modal";
import { Button } from "../ui/button";
import NavbarMenuLeft from "./navbar.menu.left";
import NavbarMenuMobile from "./navbar.menu.mobile";


const Navbar = () => {

	// Hooks
	const location = useLocation();

	// States
	const [isScrolled, setIsScrolled] = useState(false);


	// Detect scroll position and set isScrolled state
	//
	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 2);
		handleScroll();
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);


	// Hide the navbar on the game pages
	//
	const isPlayRoute = location.pathname.startsWith("/play/") && location.pathname !== "/play/";
	if (isPlayRoute) return null;


	return (
		<nav className={`
			fixed top-0 left-0 z-40 w-full h-16 px-2 py-2 flex items-center justify-between transition-all duration-300 border-b border-neutral-800
			${isScrolled ? "shadow-2xl backdrop-blur-md bg-neutral-950/30" : "shadow-none bg-transparent"}
		`}>
			{/* LOGO */}
			<Link to={"/"} className="absolute left-1/2 -translate-x-1/2">
				<img src="https://cdn.electroplay.fun/logo.svg" alt="ElectroPlay" className="w-8 h-auto" />
			</Link>

			{/* MENUS */}
			<NavbarMenuMobile />
			<NavbarMenuLeft />

			{/* RIGHT NAV ITEMS */}
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

				{/* WALLET */}
				<WalletConnectButton />
				<WalletModal />
			</div>
		</nav>
	)
}

export default Navbar;