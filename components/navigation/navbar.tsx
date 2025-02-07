import { FC } from "react";
import NavbarMenu from "./menu";

interface NavbarProps {

}

const Navbar: FC<NavbarProps> = () => {
	return (
		<nav className="fixed top-0 left-0 z-40 w-full h-20">
			<div className="container">
				<div className="flex items-center justify-between">

					<div>ElectroPlay</div>
					<NavbarMenu />

				</div>
			</div>
		</nav>
	)
}

export default Navbar;