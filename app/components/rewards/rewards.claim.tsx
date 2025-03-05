import { FC, useState } from "react";
import { Button } from "../ui/button";
import { Id } from "~/convex/_generated/dataModel";
import { getContract, prepareContractCall, readContract, sendTransaction, toWei, waitForReceipt } from "thirdweb";
import { clientThirdweb } from "~/thirdweb/client";
import { chain } from "~/config/chain";
import { abiPoolNative } from "~/thirdweb/abi/abi.pool.native";
import { abiPoolERC20 } from "~/thirdweb/abi/abi.pool.erc20";
import { useActiveAccount, useSendTransaction } from "thirdweb/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PiCircleNotch } from "react-icons/pi";
import { useAction } from "convex/react";
import { api } from "~/convex/_generated/api";
import toast from "react-hot-toast";

interface RewardsClaimProps {
	pool: {
		poolPrice: number;
		tokenLogo: string;
		tokenSymbol: string;
		amount: number;
		poolId: Id<"pools">;
		contractAddress: string;
	}
}

const RewardsClaim: FC<RewardsClaimProps> = ({ pool }) => {

	// States
	const [isClaiming, setIsClaiming] = useState(false);

	// Thirdweb
	const wallet = useActiveAccount();
	// const { mutate: sendTransaction } = useSendTransaction();

	// Convex
	const claimReward = useAction(api.claims.getRewardClaim);

	const isNative = pool.tokenSymbol === "ETN";

	const contract = getContract({
		client: clientThirdweb,
		chain,
		address: pool.contractAddress,
		abi: isNative ? abiPoolNative : abiPoolERC20
	});

	const retrieveUserClaimed = async () => {
		if (!wallet) throw new Error("Wallet not connected.");
		return await readContract({ contract, method: "getUserPrizeClaim", params: [wallet.address] });
	}

	const { data: hasClaimed, isLoading: isLoadingHasClaimed, refetch: refetchHasClaimed } = useQuery({
		queryKey: [`claimed-pool-${pool.contractAddress}-${wallet?.address}`],
		queryFn: retrieveUserClaimed,
		enabled: !!wallet,
	})


	const handleClaimReward = async () => {
		if (!wallet) throw new Error("Wallet not connected.");

		const claim = await claimReward({
			amount: pool.amount,
			poolId: pool.poolId,
		})

		console.log(claim)

		// const formattedClaim = claim.map((c) => `0x${c.replace(/^0x/, "")}`) as `0x${string}`[];

		const transaction = await prepareContractCall({
			contract,
			method: "claimPrize",
			params: [claim as `0x${string}`[], BigInt(pool.amount.toString())],
		});

		const hash = await sendTransaction({
			transaction,
			account: wallet
		});

		return await waitForReceipt({
			client: clientThirdweb,
			chain,
			transactionHash: hash.transactionHash
		});

	}

	const { mutate: joinPoolNative } = useMutation({
		mutationFn: handleClaimReward,
		onMutate() {
			setIsClaiming(true)
		},
		onError(error) {
			setIsClaiming(false);
			console.log(error);
			toast.error("An error occured.")
			// setProcessing(false);
			// handleOnChainError(error);
		},
		onSuccess() {
			refetchHasClaimed();
			setIsClaiming(false);
			toast.success("Successfully claimed!");
		},
	});


	return (
		<Button
			size={"sm"}
			className="w-full"
			disabled={isLoadingHasClaimed || isClaiming || hasClaimed}
			onClick={() => joinPoolNative()}
		>
			{(isLoadingHasClaimed || isClaiming) && <PiCircleNotch size={16} className="animate-spin" />}

			{!isClaiming &&
				!isLoadingHasClaimed && (hasClaimed ? "Claimed" : "Claim")
			}
		</Button>
	)
}

export default RewardsClaim;