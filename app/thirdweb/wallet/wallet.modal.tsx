"use client";

import { FC, useEffect } from "react";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { clientThirdweb } from "../client";
import { chain } from "~/config/chain";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "~/convex/_generated/api";
import toast from "react-hot-toast";
import { useAuthActions } from "@convex-dev/auth/react";
import { useNavigate } from "@remix-run/react";
interface WalletModalProps {

}

const WalletModal: FC<WalletModalProps> = () => {

	// Thirdweb
	const wallet = useActiveAccount();

	// Convex
	const { isLoading, isAuthenticated } = useConvexAuth();
	const { signOut: backendLogout } = useAuthActions();
	const user = useQuery(api.users.getCurrentUser)

	// If wallet and authed user aren't the same, log out of the previous wallet
	useEffect(() => {
		const verifyAccount = async () => {
			if (!isAuthenticated) return;
			if (user?.walletAddress === wallet?.address) return;

			if (user?.walletAddress !== wallet?.address) {
				toast.loading("Logging out of previous wallet...");
				await backendLogout();
				toast.dismiss();
				// window.location.reload();
			}
		}

		verifyAccount();
	}, [wallet]);

	return wallet ? (
		<>
			{user?.walletAddress}
			<ConnectButton
				client={clientThirdweb}
				autoConnect={true}
				// supportedNFTs={ }
				detailsModal={{
					hideSwitchWallet: true,
					hideBuyFunds: true,
					// networkSelector: {}
					// networkSelector: {
					// 	renderChain: ({ chain }) => {
					// 		return (
					// 			<div className="flex items-center gap-2">
					// 				{/* <Image src={"/symbols/2137.png"} alt={"Electroneum"} width={40} height={40} className="w-6 h-6" /> */}
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