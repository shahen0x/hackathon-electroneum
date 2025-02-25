import { FC } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
// import { Button } from "../ui/button";
// import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Pool } from "./pools.active";
import { defineChain, getContract, readContract, toEther } from "thirdweb";
import { clientThirdweb } from "~/thirdweb/client";
import { abiPoolNative } from "~/thirdweb/abi/abi.pool.native";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";
import { abiPoolERC20 } from "~/thirdweb/abi/abi.pool.erc20";
import PoolJoin from "./pool.join";

interface PoolCardProps {
	pool: Pool;
}

const PoolCard: FC<PoolCardProps> = ({ pool }) => {

	// If the pool token is ETN
	const isNative = pool.tokenSymbol === "ETN";

	// Initiate smart contract
	const contract = getContract({
		client: clientThirdweb,
		chain: defineChain(43113),
		address: pool.contractAddress,
		abi: isNative ? abiPoolNative : abiPoolERC20
	});

	// Retrieve data from smart contract
	const retrieveOnchainData = async () => {
		const [participants, poolPrice, commissionPercentage, userRecorded] = await Promise.all([
			readContract({ contract, method: "getUniqueParticipants" }),
			readContract({ contract, method: "getPoolPrice" }),
			readContract({ contract, method: "getCommissionPercentage" }),
			readContract({ contract, method: "getUserRecorded", params: ["0x37E5831239785039Ce8A76AfF44AD0E53AA25c8C"] }),
		]);

		return {
			participants,
			poolPrice: Number(toEther(poolPrice)),
			commissionPercentage,
			userRecorded
		}
	}

	// Retrieve on-chain data
	const { data: onchain, isLoading } = useQuery({
		queryKey: [`pool-${pool.tokenSymbol}`],
		queryFn: retrieveOnchainData
	});

	// console.log("user joined: ", onchain?.userRecorded)

	return (
		<Card>
			<CardHeader className="p-2 flex-row items-center gap-2 space-y-0">
				<img src={pool.tokenLogo} alt={pool.tokenSymbol} className="shrink-0 w-8 h-8 rounded-full" />

				<div className="leading-[0.6] w-full">
					<h4 className="text-sm font-bold">{pool.tokenSymbol} Pool</h4>
					{isLoading && <Skeleton className="w-[50px] h-[10px] rounded-full" />}
					{!isLoading && <span className="text-[0.75rem] text-muted-foreground">{onchain?.participants} players</span>}
				</div>
			</CardHeader>

			<Separator />

			<CardContent className="p-3">
				<div className="w-full flex items-center gap-6">
					<div className="flex-1">
						<div className="text-[0.6rem] text-neutral-500">Rewards reached</div>
						<div className="flex items-center gap-2">
							{isLoading && <Skeleton className="w-[60px] h-[20px] my-[4px] rounded-md" />}
							{!isLoading && onchain &&
								<span className="text-xl font-semibold">{onchain.participants * onchain.poolPrice * (1 - onchain.commissionPercentage / 100)}</span>
							}
							<span className="text-xs uppercase"> {pool.tokenSymbol}</span>
						</div>
					</div>
				</div>
			</CardContent>

			<CardFooter className="p-3 pt-0 flex-col">
				{isLoading && <Skeleton className="w-full h-[32px] rounded-md" />}
				{!isLoading && <PoolJoin pool={pool} onchain={onchain} isNative={isNative} />}
			</CardFooter>

		</Card>
	)
}

export default PoolCard;