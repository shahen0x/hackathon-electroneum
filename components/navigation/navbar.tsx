"use client";

import { FC } from "react";
import NavbarMenu from "./menu";
import Image from "next/image";
import Link from "next/link";
import { ConnectButton } from "thirdweb/react";
import { thirdwebClient } from "@/thirdweb/client";
import { avalancheFuji, defineChain } from "thirdweb/chains";
import WalletConnectButton from "@/thirdweb/wallet/connect-btn";
import WalletConnectedModal from "@/thirdweb/wallet/connect-modal";

interface NavbarProps {

}

const Navbar: FC<NavbarProps> = () => {
	return (
		<nav className="fixed top-0 left-0 z-40 w-full py-6">
			<div className="container">
				<div className="flex items-center justify-between">

					<Link href={"/game"} className="w-12 border border-neutral-700 rounded-full p-2">
						<Image
							src="/logo.png"
							alt="logo"
							width={100}
							height={100}
							className="w-auto h-auto"
						/>
					</Link>

					<NavbarMenu />

					<div>
						<WalletConnectButton />
						<WalletConnectedModal />
						{/* <ConnectButton
							client={thirdwebClient}
							chain={defineChain({
								id: 52014,
								rpc: "https://rpc.ankr.com/electroneum",
								nativeCurrency: {
									name: "Electroneum",
									symbol: "ETN",
									decimals: 18,
								}
							})}
						/> */}
					</div>

				</div>
			</div>
		</nav>
	)
}

export default Navbar;