import type { MetaFunction } from "@remix-run/node";
import { appConfig } from "~/config/app";


export const meta: MetaFunction = () => {
	return [
		{ title: `Litepaper - ${appConfig.name}` },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export default function Litepaper() {

	return (
		<div className="container space-y-8 lg:space-y-8">

			<div>
				<h1 className="text-3xl font-bold">ElectroPlay Litepaper</h1>
			</div>

		</div>
	);
}