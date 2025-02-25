import { FC } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Separator } from "../ui/separator"
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "../ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface ActivePoolsProps {

}

const ActivePools: FC<ActivePoolsProps> = () => {

	const pools = [
		{
			tokenSymbol: "ETN",
			tokenLogo: "https://s2.coinmarketcap.com/static/img/coins/64x64/2137.png",
			tokenAddress: "0x0000000000000000000000000000000000000000",
			contractAddress: "0x0000000000000000000000000000000000000000",
		},
		{
			tokenSymbol: "MEME",
			tokenLogo: "https://wary-raccoon-546.convex.cloud/api/storage/48404d7f-ec8b-4830-9293-cb3155cfc0ba",
			tokenAddress: "0x0000000000000000000000000000000000000000",
			contractAddress: "0x0000000000000000000000000000000000000000",
		},
	]

	return (
		<>
			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">

				{pools.map((pool) => (
					<Card key={pool.tokenSymbol}>
						<CardHeader className="p-2 flex-row items-center gap-2 space-y-0">
							<img src={pool.tokenLogo} alt={pool.tokenSymbol} className="shrink-0 w-8 h-8 rounded-full" />

							<div className="leading-[0.6] w-full">
								<h4 className="text-sm font-bold">{pool.tokenSymbol} Pool</h4>
								<span className="text-[0.75rem] text-neutral-500 truncate text-ellipsis">100 players</span>
							</div>
						</CardHeader>

						<Separator />

						<CardContent className="p-3">
							<div className="w-full flex items-center gap-6">
								<div className="flex-1">
									<div className="text-[0.6rem] text-neutral-500">Rewards reached</div>
									<div className="">
										<span className="text-xl font-semibold">100,000</span>
										<span className="text-xs uppercase"> ETN</span>
									</div>
								</div>
							</div>
						</CardContent>

						<CardFooter className="p-3 pt-0">
							<Dialog>
								<DialogTrigger asChild>
									<Button size={"sm"} className="w-full">Join - 4,000 ETN</Button>
								</DialogTrigger>

								<DialogContent className="max-sm:h-full max-sm:border-none">
									<DialogHeader>
										<VisuallyHidden>
											<DialogTitle />
											<DialogDescription />
										</VisuallyHidden>
									</DialogHeader>
								</DialogContent>
							</Dialog>
						</CardFooter>

					</Card>
				))}
			</div>
		</>
	)
}

export default ActivePools;