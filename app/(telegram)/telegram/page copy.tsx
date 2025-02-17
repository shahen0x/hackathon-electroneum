"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";

interface UserData {
	id: number;
	photo_url: string;
	first_name: string;
	last_name: string;
	username: string;
	language_code: string;
	is_premium?: boolean;
}

export default function TelegramPage() {

	const [userData, setUserData] = useState<UserData | null>(null);

	// useEffect(() => {
	// 	if (window.Telegram.WebApp) {
	// 		const webApp = window.Telegram.WebApp;
	// 		webApp.expand();
	// 		setUserData(webApp.initDataUnsafe.user);
	// 	}
	// }, []);

	useEffect(() => {
		if (WebApp.initDataUnsafe.user) {
			setUserData(WebApp.initDataUnsafe.user as UserData);
		}
	}, []);




	return (
		<>
			<p>Welcome to telegram miniapp</p>
			<p>Telegram User Id: {userData?.id}</p>
			<p>Telegram Photo Url: {userData?.photo_url}</p>
			<p>Telegram Username: {userData?.username}</p>
			<p>Telegram First Name: {userData?.first_name}</p>
			<p>Telegram Last Name: {userData?.last_name}</p>
		</>
	)
}