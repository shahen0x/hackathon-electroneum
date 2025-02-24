import { Outlet } from "@remix-run/react";

export default function Layout() {
	return (
		<main className="relative z-30 pt-[4.5rem] sm:pt-[5.5rem] lg:pt-28">
			<Outlet />
		</main>
	)
}