"use client";

import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";
import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth } from "convex/react";
import { Button } from "@heroui/button";

export default function Home() {
	const { signIn, signOut } = useAuthActions();
	const { isAuthenticated } = useConvexAuth();

	const [telegramInitData, setTelegramInitData] = useState<string>()


	useEffect(() => {
		if (WebApp) {
			const initDataString = WebApp.initData;
			setTelegramInitData(initDataString);

			if (initDataString) {
				const urlParams = new URLSearchParams(initDataString);
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


	const handleAuthentication = async () => {
		if (telegramInitData) {
			const formData = {
				telegramInitData: telegramInitData
			}
			void signIn("telegramAuth", formData);
		}
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<p>authenticated: {String(isAuthenticated)}</p>
			<Button onPress={handleAuthentication}>Authenticate</Button>
			<Button onPress={signOut}>Sign Out</Button>
		</main>
	)
}