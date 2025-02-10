import { Button } from "@heroui/button";
import Link from "next/link";
import { PiCaretLeft, PiCaretLeftDuotone, PiCornersOut, PiHeart, PiHeartDuotone } from "react-icons/pi";

export default function GamePage() {

	return (
		<section className="container space-y-6">

			<header className="flex items-center justify-between">
				<div className="flex items-center gap-6">
					<Button isIconOnly as={Link} href="/" variant="flat">
						<PiCaretLeft size={20} />
					</Button>
					<h1 className="text-2xl font-start2p">Blitzer</h1>
				</div>

				<div className="flex items-center gap-2">
					<Button variant="flat" size="sm" color="danger">
						<PiHeart size={20} /> 30
					</Button>
					<Button variant="flat" size="sm">
						<PiCornersOut size={20} /> Fullscreen
					</Button>
				</div>
			</header>

			<div className="aspect-video rounded-3xl bg-[#231F20]">
				<iframe src="http://localhost:3000/player/blitzer" className="aspect-video w-full rounded-3xl" />
			</div>
		</section>
	)
}