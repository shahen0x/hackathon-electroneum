/**
 * NAVIGATION MENU MOBILE
 * Shows an icon button on mobile and opens a dropdown menu
 * 
 */
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { PiListLight } from "react-icons/pi";
import { Link, useLocation } from "@remix-run/react";
import { FaTelegram, FaXTwitter } from "react-icons/fa6";
import { appSocials } from "~/config/app";
import { navbarMenuItems } from "~/config/menus";


const NavbarMenuMobile = () => {

	// Hooks
	const location = useLocation();

	// States
	const [isOpen, setIsOpen] = useState(false);


	// Close dropdown on link click
	//
	const handleLinkClick = () => {
		setTimeout(() => {
			setIsOpen(false);
		}, 300);
	};


	// Close dropdown on backdrop click
	//
	const handleBackdropClick = () => {
		setIsOpen(false);
	};


	return (
		<>
			{/* Backdrop */}
			{isOpen && <button onClick={handleBackdropClick} className="fixed z-10 inset-0 transition-all backdrop-blur-sm bg-black/10" />}

			<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>

				<DropdownMenuTrigger className="lg:hidden" asChild>
					<Button variant={"outline"} size={"icon"}>
						<PiListLight size={21} />
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
		</>
	)
}

export default NavbarMenuMobile;