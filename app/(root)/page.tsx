"use client";

import { Button } from "@heroui/button";
import { Card } from "@heroui/react";

export default function Home() {
	return (
		<div className="container">
			{/* <div
				className="absolute inset-0 h-full w-full bg-[#121214] bg-[radial-gradient(#1a1a1c_1px,transparent_1px)] [background-size:16px_16px]"
			></div> */}
			{/* <div
				className="absolute inset-0 h-full w-full bg-[#121214] bg-[radial-gradient(#1a1a1c_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"
			></div> */}
			<div className="grid grid-cols-4 gap-4">
				<Card className="min-h-40">Test</Card>
				<Card className="min-h-40">Test</Card>
				<Card className="min-h-40">Test</Card>
				<Card className="min-h-40">Test</Card>
			</div>
		</div>
	);
}