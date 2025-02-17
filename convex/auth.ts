import { convexAuth } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";
import { ConvexCredentials } from "@convex-dev/auth/providers/ConvexCredentials";
import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";


export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
	providers: [
		Password,
		ConvexCredentials({
			id: "telegramAuth",
			authorize: async (credentials, ctx) => {

				const { telegramInitData } = credentials;

				if (!telegramInitData) {
					console.error("No telegram data received.");
					return null;
				}

				// Verify telegram user
				const telegramUser = await ctx.runAction(internal.telegram.verifyTelegramHash, {
					telegramInitData: telegramInitData.toString()
				});

				if (!telegramUser) {
					console.error("Invalid signature.");
					return null;
				}

				console.log("telegram user", telegramUser);


				const userId = "kh78n5w3w96x2x9xzp7za6w4hs7ahs55" as Id<"users">;
				return { userId };
				// return null;
			},
		})
	],
});
