"use client";

import { Button } from "@heroui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { PiCoinsLight, PiHouseLineDuotone, PiHouseLineLight, PiRankingLight, PiWalletLight } from "react-icons/pi";

interface PWABottomBarProps {

}

const PWABottomBar: FC<PWABottomBarProps> = () => {

	const pathname = usePathname();

	return (
		<div className="fixed z-40 bottom-0 left-0 w-full h-[5.5rem] pb-5 px-6 bg-neutral-900 border-t border-neutral-800 flex items-center justify-around">
			<Link href={"/pwa"} className={`p-4 flex flex-col items-center ${pathname === "/pwa" ? "text-etn" : "text-neutral-400"}`}>
				<PiHouseLineLight size={24} />
				<span className="text-[0.6rem]">Home</span>
			</Link>
			<Link href={"/pwa/pools"} className={`p-4 flex flex-col items-center ${pathname === "/pwa/pools" ? "text-etn" : "text-neutral-400"}`}>
				<PiCoinsLight size={24} />
				<span className="text-[0.6rem]">Pools</span>
			</Link>
			<Link href={"/pwa/ranking"} className={`p-4 flex flex-col items-center ${pathname === "/pwa/ranking" ? "text-etn" : "text-neutral-400"}`}>
				<PiRankingLight size={24} />
				<span className="text-[0.6rem]">Ranking</span>
			</Link>
			<Link href={"/pwa/ranking"} className={`p-4 flex flex-col items-center ${pathname === "/pwa/ranking" ? "text-etn" : "text-neutral-400"}`}>
				<PiWalletLight size={24} />
				<span className="text-[0.6rem]">Wallet</span>
			</Link>
		</div>
	)
}

export default PWABottomBar;