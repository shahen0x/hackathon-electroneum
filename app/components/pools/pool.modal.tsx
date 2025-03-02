import { FC, useState } from "react";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { formatEth } from "~/lib/format.eth";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { HiArrowLongRight } from "react-icons/hi2";
import { useActiveAccount, useWalletBalance } from "thirdweb/react";
import { clientThirdweb } from "~/thirdweb/client";
import { Separator } from "../ui/separator";
import { chain } from "~/config/chain";
import { PoolType } from "./pools";
import PoolJoin from "./pool.join";

interface PoolModalProps {
	data: PoolType;
	userJoinedPool: boolean | undefined;
	refetchData: () => void;
	refetchJoinedPool: () => void;
}

const PoolModal: FC<PoolModalProps> = ({ data, userJoinedPool, refetchData, refetchJoinedPool }) => {

	// States
	const [open, setOpen] = useState(false);
	const [processing, setProcessing] = useState<boolean>(false);

	// Thirdweb
	const account = useActiveAccount();

	// Get balance for related native or erc20 token
	const { data: balance } = useWalletBalance({
		chain,
		address: account?.address,
		client: clientThirdweb,
		tokenAddress: data?.isNative ? undefined : data?.tokenAddress,
	});


	return (
		<Dialog open={open} onOpenChange={processing ? () => { } : setOpen}>

			<DialogTrigger asChild>
				<Button
					size={"sm"}
					className="w-full"
					variant={userJoinedPool ? "secondary" : "default"}
					disabled={userJoinedPool}
				>
					{userJoinedPool ?
						<>You already joined</>
						:
						<>
							Join - {formatEth(data?.poolPrice, data?.tokenSymbol)}
						</>
					}
				</Button>
				{/* 
				<Button
					size={"sm"}
					className="w-full"
				>
					Join - {formatEth(data?.poolPrice, data?.tokenSymbol)}
				</Button> */}
			</DialogTrigger>

			<DialogContent className="max-sm:h-full max-sm:border-none sm:max-w-80 [&>button]:hidden">
				<DialogHeader className="space-y-3">

					<div className="space-y-1">
						<DialogDescription className="text-center text-xs">{processing ? "Joining" : "Join"} the</DialogDescription>
						<DialogTitle className="text-center">{data?.tokenSymbol} POOL</DialogTitle>
					</div>

					{!data?.isNative &&
						<TooltipProvider>
							<Tooltip delayDuration={0}>
								<TooltipTrigger asChild>
									<div className="flex items-center justify-center gap-3 border rounded-full w-fit px-4 mx-auto text-xs text-muted-foreground">
										<div className="flex items-center gap-1">
											<span className="opacity-40">1. </span>
											Approve
										</div>
										<HiArrowLongRight size={26} className="opacity-20" />
										<div className="flex items-center gap-1">
											<span className="opacity-40">2. </span>
											Confirm
										</div>
									</div>
								</TooltipTrigger>
								<TooltipContent className="max-w-72">
									<p>ERC20 token pools require approval before confirming a transaction.</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					}
				</DialogHeader>

				<div className="relative w-16 h-16 mx-auto my-6">
					{processing && <div className="w-full h-full bg-etn rounded-full animate-ping" />}
					<img src={data?.tokenLogo} alt={data?.tokenSymbol} className="absolute top-0 left-0 w-full h-full rounded-full" />
				</div>

				<div className="space-y-3">
					<div className="text-xs flex items-center justify-center text-muted-foreground">
						<span>My Balance:&nbsp;</span>
						<span>{formatEth(balance?.displayValue, balance?.symbol)}</span>
					</div>
					<Separator />
					<div className="text-sm font-bold flex items-center justify-between">
						<span>Join Fee</span>
						<span>{formatEth(data?.poolPrice, data?.tokenSymbol)}</span>
					</div>
					<Separator />
				</div>
				<div className="flex gap-2">
					<Button
						onClick={() => setOpen(false)}
						variant={"secondary"}
						className="w-24"
						disabled={processing}
					>
						Close
					</Button>

					<PoolJoin
						data={data}
						userJoinedPool={userJoinedPool}
						setOpen={setOpen}
						processing={processing}
						setProcessing={setProcessing}
						refetchData={refetchData}
						refetchJoinedPool={refetchJoinedPool}
					/>
				</div>


			</DialogContent>
		</Dialog>
	)
}

export default PoolModal;