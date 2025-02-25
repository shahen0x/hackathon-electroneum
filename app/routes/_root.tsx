import { Outlet } from "@remix-run/react";

export default function Layout() {
	return (
		<main className="relative z-30 pt-[4.6rem] sm:pt-[5.5rem] lg:pt-28 pb-6">
			<Outlet />
		</main>
	)
}