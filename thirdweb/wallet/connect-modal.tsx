"use client";

import { FC } from "react";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { thirdwebClient } from "../client";
import { defineChain } from "thirdweb/chains";
import Image from "next/image";
interface WalletConnectedModalProps {

}

const WalletConnectedModal: FC<WalletConnectedModalProps> = () => {

	// Thirdweb
	const account = useActiveAccount();


	return account ? (
		<>
			<ConnectButton
				client={thirdwebClient}
				autoConnect={true}
				detailsModal={{
					hideSwitchWallet: true,
					hideBuyFunds: true,
					// networkSelector: {
					// 	renderChain: ({ chain }) => {
					// 		return (
					// 			<div className="flex items-center gap-2">
					// 				<Image src={"/symbols/2137.png"} alt={"Electroneum"} width={40} height={40} className="w-6 h-6" />
					// 				<span>Electroneum</span>
					// 			</div>
					// 		);
					// 	},
					// }
				}}

				chain={
					defineChain({
						id: 5201420,
						rpc: "https://rpc.ankr.com/electroneum_testnet",
						nativeCurrency: {
							name: "Electroneum",
							symbol: "ETN",
							decimals: 18,
						},
						icon: { url: "/symbols/2137.png", width: 100, height: 100, format: "png" },
					})
				}
			/>
		</>
	) : null;
}

export default WalletConnectedModal;