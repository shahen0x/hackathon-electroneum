import { Button } from "@heroui/button";
import { cn } from "@heroui/theme";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, HTMLAttributes } from "react";
import { PiGameControllerDuotone, PiHouseDuotone, PiHouseLine, PiHouseLineDuotone, PiHouseLineLight, PiRankingDuotone } from "react-icons/pi";

interface NavbarMenuProps extends HTMLAttributes<HTMLDivElement> { }

const NavbarMenu: FC<NavbarMenuProps> = ({ className }) => {

	const pathname = usePathname();

	return (
		<div className={cn("flex gap-2", className)}>
			<Button
				size="sm"
				as={Link} href="/"
				startContent={<PiHouseDuotone size={20} />}
				variant={pathname === "/" ? "flat" : "light"}
				color={pathname === "/" ? "primary" : "default"}
			>
				Home
			</Button>

			<Button
				size="sm"
				as={Link} href="/games"
				startContent={<PiGameControllerDuotone size={20} />}
				variant={pathname === "/games" ? "flat" : "light"}
				color={pathname === "/games" ? "primary" : "default"}
			>
				Games
			</Button>

			<Button
				size="sm"
				as={Link} href="/rankings"
				startContent={<PiRankingDuotone size={20} />}
				variant={pathname === "/rankings" ? "flat" : "light"}
				color={pathname === "/rankings" ? "primary" : "default"}
			>
				Rankings
			</Button>
			{/* <Link href="/">
				<PiHouseLineLight size={24} />
				<span>Home</span>
			</Link>
			<Link href="/about">Compete</Link> */}
		</div>
	)
}

export default NavbarMenu;