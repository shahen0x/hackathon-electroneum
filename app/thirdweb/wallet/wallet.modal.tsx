/**
 * WALLET MODAL
 * Where users can manage their currently connected wallet, disconnect, etc.
 * They can also send/receive our partner tokens
 * 
 */
import { useEffect } from "react";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { clientThirdweb } from "../client";
import { appMetaData, chain, supportedTokens } from "~/config/chain";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "~/convex/_generated/api";
import toast from "react-hot-toast";
import { useAuthActions } from "@convex-dev/auth/react";


const WalletModal = () => {

	// Thirdweb
	const wallet = useActiveAccount();

	// Convex
	const { isAuthenticated } = useConvexAuth();
	const { signOut: backendLogout } = useAuthActions();
	const user = useQuery(api.users.getCurrentUser)


	// If wallet and authed user aren't the same, log out of the previous wallet
	//
	useEffect(() => {
		const verifyAccount = async () => {
			if (!isAuthenticated) return;
			if (user?.walletAddress === wallet?.address) return;

			if (user?.walletAddress !== wallet?.address) {
				toast.loading("Logging out of previous wallet...");
				await backendLogout();
				toast.dismiss();
			}
		}
		verifyAccount();
	}, [wallet]);


	return wallet ? (
		<ConnectButton
			client={clientThirdweb}
			appMetadata={appMetaData}
			autoConnect={true}
			detailsModal={{
				hideBuyFunds: true,
			}}
			chain={chain}
			supportedTokens={supportedTokens}
		/>
	) : null;
}

export default WalletModal;