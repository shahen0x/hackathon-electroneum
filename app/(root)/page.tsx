"use client";

import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader, Progress } from "@heroui/react";
import { Image } from "@heroui/image";
import NextImage from "next/image";
import Link from "next/link";
import { PiUsersFourThin } from "react-icons/pi";
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


			<div className="grid grid-cols-4 gap-6">
				<Card>
					<CardBody className="p-4">
						<div className="w-full flex items-center gap-6">
							<NextImage
								src={"/symbols/2137.png"}
								alt="ETN"
								width={64}
								height={64}
								className="shrink-0 rounded-full w-12 h-12"
							/>
							<div className="flex-1">
								<div className="text-xs">Prize Pool</div>
								<div className="">
									<span className="text-5xl">1000</span>
									<span className="font-semibold"> ETN</span>
								</div>
								<div className="text-xs font-light opacity-30">Increases as more players join</div>
							</div>
						</div>
					</CardBody>
				</Card>

				<Card>
					<CardBody className="p-4 justify-center">
						<div className="w-full flex items-center gap-6">
							<div className="p-2 border border-white/5 rounded-full w-12 h-12 flex items-center justify-center">
								<PiUsersFourThin size={48} />
							</div>
							<div className="flex-1">
								<div className="text-xs font-light opacity-30">Players Joined</div>
								<div className="font-light text-4xl">1000</div>
							</div>
						</div>
					</CardBody>
				</Card>

				<Card className="col-span-2">
					<CardBody className="p-4 justify-center">

						<Progress aria-label="Progress..." color="primary" size="sm" value={70} />
						{/* <div className="w-full flex items-center gap-6">
							<div className="p-2 border border-white/5 rounded-full w-12 h-12 flex items-center justify-center">
								<PiUsersFourThin size={48} />
							</div>
							<div className="flex-1">
								<div className="text-xs font-light opacity-30">Players Joined</div>
								<div className="font-light text-4xl">1000</div>
							</div>
						</div> */}
					</CardBody>
				</Card>
			</div>


			{/* <div>
				<Card>
					<CardHeader>
						<h3 className="w-full text-3xl text-center">Game Week 1</h3>
					</CardHeader>
				</Card>
			</div> */}

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
						<span>1000 ETN</span>
					</div>
					<div className="w-full items-center grid grid-cols-[0.5fr_1fr_1fr_1fr] gap-6 py-4 px-4 border border-neutral-800 rounded-2xl">
						<span>#2</span>
						<span>Shahen0x</span>
						<span>900</span>
						<span>800 ETN</span>
					</div>
					<div className="w-full items-center grid grid-cols-[0.5fr_1fr_1fr_1fr] gap-6 py-4 px-4 border border-neutral-800 rounded-2xl">
						<span>#3</span>
						<span>Shahen0x</span>
						<span>900</span>
						<span>600 ETN</span>
					</div>
					<div className="w-full items-center grid grid-cols-[0.5fr_1fr_1fr_1fr] gap-6 py-4 px-4 border border-neutral-800 rounded-2xl">
						<span>#4</span>
						<span>Shahen0x</span>
						<span>900</span>
						<span>400 ETN</span>
					</div>
				</CardBody>
			</Card>
		</div>
	);
}