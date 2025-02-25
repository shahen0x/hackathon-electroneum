import "./tailwind.css";

import { json, Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData, } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";


import { ConvexReactClient } from "convex/react";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { useState } from "react";
import { ThirdwebProvider } from "thirdweb/react";
import Background from "./components/background";
import Navbar from "./components/navigation/navbar";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
	const { ENV } = useLoaderData<typeof loader>();
	const [convex] = useState(() => new ConvexReactClient(ENV.CONVEX_URL));

	const queryClient = new QueryClient();

	return (
		<html lang="en" className="dark">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<Background />
				<QueryClientProvider client={queryClient}>
					<ConvexAuthProvider client={convex}>
						<ThirdwebProvider>
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
