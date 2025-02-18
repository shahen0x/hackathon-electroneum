"use client";

import { Button } from "@heroui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface BottomBarProps {

}

const BottomBar: FC<BottomBarProps> = () => {
	const router = useRouter();

	return (
		<div className="fixed bottom-0 left-0 w-full h-20 bg-primary-500">
			<Button onPress={() => router.push('/telegram')}>Back</Button>
			<Button onPress={() => router.push('/player/ballsort')}>Play</Button>
			{/* <Link href="/player/ballsort">Play</Link> */}
		</div>
	)
}

export default BottomBar;