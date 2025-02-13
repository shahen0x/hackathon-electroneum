"use client";

import { HeroUIProvider } from "@heroui/react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ThirdwebProvider } from "thirdweb/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<>
			<HeroUIProvider>
				<ThirdwebProvider>
					<ConvexProvider client={convex}>
						{children}
					</ConvexProvider>
				</ThirdwebProvider>
			</HeroUIProvider>
		</>
	)
}