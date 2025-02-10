import Background from "@/components/background";
import Navbar from "@/components/navigation/navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Background />
			<Navbar />
			<main className="relative z-30 pt-28">
				{children}
			</main>
		</>
	);
}