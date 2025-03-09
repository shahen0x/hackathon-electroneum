import { defineChain } from "thirdweb/chains";

export const appMetaData = {
	name: "ElectroPlay",
	url: "https://electroplay.fun",
	description: "ElectroPlay is a gaming platform on the Electroneum blockchain. Play games, join competitive pools & climb leaderboards for weekly rewards!",
	logoUrl: "https://cdn.electroplay.fun/logo.svg",
}

export const chain = defineChain({
	id: 52014,
	rpc: "https://rpc.ankr.com/electroneum",
	// rpc: "https://rpc.ankr.com/electroneum/52b5f737aef79782f352d60c4aff29a46ba25df38d7a71bfad0befd77cb17eb9",
	nativeCurrency: {
		name: "Electroneum",
		symbol: "ETN",
		decimals: 18,
	},
	icon: {
		url: "https://cdn.electroplay.fun/token-logos/etn.png",
		width: 100,
		height: 100,
		format: "png"
	},
});


export const supportedTokens = {
	52014: [
		{
			address: "0x38B54f147303887BD2E932373432FfCBD11Ff6a5",
			name: "ETN Buddy",
			symbol: "BUDDY",
			icon: "https://cdn.electroplay.fun/token-logos/buddy.png"
		},
		{
			address: "0x00",
			name: "MEGA",
			symbol: "MEGA",
			icon: "https://cdn.electroplay.fun/token-logos/mega.png"
		},
		{
			address: "0xc20d02538368D8F7deBeAeB99D9a8b4d4D1DDC1C",
			name: "Pandy",
			symbol: "PDY",
			icon: "https://cdn.electroplay.fun/token-logos/pandy.png"
		},
		{
			address: "0x075533AB8EeC6A6999F07C8bc2f1900eB8312e25",
			name: "FUGAZI",
			symbol: "FUGAZI",
			icon: "https://cdn.electroplay.fun/token-logos/fugazi.png"
		},
	]
}