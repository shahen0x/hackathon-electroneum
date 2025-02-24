import type { MetaFunction } from "@remix-run/node";
import { api } from "convex/_generated/api";
import { useConvexAuth, useQuery } from "convex/react";
import { ConnectButton, useActiveAccount, useWalletBalance } from "thirdweb/react";
import { SignIn } from "~/components/SignIn";
import { Button } from "~/components/ui/button";
import { clientThirdweb } from "~/thirdweb/client";
import { polygon } from "thirdweb/chains";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card"
import { appConfig } from "~/config/app";


export const meta: MetaFunction = () => {
	return [
		{ title: `Dashboard - ${appConfig.name}` },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export default function Index() {

	const pools = useQuery(api.pools.getAllPools);
	const { isAuthenticated } = useConvexAuth();

	const account = useActiveAccount();
	const { data: balance, } = useWalletBalance({
		client: clientThirdweb,
		chain: polygon,
		address: account?.address,
	});


	return (
		<div className="flex items-center justify-center">
			<div className="flex flex-col items-center gap-16">
				<header className="flex flex-col items-center gap-9">
					<h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
						Welcome to <span className="sr-only">Remix</span>
					</h1>
					{pools === undefined
						? "loading..."
						: pools.map(({ _id, poolOwner }) => <div key={_id}>{poolOwner}</div>)}
					<Button onClick={() => alert("Hello!")}>Click me</Button>

					<SignIn />
					<p>{isAuthenticated ? "Authenticated" : "Not Authenticated"}</p>

					<ConnectButton client={clientThirdweb} />
					<div>
						<p>Wallet address: {account?.address}</p>
						<p>
							Wallet balance: {balance?.displayValue} {balance?.symbol}
						</p>
					</div>
				</header>

				<Card>
					<CardHeader>
						<CardTitle>Card Title</CardTitle>
						<CardDescription>Card Description</CardDescription>
					</CardHeader>
					<CardContent>
						<p>Card Content</p>
					</CardContent>
					<CardFooter>
						<p>Card Footer</p>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}