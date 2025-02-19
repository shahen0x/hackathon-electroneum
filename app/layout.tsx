import type { Metadata, Viewport } from "next";
import "./globals.css";
import Providers from "./providers";
import { appConfig } from "@/config/app";
import { fontSans, fontStart2P } from "@/config/fonts";



export const metadata: Metadata = {
	applicationName: appConfig.name,
	title: {
		default: appConfig.name,
		template: `%s - ${appConfig.name}`,
	},
	description: appConfig.description,
	manifest: "/manifest.json",

	formatDetection: {
		telephone: false,
	},
	icons: {
		apple: [{ url: "icons/512x512.png" }],
		icon: [{
			url: "icons/512x512.png",
			sizes: "512x512",
			type: "image/png"
		}]
	},
	appleWebApp: {
		capable: true,
		statusBarStyle: "black",
		title: appConfig.name,
		startupImage: [{
			url: "/icons/512x512.png"
		}],
	},
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
	// themeColor: "#000000",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dark bg-[#121214]" suppressHydrationWarning>
			<body className={`${fontSans.variable} ${fontStart2P.variable}`}>
				<Providers>
					{children}
				</Providers>
			</body>
		</html>
	);
}
