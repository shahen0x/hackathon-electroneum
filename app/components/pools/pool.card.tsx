import { FC } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import { Pool } from "./pools.active";
import { getContract, readContract, toEther } from "thirdweb";
import { clientThirdweb } from "~/thirdweb/client";
import { abiPoolNative } from "~/thirdweb/abi/abi.pool.native";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";
import { abiPoolERC20 } from "~/thirdweb/abi/abi.pool.erc20";
import { formatEth } from "~/lib/format.eth";
import PoolModal from "./pool.modal";
import { chain } from "~/config/chain";
import { useActiveAccount } from "thirdweb/react";

interface PoolCardProps {
	pool: Pool;
}

const PoolCard: FC<PoolCardProps> = ({ pool }) => {

	// Thirdweb
	const account = useActiveAccount();

	// If the pool token is ETN
	const isNative = pool.tokenSymbol === "ETN";

	// Initiate smart contract
	const contract = getContract({
		client: clientThirdweb,
		chain,
		address: pool.contractAddress,
		abi: isNative ? abiPoolNative : abiPoolERC20
	});

	// Retrieve data from smart contract
	const retrieveOnchainData = async () => {
		console.log("Refetching on-chain data...");
		const [participants, poolPrice, commissionPercentage] = await Promise.all([
			readContract({ contract, method: "getUniqueParticipants" }),
			readContract({ contract, method: "getPoolPrice" }),
			readContract({ contract, method: "getCommissionPercentage" }),
		]);

		return {
			isNative: isNative,
			tokenSymbol: pool.tokenSymbol,
			tokenLogo: pool.tokenLogo,
			contractAddress: pool.contractAddress,
			tokenAddress: pool.tokenAddress,
			participants,
			poolPrice: Number(toEther(poolPrice)),
			commissionPercentage
		}
	}

	const retriveUserJoinedPool = async () => {
		if (!account) throw new Error("Wallet not connected.");

		const userRecorded = await readContract({
			contract,
			method: "getUserRecorded",
			params: [account.address]
		});

		return userRecorded;
	}

	const { data, isLoading, refetch: refetchData, } = useQuery({
		queryKey: [`pool-${pool.tokenSymbol}`],
		queryFn: retrieveOnchainData
	});

	const { data: userJoinedPool, refetch: refetchJoinedPool } = useQuery({
		queryKey: [`pool-${pool.tokenSymbol}-${account?.address}`],
		queryFn: retriveUserJoinedPool,
		enabled: !!account,
	});


	return (
		<Card>
			<CardHeader className="p-2 flex-row items-center gap-2 space-y-0">
				<img src={pool.tokenLogo} alt={pool.tokenSymbol} className="shrink-0 w-8 h-8 rounded-full" />

				<div className="leading-[0.6] w-full">
					<h4 className="text-sm font-bold">{pool.tokenSymbol} Pool</h4>
					{isLoading && <Skeleton className="w-[50px] h-[10px] rounded-full" />}
					{!isLoading && <span className="text-[0.75rem] text-muted-foreground">{data?.participants} {data?.participants === 1 ? "player" : "players"}</span>}
				</div>
			</CardHeader>

			<Separator />

			<CardContent className="p-3">
				<div className="w-full flex items-center gap-6">
					<div className="flex-1">
						<div className="text-[0.6rem] text-neutral-500">Rewards reached</div>
						<div className="flex items-center gap-2">
							{isLoading && <Skeleton className="w-[60px] h-[20px] my-[4px] rounded-md" />}
							{!isLoading && data &&
								<span className="text-xl font-semibold">{formatEth(data.participants * data.poolPrice * (1 - data.commissionPercentage / 100))}</span>
							}
							<span className="text-xs uppercase"> {pool.tokenSymbol}</span>
						</div>
					</div>
				</div>
			</CardContent>

			<CardFooter className="p-3 pt-0 flex-col">
				{isLoading && <Skeleton className="w-full h-[32px] rounded-md" />}
				{!isLoading && <PoolModal data={data} userJoinedPool={userJoinedPool} refetchData={refetchData} refetchJoinedPool={refetchJoinedPool} />}
			</CardFooter>

		</Card>
	)
}

export default PoolCard;