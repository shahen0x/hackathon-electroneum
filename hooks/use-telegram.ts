import { useEffect, useState } from "react";

declare global {
	interface Window {
		Telegram: any;
	}
}

export function useTelegram() {
	const [user, setUser] = useState<any>(null);

	useEffect(() => {
		if (window.Telegram?.WebApp) {
			const webApp = window.Telegram.WebApp;
			webApp.expand(); // Expand the app to full height
			setUser(webApp.initDataUnsafe.user);
		}
	}, []);

	return { user };
}