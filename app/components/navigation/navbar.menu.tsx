import { Link, useLocation } from "@remix-run/react";
import { FC } from "react";
import { PiGameControllerDuotone, PiHouseDuotone, PiListLight, PiRankingDuotone } from "react-icons/pi";

import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "~/components/ui/navigation-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "~/components/ui/dropdown-menu";
import { Button } from "../ui/button";

interface NavbarMenuProps {

}

const NavbarMenu: FC<NavbarMenuProps> = () => {

	const location = useLocation();

	const menuIconSize = 18;

	const menuItems = [
		{ name: "Dashboard", href: "/", icon: <PiHouseDuotone size={menuIconSize} /> },
		{ name: "Games", href: "/games", icon: <PiGameControllerDuotone size={menuIconSize} /> },
		{ name: "Rankings", href: "/rankings", icon: <PiRankingDuotone size={menuIconSize} /> },
	]

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant={"outline"} size={"icon"}>
						<PiListLight size={20} />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>

					{menuItems.map((item) => (
						<DropdownMenuItem key={item.name} className="p-0">
							<Link to={item.href} className="px-3 py-2 flex items-center gap-2">
								{item.icon} {item.name}
							</Link>
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>


			<NavigationMenu className="hidden">
				<NavigationMenuList>
					{menuItems.map((item) => (
						<NavigationMenuItem key={item.name}>
							<Link to={item.href} className={`
								px-3 py-2 flex items-center gap-2 rounded-lg text-xs transition-colors
								${location.pathname === item.href || (item.href !== "/" && location.pathname.startsWith(item.href)) ? "bg-primary/20 text-etn" : "bg-transparent text-muted-foreground hover:bg-accent/50 hover:text-white"}
							`}>
								{item.icon} <span className="">{item.name}</span>
							</Link>
						</NavigationMenuItem >
					))}
				</NavigationMenuList>
			</NavigationMenu>
		</>
	)
}

export default NavbarMenu;