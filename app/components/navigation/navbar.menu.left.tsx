/**
 * NAVIGATION MENU LEFT
 * 
 */
import { Link, useLocation } from "@remix-run/react";
import { navbarMenuItems } from "~/config/menus";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "~/components/ui/navigation-menu";


const NavbarMenuLeft = () => {

	// Hooks
	const location = useLocation();


	return (
		<NavigationMenu className="hidden lg:block">
			<NavigationMenuList>
				{navbarMenuItems.map((item) => (
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
	)
}

export default NavbarMenuLeft;