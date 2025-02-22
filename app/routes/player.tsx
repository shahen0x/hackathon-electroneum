import { Outlet } from "@remix-run/react";

export default function Player() {
	return (
		<div className="bg-[#231F20]">
			<Outlet />
		</div>
	)
}