"use client";

import { FC } from "react";
import { thirdwebClient } from "../client";
import { useActiveAccount, useAutoConnect, useConnectModal } from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { PiSpinnerGap, PiWallet } from "react-icons/pi";
import { Button } from "@heroui/button";
import { defineChain } from "thirdweb/chains";

interface WalletConnectButtonProps { }



const WalletConnectButton: FC<WalletConnectButtonProps> = () => {

	const activeAccount = useActiveAccount();
	const { connect } = useConnectModal();
	const { isLoading: connecting } = useAutoConnect({ client: thirdwebClient });

	const handleLogin = async () => {
		try {
			await connect({
				client: thirdwebClient,
				showThirdwebBranding: false,
				size: "compact",
				title: "Sign In",

				wallets: [
					inAppWallet({
						auth: {
							options: [
								"x",
								"telegram",
								"discord",
								"google",
								"facebook",
								"email",
							],
						},
					}),
					createWallet("io.metamask"),
					createWallet("walletConnect"),
				],
				appMetadata: {
					name: "Cryptark Games",
					url: "https://cryptark.io",
					description: "Cryptark is a multi-chain competitive gaming platform revolutionizing the way you play games, compete and get rewarded for your skills."
				},
			});
		} catch (error) {
			console.log("User rejected wallet connection.")
		}
	};

	return (
		<>
			{!activeAccount && connecting &&
				<Button
					variant="flat"
					color="default"
					className="space-x-2"
					disabled
				>
					<PiSpinnerGap size={20} className="animate-spin" />
					<span className="">Connect</span>
				</Button>
			}

			{!activeAccount && !connecting &&
				<Button
					variant="flat"
					color="primary"
					onPress={handleLogin}
					className="space-x-2"
				>
					<PiWallet size={20} />
					<span className="">Connect</span>
				</Button>
			}
		</>
	)
}

export default WalletConnectButton;