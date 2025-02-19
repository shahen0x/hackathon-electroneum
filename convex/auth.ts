import { convexAuth } from "@convex-dev/auth/server";
import { ConvexCredentials } from "@convex-dev/auth/providers/ConvexCredentials";
import { internal } from "./_generated/api";


export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
	providers: [],
});
