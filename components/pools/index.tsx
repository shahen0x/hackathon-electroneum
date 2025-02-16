"use client";

import { FC } from "react";
import NextImage from "next/image";

import { Button, Card, CardBody, CardHeader, Divider } from "@heroui/react";
import { Preloaded, useConvex, usePreloadedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "@tanstack/react-query";
import { fetchQuery } from "convex/nextjs";

interface ActivePoolsProps {
	preloadedCycle: Preloaded<typeof api.cycles.getActiveCycleWithPools>;
}

const ActivePools: FC<ActivePoolsProps> = ({ preloadedCycle }) => {

	const cycle = usePreloadedQuery(preloadedCycle);


	return (
		<>
			<div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
				{cycle?.pools.map((pool) => (
					<Card
						key={pool.tokenSymbol}
						classNames={{
							base: "border-success-300 border",
						}}
					>
						<CardHeader className="gap-2">
							{pool.tokenLogo &&
								<NextImage
									src={pool.tokenLogo}
									alt="ETN"
									width={64}
									height={64}
									className="shrink-0 rounded-full w-8 h-8"
								/>
							}
							<div className="leading-[0.6] w-full">
								<h4 className="text-sm font-bold">{pool.tokenSymbol} Pool</h4>
								<span className="text-[0.75rem] text-neutral-500 truncate text-ellipsis">100 participants</span>
							</div>
						</CardHeader>
						<Divider />
						<CardBody className="space-y-2">
							<div className="w-full flex items-center gap-6">
								<div className="flex-1">
									<div className="text-[0.6rem] text-neutral-500">Rewards reached</div>
									<div className="">
										<span className="text-xl font-semibold">400,000</span>
										<span className="text-xs uppercase"> ETN</span>
									</div>
								</div>
							</div>
							<Button variant="flat" size="sm" color="success" fullWidth>Join - 4,000 ETN</Button>
						</CardBody>
					</Card>
				))}

				{/* <Card classNames={{
					base: "border-success-300 border",
				}}>
					<CardHeader className="gap-2">
						<NextImage
							src={"/symbols/2137.png"}
							alt="ETN"
							width={64}
							height={64}
							className="shrink-0 rounded-full w-8 h-8"
						/>
						<div className="leading-[0.6] w-full">
							<h4 className="text-sm font-bold">ETN Pool</h4>
							<span className="text-[0.75rem] text-neutral-500 truncate text-ellipsis">100 participants</span>
						</div>
					</CardHeader>
					<Divider />
					<CardBody className="space-y-2">
						<div className="w-full flex items-center gap-6">
							<div className="flex-1">
								<div className="text-[0.6rem] text-neutral-500">Rewards reached</div>
								<div className="">
									<span className="text-xl font-semibold">400,000</span>
									<span className="text-xs uppercase"> ETN</span>
								</div>
							</div>
						</div>
						<Button variant="flat" size="sm" color="success" fullWidth>Join - 4,000 ETN</Button>
					</CardBody>
				</Card>

				<Card classNames={{
					base: "border-success-300 border",
				}}>
					<CardHeader className="gap-2">
						<NextImage
							src={"/symbols/30126.png"}
							alt="ETN"
							width={64}
							height={64}
							className="shrink-0 rounded-full w-8 h-8"
						/>
						<div className="leading-[0.6] w-full">
							<h4 className="text-sm font-bold">MEME Pool</h4>
							<span className="text-[0.75rem] text-neutral-500 truncate text-ellipsis">30 participants</span>
						</div>
					</CardHeader>
					<Divider />
					<CardBody className="space-y-2">
						<div className="flex items-center gap-6">
							<div className="flex-1">
								<div className="text-[0.6rem] text-neutral-500">Rewards reached</div>
								<div className="">
									<span className="text-xl">3M</span>
									<span className="text-xs uppercase"> MEME</span>
								</div>
							</div>
						</div>
						<Button variant="flat" size="sm" fullWidth isDisabled>Already Joined</Button>
					</CardBody>
				</Card> */}
			</div>
		</>
	)
}

export default ActivePools;