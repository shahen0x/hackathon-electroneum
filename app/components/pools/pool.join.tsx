import { FC, useState } from "react";
import { Button } from "../ui/button";
import { Pool } from "./pools.active";

import { getContract, prepareContractCall, sendTransaction, toWei } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { clientThirdweb } from "~/thirdweb/client";
import { abiPoolNative } from "~/thirdweb/abi/abi.pool.native";
import { useActiveAccount, useWalletBalance } from "thirdweb/react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Separator } from "../ui/separator";

interface PoolJoinProps {
	pool: Pool;
	onchain: {
		participants: number;
		poolPrice: number;
		commissionPercentage: number;
		userRecorded: boolean;
	} | undefined;
	isNative: boolean;
}

const PoolJoin: FC<PoolJoinProps> = ({ pool, onchain, isNative }) => {

	// Hooks
	const account = useActiveAccount();

	// States
	const [open, setOpen] = useState(false);

	const handleTrigger = async () => {
		setOpen(true);
		// await handlePrepareContractCall();
	}

	const { data: balance } = useWalletBalance({
		chain: defineChain(43113),
		address: account?.address,
		client: clientThirdweb,
		tokenAddress: isNative ? undefined : pool.tokenAddress,
	});

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


	const formatBalance = (value?: string | number, symbol?: string) => {
		if (value === undefined || value === null) return "--";

		const num = Number(value);
		return `${num.toLocaleString(undefined, {
			minimumFractionDigits: num % 1 === 0 ? 0 : 2,
			maximumFractionDigits: 2,
		})} ${symbol ?? ""}`;
	};



	return (
		<Dialog open={open} onOpenChange={open ? () => { } : setOpen}>
			<Button onClick={handleTrigger} size={"sm"} className="w-full">Join - {onchain?.poolPrice} {pool.tokenSymbol}</Button>
			{/* <DialogTrigger asChild>
			</DialogTrigger> */}
			<DialogContent className="max-sm:h-full max-sm:border-none sm:max-w-72 [&>button]:hidden">
				<DialogHeader className="space-y-1">
					<DialogDescription className="text-center text-xs">Join the</DialogDescription>
					<DialogTitle className="text-center">{pool.tokenSymbol} POOL</DialogTitle>
					<VisuallyHidden>
					</VisuallyHidden>
				</DialogHeader>


				<div className="relative w-16 h-16 mx-auto my-6">
					{/* <div className="w-full h-full bg-etn rounded-full animate-ping" /> */}
					<img src={pool.tokenLogo} alt={pool.tokenSymbol} className="absolute top-0 left-0 w-full h-full rounded-full" />
				</div>

				<div className="space-y-3">
					<div className="text-xs flex items-center justify-center text-muted-foreground">
						<span>My Balance:&nbsp;</span>
						<span>{formatBalance(balance?.displayValue, balance?.symbol)}</span>
					</div>
					<Separator />
					<div className="text-sm font-bold flex items-center justify-between">
						<span>Join Fee</span>
						<span>{formatBalance(onchain?.poolPrice, pool.tokenSymbol)}</span>
					</div>
					<Separator />
				</div>
				<div className="flex gap-2">
					<Button variant={"secondary"} className="w-24" onClick={() => setOpen(false)}>Cancel</Button>
					<Button className="w-full">Confirm</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default PoolJoin;