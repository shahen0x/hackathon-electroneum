import Background from "@/components/background";
import Navbar from "@/components/navigation/navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Background />
			<Navbar />
			<main className="pt-20">
				{children}
			</main>
		</>
	);
}