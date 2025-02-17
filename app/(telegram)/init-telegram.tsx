"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { useTelegramStore } from "@/store/use-telegram-store";
import { useAuthActions } from "@convex-dev/auth/react";
import { useConvex, useConvexAuth } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function InitTelegram({ children }: { children: React.ReactNode }) {

	const telegramStore = useTelegramStore();
	const [WebApp, setWebApp] = useState<any>(null);

	const { signIn } = useAuthActions();
	const { isAuthenticated, isLoading } = useConvexAuth();
	const convex = useConvex();




	// Initialize Telegram WebApp
	//
	useLayoutEffect(() => {
		// Ensure we're in the browser
		if (typeof window === "undefined") return;

		// Dynamically import WebApp
		import("@twa-dev/sdk").then((module) => {
			const WebApp = module.default;
			setWebApp(WebApp);

			// Set overflow hidden on the html element
			document.documentElement.style.setProperty("overflow", "hidden");

			if (WebApp) {
				// Get Telegram initData
				const initDataString = WebApp.initData;

				// Set telegram init data in the store
				telegramStore.setTelegramInitData(initDataString);

				if (initDataString) {
					const urlParams = new URLSearchParams(initDataString);
					try {
						const user = JSON.parse(urlParams.get("user") || "{}");
						if (user.id) {
							WebApp.disableVerticalSwipes();
							WebApp.requestFullscreen();
							WebApp.enableClosingConfirmation();
							WebApp.isOrientationLocked = true;
							WebApp.colorScheme = "dark";
							WebApp.expand();
							WebApp.ready();
						}
					} catch (error) {
						console.error("Error parsing Telegram init data:", error);
					}
				}
			}
		});
	}, []);


	// Authenticate user
	//
	useEffect(() => {
		if (isLoading || isAuthenticated) return;

		if (telegramStore.telegramInitData) {
			const formData = {
				telegramInitData: telegramStore.telegramInitData
			}
			void signIn("telegramAuth", formData);
		}
	}, [telegramStore.telegramInitData, isLoading, isAuthenticated]);


	// Fetch user data
	const fetchUserData = async () => {
		return await convex.query(api.authUser.currentUser);
	};

	useEffect(() => {
		if (isAuthenticated) {
			telegramStore.setIsAuthenticated(true);
			fetchUserData().then((user) => {
				telegramStore.setUserData(user);
			});
		}
	}, [isAuthenticated]);



	if (!WebApp) {
		return "Loading...";
	}

	if (isLoading) {
		return "Authenticating user...";
	}

	if (!isAuthenticated) {
		return "Authenticating user 2";
	}

	return children;
};
