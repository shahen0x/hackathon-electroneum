import { createThirdwebClient } from "thirdweb";
import { createAuth } from "thirdweb/auth";
import { privateKeyToAccount } from "thirdweb/wallets";
import { v } from "convex/values";
import { action, internalMutation, internalQuery } from "./_generated/server";


// Thirdweb Keys
const privateKey = process.env.THIRDWEB_ADMIN_WALLET;
if (!privateKey) throw new Error("Admin private key is missing from .env file.");

const secretKey = process.env.THIRDWEB_SECRET_KEY;
if (!secretKey) throw new Error("Thirdweb secret key is missing from .env file.");


// Init Thirdweb client
export const thirdwebClient = createThirdwebClient({
	secretKey: secretKey
});


// Init thirdweb auth client
export const thirdwebAuth = createAuth({
	domain: "electroplay.fun",
	adminAccount: privateKeyToAccount({ client: thirdwebClient, privateKey })
});

export const adminAccount = privateKeyToAccount({
	client: thirdwebClient,
	privateKey: process.env.THIRDWEB_ADMIN_WALLET as string,
});


// Generate a login payload for SIWE
export const generatePayload = action({
	args: {
		address: v.string(),
	},
	handler: async (_, args) => {
		const payload = await thirdwebAuth.generatePayload({ address: args.address, chainId: 5201420 });
		return payload;
	}
});


// Verify if nonce already exist in database
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


// Add nonce to db
export const createAuthNonce = internalMutation({
	args: {
		nonce: v.string(),
	},
	handler: async (ctx, args) => {
		return await ctx.db.insert("authNonces", { nonce: args.nonce });
	},
});


// Get a user by their wallet address
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


// Check if an acocunt is frozen
export const verifyAccountStatus = internalQuery({
	args: {
		userId: v.id("users"),
	},
	handler: async (ctx, args) => {
		return await ctx.db.query("usersFrozen")
			.withIndex("byUserId", (q) => q.eq("userId", args.userId))
			.unique();
	},
});


// Create a new user with their wallet address
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