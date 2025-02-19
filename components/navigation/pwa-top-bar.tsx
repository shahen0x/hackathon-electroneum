"use client";

import { Button } from "@heroui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { PiCoinsThin, PiHouseLineDuotone, PiHouseLineThin, PiRankingThin } from "react-icons/pi";

interface PWATopBarProps {

}

const PWATopBar: FC<PWATopBarProps> = () => {

	const pathname = usePathname();

	return (
		<div className="fixed z-40 top-0 left-0 w-full h-14 px-6 bg-red-900 border-b border-neutral-800 flex items-center justify-around">
			ttest
		</div>
	)
}

export default PWATopBar;