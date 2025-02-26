import { FC } from "react";
import PoolCard from "./pool.card";

interface ActivePoolsProps { }

export type Pool = {
	tokenSymbol: string,
	tokenLogo: string,
	tokenAddress: string,
	contractAddress: string,
}

export type PoolType = {
	isNative: boolean;
	tokenSymbol: string;
	tokenLogo: string;
	contractAddress: string;
	tokenAddress: string;
	participants: number;
	poolPrice: number;
	commissionPercentage: number;
} | undefined;

const ActivePools: FC<ActivePoolsProps> = () => {

	const pools: Pool[] = [
		{
			tokenSymbol: "ETN",
			tokenLogo: "https://s2.coinmarketcap.com/static/img/coins/64x64/2137.png",
			tokenAddress: "0x0000000000000000000000000000000000000000",
			contractAddress: "0x7d78D8884391D5a19c711A1e681006eFAd4c389e",
		},
		{
			tokenSymbol: "MEME",
			tokenLogo: "https://wary-raccoon-546.convex.cloud/api/storage/48404d7f-ec8b-4830-9293-cb3155cfc0ba",
			tokenAddress: "0xdbE388e37794646461b1c3560838a1453001d1ef",
			contractAddress: "0x56c6f06Db97EE405FFab59e843De7FeA7eDF55A8",
		},
	]

	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
			{pools.map((pool) => (
				<PoolCard key={pool.tokenSymbol} pool={pool} />
			))}
		</div>
	)
}

export default ActivePools;