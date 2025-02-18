"use client";

import Image from "next/image";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import { useTelegramStore } from "@/store/use-telegram-store";
import { shortenAddress } from "thirdweb/utils";
import { useWalletBalance } from "thirdweb/react";
import { thirdwebClient } from "@/thirdweb/client";
import { ethers, formatEther, JsonRpcProvider } from "ethers";
import { useEffect, useState } from "react";
import CurrentCycle from "@/components/cycle";


const provider = new JsonRpcProvider("https://rpc.ankr.com/electroneum");

// ERC-20 token contract address (Example: USDT)
const tokenAddress = "0x38B54f147303887BD2E932373432FfCBD11Ff6a5";

// ERC-20 ABI for balanceOf function
const erc20Abi = ["function balanceOf(address owner) view returns (uint256)"];
export default function Home() {

	const router = useRouter();
	const { userData, isAuthenticated } = useTelegramStore();

	const [balance, setBalance] = useState<string | null>(null);



	useEffect(() => {
		const fetchTokenBalance = async () => {
			try {
				const contract = new ethers.Contract(tokenAddress, erc20Abi, provider);
				const balance = await contract.balanceOf("0xc701ad764e12f3aa9c80Af0D60a957415FC7e479");
				const formattedBalance = ethers.formatUnits(balance, 6); // Adjust decimals (USDT = 6, most tokens = 18)
				setBalance(formattedBalance);
			} catch (error) {
				console.error("Error fetching token balance:", error);
			}
		};

		fetchTokenBalance();
	}, []);

	// const { data: etn } = useWalletBalance({
	// 	address: userData?.telegramWallet,
	// 	client: thirdwebClient,
	// 	chain: {
	// 		id: 5201420,
	// 		rpc: "https://rpc.ankr.com/electroneum_testnet",
	// 		nativeCurrency: {
	// 			name: "Electroneum",
	// 			symbol: "ETN",
	// 			decimals: 18,
	// 		},
	// 		icon: { url: "/symbols/2137.png", width: 100, height: 100, format: "png" },
	// 	},
	// });


	// const { data: buddy } = useWalletBalance({
	// 	address: userData?.telegramWallet,
	// 	client: thirdwebClient,
	// 	chain: {
	// 		id: 52014,
	// 		rpc: "https://rpc.ankr.com/electroneum",
	// 		nativeCurrency: {
	// 			name: "Electroneum",
	// 			symbol: "ETN",
	// 			decimals: 18,
	// 		},
	// 		icon: { url: "/symbols/2137.png", width: 100, height: 100, format: "png" },
	// 	},
	// 	tokenAddress: "0x38B54f147303887BD2E932373432FfCBD11Ff6a5"
	// });





	return (
		<main className="flex h-full flex-col items-center justify-center p-24">

			{/* <CurrentCycle /> */}
			<p>authenticated: {String(isAuthenticated)}</p>
			{userData?.telegramWallet &&
				<p>Wallet: {shortenAddress(userData.telegramWallet)}</p>
			}



			<p>Balance: {balance} ETN</p>
			{/* <p>Buddy Balance: {buddy?.displayValue} {buddy?.symbol}</p> */}
			{userData?.avatar &&
				<Image src={userData.avatar} alt="Logo" width={100} height={100} />
			}

			<Button onPress={() => router.push('/player/ballsort')}>Test</Button>
		</main>
	)
}