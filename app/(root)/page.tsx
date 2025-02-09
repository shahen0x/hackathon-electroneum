"use client";

import { Button } from "@heroui/button";
import { Card } from "@heroui/react";
import { Image } from "@heroui/image";
import NextImage from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<div className="container">
			<div className="grid grid-cols-4 gap-6">

				<Link href={"/game"}>
					<Image
						as={NextImage}
						isBlurred
						src={`/poster-blitzer.jpg`}
						alt="Blitzer"
						width={680}
						height={200}
						className="h-auto transition-all border-2 border-transparent hover:border-violet-500"
					/>
				</Link>
				<Link href={"/game"}>
					<Image
						as={NextImage}
						isBlurred
						src={`/poster-ballsort.jpg`}
						alt="Blitzer"
						width={680}
						height={200}
						className="h-auto transition-all border-2 border-transparent hover:border-violet-500"
					/>
				</Link>
				<Link href={"/game"}>
					<Image
						as={NextImage}
						isBlurred
						src={`/poster-spacefarer.jpg`}
						alt="Blitzer"
						width={680}
						height={200}
						className="h-auto transition-all border-2 border-transparent hover:border-violet-500"
					/>
				</Link>
				<Link href={"/game"}>
					<Image
						as={NextImage}
						isBlurred
						src={`/poster-matchtwo.jpg`}
						alt="Blitzer"
						width={680}
						height={200}
						className="h-auto transition-all border-2 border-transparent hover:border-violet-500"
					/>
				</Link>
			</div>
		</div>
	);
}