import { ConvexCredentials } from "@convex-dev/auth/providers/ConvexCredentials";
import { convexAuth } from "@convex-dev/auth/server";
import { LoginPayload } from "thirdweb/auth";
import { thirdwebAuth } from "./authWallet";
import { internal } from "./_generated/api";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
	providers: [
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
					console.error("Invalid payload");
					return null
				}

				// Prevent replay attacks
				const nonceExists = await ctx.runQuery(internal.authWallet.verifyAuthNonce, { nonce: payload.payload.nonce });
				if (nonceExists) {
					console.info("Nonce already exist.");
					return null;
				}
				await ctx.runMutation(internal.authWallet.createAuthNonce, { nonce: payload.payload.nonce });

				// Get wallet address from payload
				const walletAddress = payload.payload.address;

				// Fetch userId by wallet address, or create a new one
				let userId = await ctx.runQuery(internal.authWallet.getUserIdByWallet, { address: walletAddress });
				if (!userId) {
					try {
						userId = await ctx.runMutation(internal.authWallet.createUserWithAddress, { address: walletAddress });
						console.info(`Created new user for address: ${walletAddress}`);
					} catch (error) {
						console.error("Error creating user:", error);
						return null;
					}
				}

				return { userId };
			}
		})
	],
});
