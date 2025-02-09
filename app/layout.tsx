import type { Metadata } from "next";
import { Saira } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { appConfig } from "@/config/app";

const font = Saira({ subsets: ["latin"] });

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
			<body className={font.className}>
				<Providers>
					{children}
				</Providers>
			</body>
		</html>
	);
}
