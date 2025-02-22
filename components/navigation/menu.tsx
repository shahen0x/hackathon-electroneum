import { FC, HTMLAttributes } from "react";
import { Button } from "@heroui/button";
import { cn } from "@heroui/theme";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiList, PiGameControllerDuotone, PiHouseDuotone, PiRankingDuotone, PiListLight } from "react-icons/pi";
import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownSection,
	DropdownItem
} from "@heroui/dropdown";

interface NavbarMenuProps extends HTMLAttributes<HTMLDivElement> { }

const NavbarMenu: FC<NavbarMenuProps> = () => {

	const pathname = usePathname();

	const menuIconSize = 20;

	const menuItems = [
		{ name: "Dashboard", href: "/", icon: <PiHouseDuotone size={menuIconSize} /> },
		{ name: "Games", href: "/games", icon: <PiGameControllerDuotone size={menuIconSize} /> },
		{ name: "Rankings", href: "/rankings", icon: <PiRankingDuotone size={menuIconSize} /> },
	]

	return (
		<>
			<Dropdown backdrop="blur">
				<DropdownTrigger>
					<Button variant="bordered" isIconOnly>
						<PiListLight size={20} />
					</Button>
				</DropdownTrigger>
				<DropdownMenu aria-label="Link Actions" selectedKeys="all">
					<>
						{menuItems.map((item) => (
							<DropdownItem
								key={item.name}
								as={Link}
								href={item.href}
								startContent={item.icon}
							>
								{item.name}
							</DropdownItem>
						))}
					</>
				</DropdownMenu>
			</Dropdown>


			<div className="hidden lg:flex gap-2">
				{menuItems.map((item) => (
					<Button
						size="sm"
						key={item.name}
						as={Link}
						href={item.href}
						startContent={item.icon}
						variant={pathname.startsWith(item.href) ? "flat" : "light"}
						color={pathname.startsWith(item.href) ? "primary" : "default"}
					>
						{item.name}
					</Button>
				))}
			</div>
		</>
	)
}

export default NavbarMenu;