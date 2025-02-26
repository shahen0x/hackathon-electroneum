"use client";

import { FC } from "react";
import { useActiveAccount, useAutoConnect, useConnectModal } from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { PiSpinnerGap, PiWallet } from "react-icons/pi";
import { clientThirdweb } from "../client";
import { Button } from "~/components/ui/button";
import { chain } from "~/config/chain";

interface WalletConnectButtonProps { }



const WalletConnectButton: FC<WalletConnectButtonProps> = () => {

	const activeAccount = useActiveAccount();
	const { connect } = useConnectModal();
	const { isLoading: connecting } = useAutoConnect({ client: clientThirdweb });

	const handleLogin = async () => {
		try {
			await connect({
				client: clientThirdweb,
				showThirdwebBranding: false,
				size: "compact",
				title: "Sign In",
				chain,
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
				<>
					<Button variant={"secondary"} size={"icon"} className="md:hidden" disabled>
						<PiSpinnerGap size={20} className="animate-spin" />
					</Button>

					<Button variant={"secondary"} className="hidden md:flex" disabled>
						<PiSpinnerGap size={20} className="animate-spin" />
						<span>Sign In</span>
					</Button>
				</>
			}

			{!activeAccount && !connecting &&
				<>
					<Button onClick={handleLogin} variant={"outline"} size={"icon"} className="md:hidden">
						<PiWallet size={20} />
					</Button>

					<Button onClick={handleLogin} className="hidden md:flex">
						<PiWallet size={20} />
						<span>Sign In</span>
					</Button>
				</>
			}
		</>
	)
}

export default WalletConnectButton;