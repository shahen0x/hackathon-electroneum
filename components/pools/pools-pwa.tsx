"use client";

import { FC } from "react";
import Image from "next/image";

import { Button, Card, CardBody, CardHeader, Divider } from "@heroui/react";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useQuery } from "@tanstack/react-query";

interface PoolsPwaProps {
}

const PoolsPwa: FC<PoolsPwaProps> = () => {

	const convex = useConvex();

	const fetchPools = async () => {
		return await convex.query(api.pools.getActivePools);
	}

	const { data, isPending, error, isLoading } = useQuery({
		queryKey: [`pool`],
		queryFn: fetchPools,
		staleTime: 5 * 60 * 1000, // 5 minutes of freshness
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
	});




	return data ? (
		<>
			<div className="">
				{data.map((pool) => (
					<Card key={pool.tokenSymbol}>
						<CardHeader className="gap-2">
							{pool.tokenLogo &&
								<Image
									src={pool.tokenLogo}
									alt="ETN"
									width={64}
									height={64}
									priority
									quality={100}
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
			</div >
		</>
	) : null;
}

export default PoolsPwa;