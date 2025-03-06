/**
 * WALLET CONNECTION BUTTON
 * A button that allow users to connect any evm compatible wallets as well 
 * as use generated wallets via email or socials
 * 
 */
import { appMetaData, chain } from "~/config/chain";
import { PiSpinnerGap, PiWallet } from "react-icons/pi";
import { clientThirdweb } from "../client";
import { useActiveAccount, useAutoConnect, useConnectModal } from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { Button } from "~/components/ui/button";


const WalletConnectButton = () => {

	// Thirdweb
	const { connect } = useConnectModal();
	const activeAccount = useActiveAccount();
	const { isLoading: connecting } = useAutoConnect({ client: clientThirdweb });


	// Handle wallet connection
	//
	const handleWalletConnection = async () => {
		try {
			await connect({
				client: clientThirdweb,
				appMetadata: appMetaData,
				showThirdwebBranding: false,
				size: "wide",
				title: "Connect options",
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
			});
		} catch (error) {
			console.log("User rejected wallet connection.");
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
					<Button onClick={handleWalletConnection} variant={"outline"} size={"icon"} className="md:hidden">
						<PiWallet size={20} />
					</Button>

					<Button onClick={handleWalletConnection} className="hidden md:flex">
						<PiWallet size={20} />
						<span>Sign In</span>
					</Button>
				</>
			}
		</>
	)
}

export default WalletConnectButton;