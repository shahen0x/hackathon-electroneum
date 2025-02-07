import Link from "next/link";
import { FC } from "react";

interface NavbarMenuProps {

}

const NavbarMenu: FC<NavbarMenuProps> = () => {
	return (
		<div className="bg-zinc-900">
			<Link href="/">Home</Link>
			<Link href="/about">Compete</Link>
		</div>
	)
}

export default NavbarMenu;