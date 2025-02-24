import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "convex/_generated/api";
import { useAction } from "convex/react";
import { signLoginPayload } from "thirdweb/auth";
import { useActiveAccount } from "thirdweb/react";
import { Button } from "~/components/ui/button";

// export async function loader() {
// 	return await generatePayload();
// }

export default function Web3() {

	const wallet = useActiveAccount();

	const generatePayload = useAction(api.authWallet.generatePayload);
	// const authenticateWallet = useAction(api.authWallet.authenticateWallet);
	const { signIn } = useAuthActions();

	const handleAuthentication = async (): Promise<void> => {
		try {

			// Check if a wallet is connected
			if (!wallet) throw new Error("Wallet not connected.");

			// Generate web3 login payload
			const payload = await generatePayload({ address: wallet.address });
			if (!payload) throw new Error("Failed to generate login payload.");

			// Sign the payload
			const signedPayload = await signLoginPayload({ account: wallet, payload });
			if (!signedPayload) throw new Error("Signature failed.");

			// Authenticate the wallet
			// const formData = {
			// 	signedPayload
			// }

			const backendResponse = await signIn("siwe", { signedPayload });
			if (!backendResponse.signingIn) throw new Error("Sign-in process failed.");

			// const jwt = await authenticateWallet({ signedPayload: { payload, signature: signatureResult.signature } });

			// console.log(jwt)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<Button onClick={handleAuthentication}>Authenticate</Button>
		</>
	)
}