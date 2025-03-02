import { FC } from "react";
import { Button } from "../ui/button";
import { useActiveAccount } from "thirdweb/react";
import { PoolType } from "./pools";
import { PiWallet } from "react-icons/pi";
import { getContract, prepareContractCall, sendTransaction, toWei, waitForReceipt } from "thirdweb";
import { clientThirdweb as client } from "~/thirdweb/client";
import { chain } from "~/config/chain";
import { abiPoolNative } from "~/thirdweb/abi/abi.pool.native";
import { useMutation } from "@tanstack/react-query";
import { abiPoolERC20 } from "~/thirdweb/abi/abi.pool.erc20";
import { handleOnChainError } from "~/lib/onchain.errors";
import toast from "react-hot-toast";

interface PoolJoinProps {
	data: PoolType;
	userJoinedPool: boolean | undefined;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	processing: boolean;
	setProcessing: React.Dispatch<React.SetStateAction<boolean>>;
	refetchData: () => void;
	refetchJoinedPool: () => void;
}

const PoolJoin: FC<PoolJoinProps> = ({ data, userJoinedPool, setOpen, processing, setProcessing, refetchData, refetchJoinedPool }) => {

	// Thirdweb
	const account = useActiveAccount();


	// Reusable contract instance
	const getContractInstance = (address: string, abi?: any) => {
		setProcessing(true);
		return getContract({ client, chain, address, abi });
	};


	// Reusable send transaction
	const initTransaction = async (transaction: any) => {
		if (!account) throw new Error("No account found");

		const { transactionHash } = await sendTransaction({
			transaction,
			account,
		});
		return transactionHash;
	};


	// Join ETN Pool
	const handleNativeJoin = async () => {
		if (!data) throw new Error("Pool data not found");

		const contract = getContractInstance(
			data.contractAddress,
			abiPoolNative
		);

		const transaction = await prepareContractCall({
			contract,
			method: "joinPool",
			value: toWei(String(data.poolPrice)),
		});

		const joinHash = await initTransaction(transaction);

		return await waitForReceipt({
			client,
			chain,
			transactionHash: joinHash
		});
	};


	// Join ERC20 Pool
	const handleERC20Join = async () => {
		if (!data) throw new Error("Pool data not found");
		if (userJoinedPool) throw new Error("You are already in the pool!");

		const tokenContract = getContractInstance(data.tokenAddress);

		// Approve token spend
		const approveTx = await prepareContractCall({
			contract: tokenContract,
			method: "function approve(address spender, uint256 amount) returns (bool)",
			params: [data.contractAddress, toWei(String(data.poolPrice))],
		});

		const approveHash = await initTransaction(approveTx);
		if (!approveHash) throw new Error("Approval failed.");

		await waitForReceipt({
			client,
			chain,
			transactionHash: approveHash
		});

		// Join pool
		const poolContract = getContractInstance(data.contractAddress, abiPoolERC20);

		const joinTx = await prepareContractCall({
			contract: poolContract,
			method: "joinPool"
		});

		const joinHash = await initTransaction(joinTx);

		return await waitForReceipt({
			client,
			chain,
			transactionHash: joinHash
		});
	}


	const { mutate: joinPoolNative } = useMutation({
		mutationFn: handleNativeJoin,
		onError(error) {
			setProcessing(false);
			handleOnChainError(error);
		},
		onSuccess() {
			setProcessing(false);
			setOpen(false);
			toast.success("Successfully joined the pool!");
			refetchData();
			refetchJoinedPool();
		},
	});



	const { mutate: joinPoolErc20 } = useMutation({
		mutationFn: handleERC20Join,
		onError(error) {
			setProcessing(false);
			handleOnChainError(error);
		},
		onSuccess() {
			setProcessing(false);
			setOpen(false);
			toast.success("Successfully joined the pool!");
			refetchData();
			refetchJoinedPool();
		},
	});

	return (
		<Button
			disabled={!account || processing || userJoinedPool}
			onClick={() => data?.isNative ? joinPoolNative() : joinPoolErc20()}
			variant={account ? "default" : "outline"}
			className={`w-full px-0 ${!account || processing && "text-xs"}`}
		>
			{account ?
				<>
					{processing ? "Awaiting confirmation..." : "Proceed"}
				</>
				:
				<>
					<PiWallet size={20} />
					Wallet not connected
				</>
			}
		</Button>
	)
}

export default PoolJoin;