import type { MetaFunction } from "@remix-run/node";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { appConfig } from "~/config/app";


export const meta: MetaFunction = () => {
	return [
		{ title: `Claim Rewards - ${appConfig.name}` },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export default function Rewards() {




	return (
		<div className="max-w-lg mx-auto space-y-8 lg:space-y-8">
			<Card>
				<CardHeader className="relative z-10 space-y-1 border-b">
					<CardTitle className="flex items-center gap-3 font-pixel text-md">
						Gaming Week #0
					</CardTitle>
					<CardDescription className="flex items-center gap-2 text-sm">
						6 to 10 February 2025
					</CardDescription>
				</CardHeader>
				<CardContent className="pt-4">
					test
				</CardContent>
			</Card>
		</div>
	);
}