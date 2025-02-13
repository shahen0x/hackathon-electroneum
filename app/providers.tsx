"use client";

import { HeroUIProvider } from "@heroui/react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ThirdwebProvider } from "thirdweb/react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Convex
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// React Quary
const queryClient = new QueryClient()

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<>
			<HeroUIProvider>
				<ThirdwebProvider>
					<ConvexProvider client={convex}>
						<QueryClientProvider client={queryClient}>
							{children}
						</QueryClientProvider>
					</ConvexProvider>
				</ThirdwebProvider>
			</HeroUIProvider>
		</>
	)
}