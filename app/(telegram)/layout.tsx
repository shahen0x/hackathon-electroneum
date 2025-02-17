import Background from "@/components/background";
import Script from "next/script";
import BottomBar from "./components/bottom-bar";
import InitTelegram from "./init-telegram";

export default function RootLayout({ children }: { children: React.ReactNode }) {

	return (
		<>
			<Script
				src="https://telegram.org/js/telegram-web-app.js"
				strategy="beforeInteractive"
			/>
			<InitTelegram>

				<Background />
				<BottomBar />
				<main className="relative z-30 h-[calc(100vh_-_80px)] overflow-hidden m-0 p-0">
					{children}
				</main>
			</InitTelegram>
		</>
	);
}