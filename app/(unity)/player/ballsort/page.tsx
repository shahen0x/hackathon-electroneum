"use client";

import { Unity, useUnityContext } from "react-unity-webgl";
import { UnityLoader } from "../_components/unity-loader";
import { useEffect, useState } from "react";

export default function BallsortPlayer() {

	const baseUrl = "/games/";
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
		window.devicePixelRatio
	);

	useEffect(
		function () {
			// A function which will update the device pixel ratio of the Unity
			// Application to match the device pixel ratio of the browser.
			const updateDevicePixelRatio = function () {
				setDevicePixelRatio(window.devicePixelRatio);
			};
			// A media matcher which watches for changes in the device pixel ratio.
			const mediaMatcher = window.matchMedia(
				`screen and (resolution: ${devicePixelRatio}dppx)`
			);
			// Adding an event listener to the media matcher which will update the
			// device pixel ratio of the Unity Application when the device pixel
			// ratio changes.
			mediaMatcher.addEventListener("change", updateDevicePixelRatio);
			return function () {
				// Removing the event listener when the component unmounts.
				mediaMatcher.removeEventListener("change", updateDevicePixelRatio);
			};
		},
		[devicePixelRatio]
	);

	return (
		<>
			<UnityLoader isLoaded={isLoaded} loadingProgression={loadingProgression} />
			<Unity
				id="UnityPlayer"
				unityProvider={unityProvider}
				devicePixelRatio={devicePixelRatio}
				className="game fixed top-0 left-0 w-full h-full"
			/>
		</>
	)
}