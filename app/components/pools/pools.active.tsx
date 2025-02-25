import { FC } from "react";
import PoolCard from "./pool.card";

interface ActivePoolsProps { }

export type Pool = {
	tokenSymbol: string,
	tokenLogo: string,
	tokenAddress: string,
	contractAddress: string,
}

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
		<>
			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">

				{pools.map((pool) => (
					<PoolCard key={pool.tokenSymbol} pool={pool} />
					// <Card key={pool.tokenSymbol}>
					// 	<CardHeader className="p-2 flex-row items-center gap-2 space-y-0">
					// 		<img src={pool.tokenLogo} alt={pool.tokenSymbol} className="shrink-0 w-8 h-8 rounded-full" />

					// 		<div className="leading-[0.6] w-full">
					// 			<h4 className="text-sm font-bold">{pool.tokenSymbol} Pool</h4>
					// 			<span className="text-[0.75rem] text-neutral-500 truncate text-ellipsis">100 players</span>
					// 		</div>
					// 	</CardHeader>

					// 	<Separator />

					// 	<CardContent className="p-3">
					// 		<div className="w-full flex items-center gap-6">
					// 			<div className="flex-1">
					// 				<div className="text-[0.6rem] text-neutral-500">Rewards reached</div>
					// 				<div className="">
					// 					<span className="text-xl font-semibold">100,000</span>
					// 					<span className="text-xs uppercase"> {pool.tokenSymbol}</span>
					// 				</div>
					// 			</div>
					// 		</div>
					// 	</CardContent>

					// 	<CardFooter className="p-3 pt-0">
					// 		<Dialog>
					// 			<DialogTrigger asChild>
					// 				<Button size={"sm"} className="w-full">Join - 4,000 {pool.tokenSymbol}</Button>
					// 			</DialogTrigger>
					// 			<DialogContent className="max-sm:h-full max-sm:border-none">
					// 				<DialogHeader>
					// 					<VisuallyHidden>
					// 						<DialogTitle />
					// 						<DialogDescription />
					// 					</VisuallyHidden>
					// 				</DialogHeader>
					// 				{pool.tokenSymbol}
					// 				<PoolModal pool={pool} />
					// 			</DialogContent>
					// 		</Dialog>
					// 	</CardFooter>

					// </Card>
				))}
			</div>
		</>
	)
}

export default ActivePools;