import { cn } from "@heroui/theme";
import Link from "next/link";
import { FC, HTMLAttributes } from "react";

interface NavbarMenuProps extends HTMLAttributes<HTMLDivElement> { }

const NavbarMenu: FC<NavbarMenuProps> = ({ className }) => {
	return (
		<div className={cn("flex gap-6", className)}>
			<Link href="/">Home</Link>
			<Link href="/about">Compete</Link>
		</div>
	)
}

export default NavbarMenu;