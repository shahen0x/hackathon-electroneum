export default function GamePage() {

	return (
		<section className="container space-y-6">

			<header className="flex items-center justify-between">
				<h1 className="text-2xl font-start2p">Blitzer</h1>
			</header>

			<div className="aspect-video rounded-3xl bg-[#231F20]">
				<iframe src="http://localhost:3000/player/blitzer" className="aspect-video w-full rounded-3xl" />
			</div>
		</section>
	)
}