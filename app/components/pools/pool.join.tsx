import { FC } from "react";
import { Button } from "../ui/button";
import { Pool } from "./pools.active";

import { getContract, prepareContractCall, sendTransaction, toWei } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { clientThirdweb } from "~/thirdweb/client";
import { abiPoolNative } from "~/thirdweb/abi/abi.pool.native";
import { useActiveAccount } from "thirdweb/react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface PoolJoinProps {
	pool: Pool;
	onchain: {
		participants: number;
		poolPrice: number;
		commissionPercentage: number;
		userRecorded: boolean;
	} | undefined
}

const PoolJoin: FC<PoolJoinProps> = ({ pool, onchain }) => {

	const account = useActiveAccount();

	const handlePrepareContractCall = async () => {
		try {
			if (!account) throw new Error("No account found");

			const contract = getContract({
				client: clientThirdweb,
				chain: defineChain(43113),
				address: pool.contractAddress,
				abi: abiPoolNative
			});

			const transaction = await prepareContractCall({
				contract,
				method: "joinPool",
				value: toWei("0.1"),
			});

			const { transactionHash } = await sendTransaction({
				transaction,
				account: account,
			});

			return transactionHash;
		} catch (error) {
			console.log(error);
		}
	}



	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size={"sm"} className="w-full">Join - {onchain?.poolPrice} {pool.tokenSymbol}</Button>
			</DialogTrigger>
			<DialogContent className="max-sm:h-full max-sm:border-none">
				<DialogHeader>
					<VisuallyHidden>
						<DialogTitle />
						<DialogDescription />
					</VisuallyHidden>
				</DialogHeader>
				{pool.tokenSymbol}
				<Button onClick={handlePrepareContractCall}>Join Tournament</Button>
			</DialogContent>
		</Dialog>
	)
}

export default PoolJoin;