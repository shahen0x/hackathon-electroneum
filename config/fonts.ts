import {
	Fira_Code as FontMono,
	Saira as FontSans,
	Press_Start_2P,
} from "next/font/google";

export const fontSans = FontSans({
	subsets: ["latin"],
	weight: "400",
	variable: "--font-sans",
	display: "swap",
});

export const fontMono = FontMono({
	subsets: ["latin"],
	variable: "--font-mono",
	display: "swap",
});

export const fontStart2P = Press_Start_2P({
	subsets: ["latin"],
	weight: "400",
	style: "normal",
	display: "swap",
	variable: "--font-start2p",
	adjustFontFallback: false
})