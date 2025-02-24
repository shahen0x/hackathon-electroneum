interface MenuItem {
	name: string;
	href: string;
	icon: React.ReactNode;
}

import { PiGameControllerDuotone, PiHouseDuotone, PiRankingDuotone } from "react-icons/pi";

const menuIconSize = 18;
export const navbarMenuItems: MenuItem[] = [
	{ name: "Dashboard", href: "/", icon: <PiHouseDuotone size={menuIconSize} /> },
	{ name: "Games", href: "/games", icon: <PiGameControllerDuotone size={menuIconSize} /> },
	{ name: "Rankings", href: "/rankings", icon: <PiRankingDuotone size={menuIconSize} /> },
]