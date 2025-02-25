import { defineChain } from "thirdweb/chains";

export const electroneum = defineChain({
	id: 52014,
	rpc: "https://rpc.ankr.com/electroneum",
	nativeCurrency: {
		name: "Electroneum",
		symbol: "ETN",
		decimals: 18,
	},
	icon: { url: "/symbols/2137.png", width: 100, height: 100, format: "png" },
})