"use client";

import Background from "@/components/background";
import Navbar from "@/components/navigation/navbar";
import Script from "next/script";
// import WebApp from '@twa-dev/sdk';
// import { useEffect } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {

	return (
		<>
			<Script
				src="https://telegram.org/js/telegram-web-app.js"
				strategy="beforeInteractive"
			/>
			<Background />
			{/* <Navbar /> */}
			<main className="relative z-30 pt-[4.5rem] sm:pt-[5.5rem] lg:pt-28">
				{children}
			</main>
		</>
	);
}