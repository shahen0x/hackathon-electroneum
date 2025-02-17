"use client";

import { getSession } from "@/utils/telegram/session"
import TelegramAuth from "../components/telegram-auth"
import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";

export default function Home() {
	const [log, setLog] = useState<URLSearchParams>()


	useEffect(() => {
		if (WebApp) {
			const initDataString = WebApp.initData;

			if (initDataString) {
				const urlParams = new URLSearchParams(initDataString);
				setLog(urlParams)

				try {
					const user = JSON.parse(urlParams.get('user') || '{}');
					if (user.id) {
						const tg = WebApp;
						tg.ready();
						tg.requestFullscreen;
						tg.enableVerticalSwipes();
						tg.enableClosingConfirmation

						tg.headerColor = "#2AB1F3";
						tg.bottomBarColor = "#ffcc00";
					}
				} catch (error) {

				}
			}
		}
	}, []);

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			{/* <pre>{JSON.stringify(session, null, 2)}</pre>
			<TelegramAuth /> */}

			<pre className=" break-words">{log}</pre>

		</main>
	)
}