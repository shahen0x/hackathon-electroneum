import type { MetaFunction } from "@remix-run/node";
import { appConfig } from "~/config/app";


export const meta: MetaFunction = () => {
	return [
		{ title: `Rankings - ${appConfig.name}` },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export default function Index() {




	return (
		<div className="flex items-center justify-center">
			rankings
		</div>
	);
}