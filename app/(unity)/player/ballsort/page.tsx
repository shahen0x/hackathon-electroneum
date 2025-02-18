"use client";

import { Unity, useUnityContext } from "react-unity-webgl";
import { UnityLoader } from "../_components/unity-loader";
import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";

export default function BallsortPlayer() {

	const router = useRouter();

	const baseUrl = process.env.NEXT_PUBLIC_GAME_BASEURL!;
	// const baseUrl = "/games";
	const gameName = "ballsort";

	const {
		unityProvider,
		isLoaded,
		loadingProgression,
		requestFullscreen,
		addEventListener,
		removeEventListener,
		sendMessage
	} = useUnityContext({
		companyName: "Cryptark",
		productName: gameName,
		productVersion: "1.0.0",
		loaderUrl: `${baseUrl}/${gameName}/game/Build/${gameName}.loader.js`,
		dataUrl: `${baseUrl}/${gameName}/game/Build/${gameName}.data`,
		frameworkUrl: `${baseUrl}/${gameName}/game/Build/${gameName}.framework.js`,
		codeUrl: `${baseUrl}/${gameName}/game/Build/${gameName}.wasm`,
		streamingAssetsUrl: `${baseUrl}/${gameName}/game/StreamingAssets`,
	});

	const [devicePixelRatio, setDevicePixelRatio] = useState(
		typeof window !== "undefined" ? window.devicePixelRatio : 1
	);

	useEffect(() => {
		if (typeof window === "undefined") return;

		const updateDevicePixelRatio = () => {
			setDevicePixelRatio(window.devicePixelRatio);


		};

		const mediaMatcher = window.matchMedia(`(min-resolution: ${window.devicePixelRatio}dppx)`);
		mediaMatcher.addEventListener("change", updateDevicePixelRatio);

		window.addEventListener("resize", updateDevicePixelRatio);

		return () => {
			mediaMatcher.removeEventListener("change", updateDevicePixelRatio);
			window.removeEventListener("resize", updateDevicePixelRatio);
		};
	}, [devicePixelRatio]);

	return (
		<>
			<UnityLoader isLoaded={isLoaded} loadingProgression={loadingProgression} />
			<Unity
				id="UnityPlayer"
				unityProvider={unityProvider}
				devicePixelRatio={devicePixelRatio}
				className="game fixed z-10 top-0 left-0 w-full h-full"
			/>
			{/* <Button onPress={() => router.back()} className="fixed bottom-2 left-2 z-50">Exit</Button> */}
			<a href="/telegram" className="fixed bottom-2 left-2 z-50"> BACK HOME</a>
		</>
	)
}