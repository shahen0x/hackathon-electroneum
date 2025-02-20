"use client";

import { FC, useEffect, useState } from "react";
import NavbarMenu from "./menu";
import Image from "next/image";
import Link from "next/link";
import WalletConnectButton from "@/thirdweb/wallet/connect-btn";
import WalletConnectedModal from "@/thirdweb/wallet/connect-modal";
import { FaTelegram, FaXTwitter } from "react-icons/fa6";
import { Button } from "@heroui/button";

interface NavbarProps { }

const Navbar: FC<NavbarProps> = () => {

	const [isScrolled, setIsScrolled] = useState(false);

	// Detect scroll position and set isScrolled state
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);


	return (
		<nav className={`fixed top-0 left-0 z-40 w-full py-4 sm:py-6 transition-all duration-300
			${isScrolled ? "shadow-2xl backdrop-blur-lg bg-neutral-950/60" : "shadow-none bg-transparent"}
		`}>
			<div className="container">
				<div className="relative flex items-center justify-between">

					<Link href={"/"} className="flex items-center gap-3">
						<Image
							src="/logo.svg"
							alt="logo"
							width={268}
							height={40}
							className="w-8 h-auto"
						/>
						<span className="hidden sm:block mt-2 font-start2p">ElectroPlay</span>
					</Link>

					{/* <NavbarMenu className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10" /> */}

					<div className="flex items-center gap-2">

						<Button as={Link} href="https://twitter.com" target="_blank" rel="noreferrer" isIconOnly color="default" variant="flat" size="sm">
							<FaXTwitter size={16} />
						</Button>
						<Button as={Link} href="https://twitter.com" target="_blank" rel="noreferrer" isIconOnly color="default" variant="flat" size="sm">
							<FaTelegram size={16} />
						</Button>

						<WalletConnectButton />
						<WalletConnectedModal />
					</div>

				</div>
			</div>
		</nav>
	)
}

export default Navbar;