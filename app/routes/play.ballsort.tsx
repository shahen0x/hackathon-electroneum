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

	// '{"specs":[{"levels":[{"ta":8,"bd":"414353355124662461162352"},{"ta":9,"bd":"4571576365427122332761156443"},{"ta":10,"bd":"65514323273782867511652416487384"},{"ta":11,"bd":"467143428275311249758633192765889596"},{"ta":12,"bd":"759932382259617647186127441359588436"},{"ta":13,"bd":"391588599821564a4636a329a78136777a544212"},{"ta":14,"bd":"51492763784286265b98a5b9753ba4a61b873a131294"},{"ta":15,"bd":"2c3a56c5144b43b19217a526a47937935188bb9a786628cc"}]},{"levels":[{"ta":8,"bd":"162652244144135365361523"},{"ta":9,"bd":"2463561431371362172544675257"},{"ta":10,"bd":"46434522131735188637267714286585"},{"ta":11,"bd":"453588184263927269196121679573445783"},{"ta":12,"bd":"342157679251358931852987678623946441"},{"ta":13,"bd":"68755a766a153284931312a3124649889a427975"},{"ta":14,"bd":"7a4915a8b32256816148b837a1649623257b47a9935b"},{"ta":15,"bd":"32c49a8868a71a4bb285a6163659c1b44c1279755b72933c"}]},{"levels":[{"ta":8,"bd":"463351326422651251564143"},{"ta":9,"bd":"2477653217214436151674535326"},{"ta":10,"bd":"34547437152521662658826748387311"},{"ta":11,"bd":"559546774897983148712923361235266184"},{"ta":12,"bd":"297433123118255749929758746358616468"},{"ta":13,"bd":"7315756483623446225959a8a81139481a77296a"},{"ta":14,"bd":"a4381724193b597839a8195675ba617a4282263b4b65"},{"ta":15,"bd":"c85c1927867b3caa8a375416b242249516a367599b4c183b"}]}]}'
	// '{"specs":[{"levels":[{"ta":8,"bd":"414353355124662461162352"},{"ta":9,"bd":"4571576365427122332761156443"},{"ta":10,"bd":"65514323273782867511652416487384"},{"ta":11,"bd":"467143428275311249758633192765889596"},{"ta":12,"bd":"759932382259617647186127441359588436"},{"ta":13,"bd":"391588599821564a4636a329a78136777a544212"},{"ta":14,"bd":"51492763784286265b98a5b9753ba4a61b873a131294"},{"ta":15,"bd":"2c3a56c5144b43b19217a526a47937935188bb9a786628cc"}]},{"levels":[{"ta":8,"bd":"162652244144135365361523"},{"ta":9,"bd":"2463561431371362172544675257"},{"ta":10,"bd":"46434522131735188637267714286585"},{"ta":11,"bd":"453588184263927269196121679573445783"},{"ta":12,"bd":"342157679251358931852987678623946441"},{"ta":13,"bd":"68755a766a153284931312a3124649889a427975"},{"ta":14,"bd":"7a4915a8b32256816148b837a1649623257b47a9935b"},{"ta":15,"bd":"32c49a8868a71a4bb285a6163659c1b44c1279755b72933c"}]},{"levels":[{"ta":8,"bd":"463351326422651251564143"},{"ta":9,"bd":"2477653217214436151674535326"},{"ta":10,"bd":"34547437152521662658826748387311"},{"ta":11,"bd":"559546774897983148712923361235266184"},{"ta":12,"bd":"297433123118255749929758746358616468"},{"ta":13,"bd":"7315756483623446225959a8a81139481a77296a"},{"ta":14,"bd":"a4381724193b597839a8195675ba617a4282263b4b65"},{"ta":15,"bd":"c85c1927867b3caa8a375416b242249516a367599b4c183b"}]}]}'
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