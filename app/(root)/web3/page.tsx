// "use client";

// import { thirdwebClient } from "@/thirdweb/client";
// import { Button } from "@heroui/button";
// import { ethers, JsonRpcProvider } from "ethers";
// import { useWalletBalance } from "thirdweb/react";

// export default function Web3Page() {
// 	const provider = new JsonRpcProvider("https://rpc.ankr.com/electroneum/52b5f737aef79782f352d60c4aff29a46ba25df38d7a71bfad0befd77cb17eb9");
// 	const tokenAddress = "0x38B54f147303887BD2E932373432FfCBD11Ff6a5";
// 	const erc20Abi = ["function balanceOf(address owner) view returns (uint256)"];

// 	const fetchTokenBalance = async () => {
// 		try {
// 			const contract = new ethers.Contract(tokenAddress, erc20Abi, provider);
// 			const balance = await contract.balanceOf("0x911934037F313B28967001589ab2A46d0d6B8c0a");
// 			const formattedBalance = ethers.formatUnits(balance, 18); // Adjust decimals (USDT = 6, most tokens = 18)
// 			console.log("Balance:", formattedBalance);
// 		} catch (error) {
// 			console.error("Error fetching token balance:", error);
// 		}
// 	};

// 	const { data: etn } = useWalletBalance({
// 		address: "0xc701ad764e12f3aa9c80Af0D60a957415FC7e479",
// 		client: thirdwebClient,
// 		chain: {
// 			id: 5201420,
// 			rpc: "https://rpc.ankr.com/electroneum_testnet/52b5f737aef79782f352d60c4aff29a46ba25df38d7a71bfad0befd77cb17eb9",
// 			nativeCurrency: {
// 				name: "Electroneum",
// 				symbol: "ETN",
// 				decimals: 18,
// 			},
// 			icon: { url: "/symbols/2137.png", width: 100, height: 100, format: "png" },
// 		},
// 	});

// 	console.log("ETN:", etn?.displayValue, etn?.symbol);

// 	const { data: buddy } = useWalletBalance({
// 		address: "0x911934037F313B28967001589ab2A46d0d6B8c0a",
// 		client: thirdwebClient,
// 		chain: {
// 			id: 52014,
// 			rpc: "https://rpc.ankr.com/electroneum",
// 			nativeCurrency: {
// 				name: "Electroneum",
// 				symbol: "ETN",
// 				decimals: 18,
// 			},
// 			icon: { url: "/symbols/2137.png", width: 100, height: 100, format: "png" },
// 		},
// 		tokenAddress: "0x38B54f147303887BD2E932373432FfCBD11Ff6a5"
// 	});

// 	console.log("Buddy:", buddy?.displayValue, buddy?.symbol);


// 	return (
// 		<div className="container space-y-6">
// 			<h1 className="text-3xl font-bold mb-4">Web3 Page</h1>
// 			<p className="text-xl">Welcome to the web3 page! Only authenticated users can see this.</p>
// 			<Button onPress={fetchTokenBalance}>Fetch Token Balance</Button>
// 		</div>
// 	)
// }

export default function Web3() {
	return (
		<>
			Test
		</>
	)
}