import { defineChain } from "thirdweb/chains";

export const chain = defineChain({
	id: 52014,
	// rpc: "https://rpc.ankr.com/electroneum",
	// rpc: "https://rpc.ankr.com/electroneum/52b5f737aef79782f352d60c4aff29a46ba25df38d7a71bfad0befd77cb17eb9",
	nativeCurrency: {
		name: "Electroneum",
		symbol: "ETN",
		decimals: 18,
	},
	icon: { url: "/symbols/2137.png", width: 100, height: 100, format: "png" },
});