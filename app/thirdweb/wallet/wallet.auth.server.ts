import { createThirdwebClient } from "thirdweb";
import { createAuth, VerifyLoginPayloadParams } from "thirdweb/auth";
import { privateKeyToAccount } from "thirdweb/wallets";

const privateKey = process.env.THIRDWEB_ADMIN_WALLET;
const secretKey = process.env.THIRDWEB_SECRET_KEY;

if (!privateKey) throw new Error("Admin private key is missing from .env file.");
if (!secretKey) throw new Error("Thirdweb secret key is missing from .env file.");


export const thirdwebClient = createThirdwebClient({
	secretKey: secretKey
});


const thirdwebAuth = createAuth({
	domain: "electroplay.fun",
	adminAccount: privateKeyToAccount({ client: thirdwebClient, privateKey })
});

export const generatePayload = thirdwebAuth.generatePayload;

export async function thirdwebLogin(payload: VerifyLoginPayloadParams) {
	const verifiedPayload = await thirdwebAuth.verifyPayload(payload);
	if (!verifiedPayload.valid) return false;

	const jwt = await thirdwebAuth.generateJWT({
		payload: verifiedPayload.payload
	});

	// const expires = new Date(Date.now() + 60 * 1000); // 1 minute from now
	// (await cookies()).set("jwt", jwt, {
	// 	httpOnly: true,
	// 	secure: true,
	// 	sameSite: 'strict',
	// });

	return true
}