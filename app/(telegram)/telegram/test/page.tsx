import { Button } from "@heroui/button";
import Head from "next/head";
import Link from "next/link";

export default function TestPage() {
	return (
		<>

			<div className="flex flex-col items-center justify-center">
				<h1 className="text-3xl font-bold mb-4">Test Page</h1>
				<p className="text-xl">Welcome to the test page! Only authenticated users can see this.</p>
				<Button as={Link} href="/telegram/">Go back</Button>
			</div>
		</>
	)
}