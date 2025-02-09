"use client";

import { FC } from "react";
import NavbarMenu from "./menu";
import Image from "next/image";
import Link from "next/link";
import WalletConnectButton from "@/thirdweb/wallet/connect-btn";
import WalletConnectedModal from "@/thirdweb/wallet/connect-modal";
import { FaTelegram, FaXTwitter } from "react-icons/fa6";
import { Button } from "@heroui/button";

interface NavbarProps { }

const Navbar: FC<NavbarProps> = () => {
	return (
		<nav className="fixed top-0 left-0 z-40 w-full py-6">
			<div className="container">
				<div className="relative flex items-center justify-between">

					<Link href={"/"} className="w-52">
						<Image
							src="/logo2.svg"
							alt="logo"
							width={268}
							height={40}
							className="w-auto h-auto"
						/>
					</Link>

					<NavbarMenu className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10" />

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