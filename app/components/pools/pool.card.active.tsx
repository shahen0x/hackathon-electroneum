/**
 * ACTIVE POOL CARD
 * This component displays the active pool information as well
 * as fetches on chain data
 * 
 */
import { FC } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
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
import { ActivePool, CyclePhase } from "~/types/types.cycle";
import { Button } from "../ui/button";
import { Id } from "~/convex/_generated/dataModel";
import useCyclePhase from "~/hooks/hook.cycle.phase";

interface PoolCardActiveProps {
	activePool: ActivePool;
}

export type PoolType = {
	poolId: Id<"pools">;
	isNative: boolean;
	tokenSymbol: string | undefined;
	brandColor: string | undefined;
	tokenLogo: string | undefined;
	contractAddress: string;
	tokenAddress: string | undefined;
	participants: number;
	poolPrice: number;
	prizePool: bigint;
} | undefined

const PoolCardActive: FC<PoolCardActiveProps> = ({ activePool }) => {

	// Store
	const { currentPhase } = useCyclePhase();

	// Thirdweb
	const account = useActiveAccount();

	// If the pool token is ETN
	const isNative = activePool.tokenSymbol === "ETN";


	// Initiate smart contract
	//
	const contract = getContract({
		client: clientThirdweb,
		chain,
		address: activePool.contractAddress,
		abi: isNative ? abiPoolNative : abiPoolERC20
	});


	// Retrieve data from smart contract
	//
	const retrieveOnchainData = async () => {
		console.log("🔃 Fetching on-chain data...");

		const [participants, poolPrice, prizePool] = await Promise.all([
			readContract({ contract, method: "getUniqueParticipants" }),
			readContract({ contract, method: "getPoolPrice" }),
			readContract({ contract, method: "getPrizePool" }),
		]);

		return {
			poolId: activePool.id,
			isNative: isNative,
			tokenSymbol: activePool.tokenSymbol,
			brandColor: activePool.brandColor,
			tokenLogo: activePool.tokenLogo,
			contractAddress: activePool.contractAddress,
			tokenAddress: activePool.tokenAddress,
			participants,
			poolPrice: Number(toEther(poolPrice)),
			prizePool,
		}
	}


	// Check if user already joined the pool
	//
	const retriveUserJoinedPool = async () => {
		if (!account) throw new Error("Wallet not connected.");

		const userRecorded = await readContract({
			contract,
			method: "getUserRecorded",
			params: [account.address]
		});

		return userRecorded;
	}


	// Fetch pool data
	//
	const { data: pool, isLoading: poolIsLoading, refetch: refetchPool, } = useQuery({
		queryKey: [`pool-${activePool.contractAddress}`],
		queryFn: retrieveOnchainData
	});


	// Fetch user joined pool data
	//
	const { data: userJoinedPool, refetch: refetchJoinedPool } = useQuery({
		queryKey: [`pool-${activePool.contractAddress}-${account?.address}`],
		queryFn: retriveUserJoinedPool,
		enabled: !!account,
	});


	return (
		<Card className="flex flex-col">
			<CardHeader className="sm:p-3 sm:pr-2 flex-row items-center gap-2 space-y-0">
				<img src={activePool.tokenLogo} alt={activePool.tokenSymbol} className="shrink-0 w-8 h-8 rounded-full" />

				<div className="leading-[0.6] w-full">
					<h4 className="text-sm font-bold">{activePool.tokenSymbol} Pool</h4>
					{poolIsLoading && <Skeleton className="w-[50px] h-[10px] rounded-full" />}
					{!poolIsLoading && <span className="text-[0.75rem] text-muted-foreground">{pool?.participants} {pool?.participants === 1 ? "player" : "players"}</span>}
				</div>
			</CardHeader>

			<Separator />

			<CardContent className="my-auto p-3">
				<div className="w-full flex items-center gap-6">
					<div className="flex-1">
						<div className="text-[0.6rem] text-neutral-500">Rewards reached</div>
						<div className="flex items-center gap-2">
							{poolIsLoading && <Skeleton className="w-[60px] h-[20px] my-[4px] rounded-md" />}
							{!poolIsLoading && pool &&
								<span className="text-xl font-semibold">{formatEth(toEther(pool.prizePool))}</span>
							}
							<span className="text-xs uppercase"> {activePool.tokenSymbol}</span>
						</div>
					</div>
				</div>
			</CardContent>

			<CardFooter className="p-3 pt-0 flex-col">
				{poolIsLoading && <Skeleton className="w-full h-[32px] rounded-md" />}
				{!poolIsLoading && currentPhase === CyclePhase.CycleNotStarted && <Button size={"sm"} className="w-full" disabled={true}>Opening Soon</Button>}
				{!poolIsLoading &&
					(currentPhase === CyclePhase.CycleStarted || currentPhase === CyclePhase.PlaytimeStarted) &&
					<PoolModal data={pool} userJoinedPool={userJoinedPool} refetchData={refetchPool} refetchJoinedPool={refetchJoinedPool} />
				}
				{!poolIsLoading &&
					(currentPhase === CyclePhase.PlaytimeEnded || currentPhase === CyclePhase.CycleEnded) &&
					<Button size={"sm"} className="w-full" disabled={true}>Pool Closed</Button>
				}
			</CardFooter>

		</Card>
	)
}

export default PoolCardActive;