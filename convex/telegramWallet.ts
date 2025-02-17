import { Wallet } from "ethers";

const encryptionKey = process.env.TG_WALLET_ENCRYPTION_KEY!;

export const generateWallet = async () => {

	// Generate a random wallet
	const wallet = Wallet.createRandom();

	// Encrypt the private key with the encryption key
	const encryptedPrivateKey = await wallet.encrypt(encryptionKey);

	return {
		address: wallet.address,
		encryptedPrivateKey: encryptedPrivateKey
	};
};