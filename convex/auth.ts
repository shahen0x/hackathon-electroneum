import { convexAuth } from "@convex-dev/auth/server";
import { ConvexCredentials } from "@convex-dev/auth/providers/ConvexCredentials";
import { internal } from "./_generated/api";


export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
	providers: [
		ConvexCredentials({
			id: "telegramAuth",
			authorize: async (credentials, ctx) => {

				const { telegramInitData } = credentials;

				// Credentials are required
				if (!telegramInitData) {
					console.error("No telegram data received.");
					return null;
				}

				// Verify telegram user
				const telegramUser = await ctx.runAction(internal.telegram.verifyTelegramHash, {
					telegramInitData: telegramInitData.toString()
				});

				// Telegram user is required
				if (!telegramUser) {
					console.error("Invalid signature.");
					return null;
				}

				// Fetch user by telegramId, or create a new one
				let userId = await ctx.runQuery(internal.authUser.getUserByTelegramId, { telegramId: telegramUser.id });
				if (!userId) {
					try {
						userId = await ctx.runMutation(internal.authUser.createUserByTelegramId, {
							telegramId: telegramUser.id,
							username: telegramUser.username,
							avatar: telegramUser.photo_url,
							firstName: telegramUser.first_name,
							lastName: telegramUser.last_name,
						});
					} catch (error) {
						console.error("Error creating user:", error);
						return null;
					}
				}

				return { userId };
			},
		})
	],
});
