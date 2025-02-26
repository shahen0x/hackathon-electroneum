"use client";

import { FC } from "react";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { clientThirdweb } from "../client";
import { chain } from "~/config/chain";
interface WalletModalProps {

}

const WalletModal: FC<WalletModalProps> = () => {

	// Thirdweb
	const account = useActiveAccount();


	return account ? (
		<>
			<ConnectButton
				client={clientThirdweb}
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
				chain={chain}
				supportedTokens={{
					52014: [
						{
							address: "0x38B54f147303887BD2E932373432FfCBD11Ff6a5",
							name: "ETN Buddy",
							symbol: "BUDDY",
							icon: "https://app.electroswap.io/images/0x38B54f147303887BD2E932373432FfCBD11Ff6a5.png"
						}
					]
				}}
			/>
		</>
	) : null;
}

export default WalletModal;