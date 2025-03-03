import { FC, useState } from "react";
import { Link, useLocation } from "@remix-run/react";

import { navbarMenuItems } from "~/config/menus";

import { PiListLight, PiSkullDuotone, PiSkullFill } from "react-icons/pi";

import { Button } from "~/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "~/components/ui/navigation-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "~/components/ui/dropdown-menu";
import { appSocials } from "~/config/app";
import { FaTelegram, FaXTwitter, FaSkullCrossbones } from "react-icons/fa6";

interface NavbarMenuProps { }

const NavbarMenu: FC<NavbarMenuProps> = () => {

	// Hooks
	const location = useLocation();

	// States
	const [isOpen, setIsOpen] = useState(false);

	const handleLinkClick = () => {
		setTimeout(() => {
			setIsOpen(false);
		}, 300);
	};

	const handleBackdropClick = () => {
		setIsOpen(false); // Close dropdown if backdrop is clicked
	};

	return (
		<>
			{/* MOBILE MENU */}

			{isOpen &&
				<button
					onClick={handleBackdropClick}
					className="fixed z-10 inset-0 transition-all backdrop-blur-sm bg-black/10"
				/>
			}

			<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
				<DropdownMenuTrigger className="lg:hidden" asChild>
					<Button variant={"outline"} size={"icon"}>
						<PiListLight size={20} />
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent className="min-w-40 space-y-1">
					{navbarMenuItems.map((item) => (
						<DropdownMenuItem key={item.name} className="p-0 focus:bg-transparent">
							<Link
								to={item.href}
								className={`
									w-full px-3 py-2 flex items-center gap-2 rounded-lg transition-colors
									${location.pathname === item.href || (item.href !== "/" && location.pathname.startsWith(item.href)) ? "bg-primary/20 text-etn" : "bg-transparent text-muted-foreground hover:bg-accent/50 hover:text-white"}	
								`}
								onClick={handleLinkClick}
							>
								{item.icon} {item.name}
							</Link>
						</DropdownMenuItem>
					))}

					<DropdownMenuSeparator />

					<DropdownMenuItem className="p-0 focus:bg-transparent">
						<a href={appSocials.twitter} className="w-full px-3 py-2 flex items-center gap-2" target="_blank" rel="noreferrer">
							<FaXTwitter size={16} /> Twitter
						</a>
					</DropdownMenuItem>

					<DropdownMenuItem className="p-0 focus:bg-transparent">
						<a href={appSocials.telegram} className="w-full px-3 py-2 flex items-center gap-2" target="_blank" rel="noreferrer">
							<FaTelegram size={16} /> Telegram
						</a>
					</DropdownMenuItem>

				</DropdownMenuContent>
			</DropdownMenu>


			{/* DESKTOP MENU */}
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

					{/* <NavigationMenuItem>
						<button className={`
								px-3 py-2 flex items-center gap-2 rounded-lg text-xs transition-colors
								bg-transparent text-orange-400 hover:bg-accent/50 hover:text-white
							`}>
							<FaSkullCrossbones size={16} /> <span className="">ROYALE</span>
						</button>
					</NavigationMenuItem > */}
				</NavigationMenuList>
			</NavigationMenu>
		</>
	)
}

export default NavbarMenu;