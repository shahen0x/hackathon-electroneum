interface MenuItem {
	name: string;
	href: string;
	icon: React.ReactNode;
}

import { PiCoinsDuotone, PiGameControllerDuotone, PiHouseDuotone, PiRankingDuotone, PiScroll } from "react-icons/pi";

const menuIconSize = 20;
export const navbarMenuItems: MenuItem[] = [
	{ name: "Dashboard", href: "/", icon: <PiHouseDuotone size={menuIconSize} /> },
	{ name: "Games", href: "/games", icon: <PiGameControllerDuotone size={menuIconSize} /> },
	{ name: "Rewards", href: "/rewards", icon: <PiCoinsDuotone size={menuIconSize} /> },
	{ name: "Litepaper", href: "/litepaper", icon: <PiScroll size={menuIconSize} /> },
	// { name: "Rankings", href: "/rankings", icon: <PiRankingDuotone size={menuIconSize} /> },
]