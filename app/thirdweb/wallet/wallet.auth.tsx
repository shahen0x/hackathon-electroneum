import { useEffect, useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useAction, useConvexAuth } from "convex/react";
import { api } from "~/convex/_generated/api";
import { signLoginPayload } from "thirdweb/auth";
import { useActiveAccount } from "thirdweb/react";
import { shortenAddress } from "thirdweb/utils";
import { PiCircleNotch } from "react-icons/pi";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";


const WalletAuth = () => {

	// States
	const [dialogOpen, setDialogOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	// Thirdweb
	const wallet = useActiveAccount();

	// Backend
	const { signIn } = useAuthActions();
	const { isAuthenticated, isLoading: isLoadingAuth } = useConvexAuth();
	const generatePayload = useAction(api.authWallet.generatePayload);

	// Authenticate wallet
	const authenticateUser = async (): Promise<void> => {
		// Check if a wallet is connected
		if (!wallet) throw new Error("Wallet not connected.");

		// Generate web3 login payload
		const payload = await generatePayload({ address: wallet.address });
		if (!payload) throw new Error("Failed to generate login payload.");

		// Sign the payload
		const signedPayload = await signLoginPayload({ account: wallet, payload });
		if (!signedPayload) throw new Error("Signature failed.");

		// Authenticate the wallet
		const backendResponse = await signIn("siwe", { signedPayload });
		if (!backendResponse.signingIn) throw new Error("Verification process failed.");
	}

	const { mutate: handleAuthenticateUser } = useMutation({
		mutationFn: authenticateUser,
		onMutate() {
			setIsLoading(true)
		},
		onError(error) {
			setErrorMessage(error.message);
			console.log(error);
			toast.error("An error occured.");
			setIsLoading(false);
		},
		onSuccess() {
			setIsLoading(false);
			toast.success("Wallet authentication successful!");
			setDialogOpen(false);
		},
	});

	// Open dialog if wallet is connected but not authenticated
	useEffect(() => {
		if (wallet && !isAuthenticated && !isLoadingAuth) {
			setDialogOpen(true);
		}
	}, [wallet, isAuthenticated, isLoadingAuth]);

	// If wallet is not connected or already authenticated, don't render
	if (!wallet || isLoadingAuth || isAuthenticated) return null;

	return (
		<Dialog
			open={dialogOpen}
			onOpenChange={(open) => {
				if (!open) return;
				setDialogOpen(open);
			}}
		>
			<DialogContent hideClose className="max-w-sm rounded-2xl">

				<DialogHeader className="text-center space-y-6">
					<DialogTitle className="text-md">
						Wallet signing required <br />
						<span className="text-etn">
							{wallet ? shortenAddress(wallet.address) : "0x0000...0000"}
						</span>
					</DialogTitle>

					<div className="w-fit mx-auto border-2 border-b-0 rounded-2xl p-4 pb-10 space-y-2">
						<div className="rounded-full border-2 border-neutral-900 py-2 px-6 flex items-center justify-center gap-4">
							<img src="https://cdn.electroplay.fun/logo.svg" alt="ElectroPlay" className="w-5 h-auto grayscale -mt-1" />
							<span className="font-bold text-xs text-muted-foreground">https://electroplay.fun</span>
						</div>
						<div className="w-3/4 h-1 mx-auto bg-neutral-900 rounded-full" />
						<div className="w-1/2 h-1 mx-auto bg-neutral-900 rounded-full" />
						<div className="w-1/4 h-1 mx-auto bg-neutral-900 rounded-full" />
					</div>

					<DialogDescription className="sm:text-xs">You need to sign a message on your wallet to prove ownership. This enhances your account security.</DialogDescription>
				</DialogHeader>

				<div className="mt-2 space-y-4">
					<Button
						size={"lg"}
						tabIndex={-1}
						className="w-full"
						disabled={isLoading || isAuthenticated}
						onClick={() => handleAuthenticateUser()}
					>
						{!isLoading && "Sign To Access"}
						{isLoading && <PiCircleNotch size={20} className="animate-spin" />}
					</Button>

					{errorMessage && <p className="text-xs text-center text-rose-500">{errorMessage}</p>}
				</div>
			</DialogContent>
		</Dialog >

	);
}

export default WalletAuth;