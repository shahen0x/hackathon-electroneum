"use client";

import { HeroUIProvider } from "@heroui/react";
import { ThirdwebProvider } from "thirdweb/react";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<>
			<HeroUIProvider>
				<ThirdwebProvider>
					{children}
				</ThirdwebProvider>
			</HeroUIProvider>
		</>
	)
}