"use client";

import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { Image } from "@heroui/image";
import NextImage from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<div className="container space-y-8">
			<div className="grid grid-cols-4 gap-6">

				<Link href={"/game"}>
					<Image
						as={NextImage}
						isBlurred
						src={`/poster-blitzer.jpg`}
						alt="Blitzer"
						width={680}
						height={200}
						className="h-auto transition-all border-2 border-transparent hover:border-violet-500"
					/>
				</Link>
				<Link href={"/game"}>
					<Image
						as={NextImage}
						isBlurred
						src={`/poster-ballsort.jpg`}
						alt="Blitzer"
						width={680}
						height={200}
						className="h-auto transition-all border-2 border-transparent hover:border-violet-500"
					/>
				</Link>
				<Link href={"/game"}>
					<Image
						as={NextImage}
						isBlurred
						src={`/poster-spacefarer.jpg`}
						alt="Blitzer"
						width={680}
						height={200}
						className="h-auto transition-all border-2 border-transparent hover:border-violet-500"
					/>
				</Link>
				<Link href={"/game"}>
					<Image
						as={NextImage}
						isBlurred
						src={`/poster-matchtwo.jpg`}
						alt="Blitzer"
						width={680}
						height={200}
						className="h-auto transition-all border-2 border-transparent hover:border-violet-500"
					/>
				</Link>
			</div>


			<div>
				<Card>
					<CardHeader>
						<h3 className="w-full text-3xl text-center">Game Week 1</h3>
					</CardHeader>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<div className="w-full grid grid-cols-[0.5fr_1fr_1fr_1fr] gap-6 pt-2 px-4 text-highlight text-neutral-600 font-semibold">
						<span>Rank</span>
						<span>Player</span>
						<span>Points</span>
						<span>Reward</span>
					</div>
				</CardHeader>

				<CardBody className="space-y-2">
					<div className="w-full items-center grid grid-cols-[0.5fr_1fr_1fr_1fr] gap-6 py-4 px-4 border border-neutral-800 rounded-2xl">
						<span>#1</span>
						<span>Shahen0x</span>
						<span>900</span>
						<span>-</span>
					</div>
					<div className="w-full items-center grid grid-cols-[0.5fr_1fr_1fr_1fr] gap-6 py-4 px-4 border border-neutral-800 rounded-2xl">
						<span>#2</span>
						<span>Shahen0x</span>
						<span>900</span>
						<span>-</span>
					</div>
					<div className="w-full items-center grid grid-cols-[0.5fr_1fr_1fr_1fr] gap-6 py-4 px-4 border border-neutral-800 rounded-2xl">
						<span>#3</span>
						<span>Shahen0x</span>
						<span>900</span>
						<span>-</span>
					</div>
					<div className="w-full items-center grid grid-cols-[0.5fr_1fr_1fr_1fr] gap-6 py-4 px-4 border border-neutral-800 rounded-2xl">
						<span>#4</span>
						<span>Shahen0x</span>
						<span>900</span>
						<span>-</span>
					</div>
				</CardBody>
			</Card>
		</div>
	);
}