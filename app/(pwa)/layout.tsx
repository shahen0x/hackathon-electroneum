import Background from "@/components/background";
import Navbar from "@/components/navigation/navbar";
import PWABottomBar from "@/components/navigation/pwa-bottom-bar";
import PWATopBar from "@/components/navigation/pwa-top-bar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Background />
			{/* <div className="w-full h-20 bg-red-200 relative z-20"></div> */}
			{/* <PWATopBar /> */}
			<PWABottomBar />
			<main className="relative">
				{/* <main className="fixed top-14 left-0 bottom-[5.5rem] w-full overflow-y-auto py-4"> */}

				{children}
			</main>
		</>
	);
}