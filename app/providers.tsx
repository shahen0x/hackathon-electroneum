"use client";

import { HeroUIProvider } from "@heroui/react";

import { ConvexReactClient } from "convex/react";
import { ConvexAuthProvider } from "@convex-dev/auth/react";

import { ThirdwebProvider } from "thirdweb/react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Convex
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// React Quary
const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<>
			<HeroUIProvider>
				<ThirdwebProvider>
					<ConvexAuthProvider client={convex}>
						<QueryClientProvider client={queryClient}>
							{children}
						</QueryClientProvider>
					</ConvexAuthProvider>
				</ThirdwebProvider>
			</HeroUIProvider>
		</>
	)
}