"use client";

import { Unity, useUnityContext } from "react-unity-webgl";
import { UnityLoader } from "../_components/unity-loader";

export default function BlitzerPlayer() {

	const baseUrl = "/games/";
	const gameName = "blitzer";

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

	return (
		<>
			<UnityLoader isLoaded={isLoaded} loadingProgression={loadingProgression} />
			<Unity id="UnityPlayer" className="w-full h-screen object-contain aspect-video" unityProvider={unityProvider} />
		</>
	)
}