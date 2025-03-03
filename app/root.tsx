import "./tailwind.css";

import { useState } from "react";
import { json, Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData, } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import DataCycle from "./data/data.cycle";
import { ConvexReactClient } from "convex/react";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThirdwebProvider } from "thirdweb/react";
import Background from "./components/background";
import Navbar from "./components/navigation/navbar";
import { Toaster } from 'react-hot-toast';

export const links: LinksFunction = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap",
	},
];

export async function loader() {
	const CONVEX_URL = process.env["CONVEX_URL"]!;
	return json({ ENV: { CONVEX_URL } });
}

export function Layout({ children }: { children: React.ReactNode }) {

	// Init convex client
	const { ENV } = useLoaderData<typeof loader>();
	const [convex] = useState(() => new ConvexReactClient(ENV.CONVEX_URL));

	// Init query client
	const queryClient = new QueryClient();

	return (
		<html lang="en" className="dark">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
				<Meta />
				<Links />
			</head>
			<body>
				<Background />
				<Toaster />

				<QueryClientProvider client={queryClient}>
					<ConvexAuthProvider client={convex}>
						<ThirdwebProvider>

							<DataCycle />
							<Navbar />
							{children}

						</ThirdwebProvider>
					</ConvexAuthProvider>
				</QueryClientProvider>

				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}
