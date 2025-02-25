import { ConvexCredentials } from "@convex-dev/auth/providers/ConvexCredentials";
import { convexAuth } from "@convex-dev/auth/server";
import { LoginPayload } from "thirdweb/auth";
import { thirdwebAuth } from "./authWallet";
import { internal } from "./_generated/api";
import { ConvexError } from "convex/values";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
	providers: [

		// Sign in with Ethereum
		ConvexCredentials({
			id: "siwe",
			authorize: async (credentials, ctx) => {

				// Extract signed payload
				const { signedPayload } = credentials;
				const payload = signedPayload as {
					signature: `0x${string}`;
					payload: LoginPayload;
				};

				// Verify payload
				const verifiedPayload = await thirdwebAuth.verifyPayload(payload);
				if (!verifiedPayload.valid) {
					throw new ConvexError({ message: "Signature is not valid. Please try again." })
				}

				// Prevent replay attacks, check if nonce exist
				const nonceExists = await ctx.runQuery(internal.authWallet.verifyAuthNonce, { nonce: verifiedPayload.payload.nonce });
				if (nonceExists) {
					throw new ConvexError({ message: "This nonce has already been used." });
				}

				// Save new nonce
				await ctx.runMutation(internal.authWallet.createAuthNonce, { nonce: verifiedPayload.payload.nonce });

				// Get wallet address from verified payload
				const walletAddress = verifiedPayload.payload.address;

				// Fetch userId by wallet address
				let userId = await ctx.runQuery(internal.authWallet.getUserIdByWallet, { address: walletAddress });

				// Verify if account is frozen/banned
				if (userId) {
					const frozen = await ctx.runQuery(internal.authWallet.verifyAccountStatus, { userId });
					if (frozen) {
						throw new ConvexError({ message: "This wallet is frozen for suspicious activity." });
					}
				}

				// Create user if not exist
				if (!userId) {
					try {
						userId = await ctx.runMutation(internal.authWallet.createUserWithAddress, { address: walletAddress });
						console.info(`Created new user for address: ${walletAddress}`);
					} catch (error) {
						console.error("Error creating user:", error);
						throw new ConvexError({ message: "We were unable to create your account." });
					}
				}

				return { userId };
			}
		})
	],
});
