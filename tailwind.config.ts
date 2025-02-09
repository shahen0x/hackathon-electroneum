const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '0.5rem',
				xs: '2rem',
				sm: '2rem',
				md: '2rem',
				lg: '2rem',
				xl: '4rem'
			}
		},
		extend: {
			fontFamily: {
				sans: ["var(--font-sans)"],
				mono: ["var(--font-mono)"],
				start2p: ["var(--font-start2p)"]
			},
		},
	},
	darkMode: "class",
	plugins: [heroui()],
};