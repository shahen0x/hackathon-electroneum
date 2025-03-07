import { MetaFunction } from "@remix-run/node";
import { useMutation } from "convex/react";
import { ConvexError } from "convex/values";
import { useCallback, useEffect, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { UnityLoader } from "~/components/unity/unity-loader";
import { api } from "~/convex/_generated/api";

export const meta: MetaFunction = () => {
	return [
		{ title: "Ballsort" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export default function Ballsort() {

	// States
	const [requestAccess, setRequestAccess] = useState(false);
	const [requestSubmission, setRequestSubmission] = useState(false);
	const [gameData, setGameData] = useState<any>(null);

	// Convex
	const verifyCompetitionAccess = useMutation(api.compete.verifyCompetitionAccess);
	const submitScore = useMutation(api.compete.submitScore);



	// GAME
	const baseUrl = "https://cdn.electroplay.fun/games";
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
		companyName: "ElectroPlay",
		productName: gameName,
		productVersion: "1.0.0",
		loaderUrl: `${baseUrl}/${gameName}/game/${gameName}.loader.js`,
		dataUrl: `${baseUrl}/${gameName}/game/${gameName}.data`,
		frameworkUrl: `${baseUrl}/${gameName}/game/${gameName}.framework.js`,
		codeUrl: `${baseUrl}/${gameName}/game/${gameName}.wasm`,
	});


	// DEVICE PIXEL RATIO
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




	/**
	 * HANDLE COMPETITION MODE ACCESS VERIFICATION
	 */

	// Receive verification request from game
	const receivedFetchEvent = useCallback(() => {
		setRequestAccess(true);
	}, []);

	useEffect(() => {
		addEventListener("FetchCompetitionConfig", receivedFetchEvent);
		return () => removeEventListener("FetchCompetitionConfig", receivedFetchEvent);
	}, [addEventListener, removeEventListener, receivedFetchEvent]);


	// Send verification results to game
	useEffect(() => {
		if (requestAccess) {
			const verify = async () => {
				try {
					const gameConfig = await verifyCompetitionAccess({ gameName: "ballsort" });
					sendMessage("MainMenuManager", "SetCompetitionConfig", gameConfig)
				} catch (error: any) {
					const errorMessage = error instanceof ConvexError ? (error.data as { message: string }).message : error.message;
					sendMessage("MainMenuManager", "ErrorFetchingConfig", errorMessage as string)
				} finally {
					setRequestAccess(false);
				}
			}
			verify();
		}
	}, [requestAccess]);






	/**
	  * SCORE SUBMISSION
	  */
	// Receive verification request from game
	const receiveSubmitEvent = useCallback((gameData: any) => {
		setGameData(gameData);
		setRequestSubmission(true);
	}, []);

	useEffect(() => {
		addEventListener("SubmitGameData", receiveSubmitEvent);
		return () => removeEventListener("SubmitGameData", receiveSubmitEvent);
	}, [addEventListener, removeEventListener, receiveSubmitEvent]);


	// Send verification results to game
	useEffect(() => {
		if (requestSubmission) {
			const verify = async () => {
				try {
					const result = await submitScore({ gameName: "ballsort", gameData: gameData });
					console.log(result);
					sendMessage("GameManager", "SubmissionSuccess")
				} catch (error: any) {
					const errorMessage = error instanceof ConvexError ? (error.data as { message: string }).message : error.message;
					sendMessage("GameManager", "SubmissionFailure", errorMessage as string)
				} finally {
					setRequestSubmission(false);
				}
			}
			verify();
		}
	}, [requestSubmission, gameData]);


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
			{/* <a href="http://192.168.100.92:3000/" className="fixed bottom-2 left-2 z-50"> BACK HOME</a> */}
		</>
	);
}