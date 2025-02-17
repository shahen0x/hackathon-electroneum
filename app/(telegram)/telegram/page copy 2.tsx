"use client";

import { getSession } from "@/utils/telegram/session"
import TelegramAuth from "../components/telegram-auth"
import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";
import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth } from "convex/react";

export default function Home() {
	const { signIn } = useAuthActions();
	const { isAuthenticated } = useConvexAuth();
	const [step, setStep] = useState<"signUp" | "signIn">("signIn");

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
			<form
				onSubmit={(event) => {
					event.preventDefault();
					const formData = new FormData(event.currentTarget);
					void signIn("password", formData);
				}}
			>
				<input name="email" placeholder="Email" type="text" />
				<input name="password" placeholder="Password" type="password" />
				<input name="flow" type="hidden" value={step} />
				<button type="submit">{step === "signIn" ? "Sign in" : "Sign up"}</button>
				<button
					type="button"
					onClick={() => {
						setStep(step === "signIn" ? "signUp" : "signIn");
					}}
				>
					{step === "signIn" ? "Sign up instead" : "Sign in instead"}
				</button>
			</form>

			<p>authenticated: {String(isAuthenticated)}</p>
		</main>
	)
}