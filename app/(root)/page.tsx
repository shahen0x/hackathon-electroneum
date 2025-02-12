"use client";

import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader, Progress } from "@heroui/react";
import { Image } from "@heroui/image";
import NextImage from "next/image";
import Link from "next/link";
import { PiUsersFourThin } from "react-icons/pi";
import ListGames from "@/components/list-games";
export default function Home() {
	return (
		<div className="container space-y-6">

			<div className="bg-primary/10 rounded-2xl p-6 lg:p-10 lg:flex items-center gap-12 lg:gap-24 bg-[url(/home-banner-mobile.png)] bg-no-repeat bg-right bg-contain xl:bg-[url(/banner.png)]">
				<h1 className="mb-6 lg:mb-0 text-2xl sm:text-3xl font-bold font-start2p text-etn">Compete,<br />Climb,<br />Conquer</h1>
				<div className="max-w-72 sm:max-w-lg md:max-w-xl lg:max-w-2xl">
					<h2 className="mb-2 sm:mb-1 text-[0.59rem] sm:text-lg font-semibold font-start2p">Weekly Token Rewards Await!</h2>
					<p className="text-sm text-neutral-400">Join token pools and compete in exciting games to climb the leaderboards with 30% of the top participants winning weekly rewards, your chances of earning are high!</p>
				</div>
				{/* <Image src="/banner.png" alt="lightning" width={208} height={300} /> */}
			</div>

			<div className="space-y-4">
				{/* <h2 className="font-start2p text-xl uppercase">Play Games</h2> */}
				<ListGames />
			</div>

			<div className="">
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
									<span className="text-4xl">125,563</span>
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