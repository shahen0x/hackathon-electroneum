import { createThirdwebClient } from "thirdweb";
import { createAuth } from "thirdweb/auth";
import { privateKeyToAccount } from "thirdweb/wallets";
import { action, internalMutation, internalQuery, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

// const payload = v.object({
// 	domain: v.string(),
// 	address: v.string(),
// 	statement: v.string(),
// 	uri: v.optional(v.string()),
// 	version: v.string(),
// 	chain_id: v.optional(v.string()),
// 	nonce: v.string(),
// 	issued_at: v.string(),
// 	expiration_time: v.string(),
// 	invalid_before: v.string(),
// 	resources: v.optional(v.array(v.string())),
// })


const privateKey = process.env.THIRDWEB_ADMIN_WALLET;
const secretKey = process.env.THIRDWEB_SECRET_KEY;

if (!privateKey) throw new Error("Admin private key is missing from .env file.");
if (!secretKey) throw new Error("Thirdweb secret key is missing from .env file.");

export const thirdwebClient = createThirdwebClient({
	secretKey: secretKey
});

export const thirdwebAuth = createAuth({
	domain: "electroplay.fun",
	adminAccount: privateKeyToAccount({ client: thirdwebClient, privateKey })
});



export const generatePayload = action({
	args: {
		address: v.string(),
	},
	handler: async (_, args) => {
		const payload = await thirdwebAuth.generatePayload({ address: args.address, chainId: 5201420 });
		return payload;
	}
});



export const verifyAuthNonce = internalQuery({
	args: {
		nonce: v.string(),
	},
	handler: async (ctx, args) => {
		return await ctx.db.query("authNonces")
			.withIndex("byNonce", (q) => q.eq("nonce", args.nonce))
			.unique();
	},
});


export const createAuthNonce = internalMutation({
	args: {
		nonce: v.string(),
	},
	handler: async (ctx, args) => {
		return await ctx.db.insert("authNonces", { nonce: args.nonce });
	},
});



export const getUserIdByWallet = internalQuery({
	args: {
		address: v.string(),
	},
	handler: async (ctx, args) => {
		const user = await ctx.db.query("users")
			.withIndex("byWalletAddress", (q) => q.eq("walletAddress", args.address))
			.unique();

		return user?._id
	},
});



export const createUserWithAddress = internalMutation({
	args: {
		address: v.string(),
	},
	handler: async (ctx, args) => {
		return await ctx.db.insert("users", {
			walletAddress: args.address
		})
	},
});


export const testUser = mutation({
	handler: async (ctx) => {
		const userId = await getAuthUserId(ctx);
		if (userId === null) {
			throw new Error("Not authenticated.");
		}
		return await ctx.db.get(userId);
	}
})



// export const authenticateWallet = action({
// 	args: {
// 		signedPayload: v.object({
// 			payload: payload,
// 			signature: v.string(),
// 		}),
// 	},
// 	handler: async (_, args) => {

// 		const verifiedPayload = await thirdwebAuth.verifyPayload(args.signedPayload);
// 		if (!verifiedPayload.valid) throw new ConvexError({ message: "Wallet verification failed." });

// 		const jwt = await thirdwebAuth.generateJWT({
// 			payload: verifiedPayload.payload
// 		});

// 		return jwt;
// 	}
// })