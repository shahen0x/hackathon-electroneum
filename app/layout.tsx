import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import { appConfig } from "@/config/app";
import { fontSans } from "@/config/fonts";



export const metadata: Metadata = {
	title: {
		default: appConfig.name,
		template: `%s - ${appConfig.name}`,
	},
	description: appConfig.description,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dark bg-[#121214]">
			<body className={fontSans.className}>
				<Providers>
					{children}
				</Providers>
			</body>
		</html>
	);
}
