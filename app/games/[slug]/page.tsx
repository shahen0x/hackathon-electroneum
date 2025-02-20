export default function GamePage() {

	return (
		<div className="overflow-hidden w-fit h-full aspect-video rounded-2xl bg-[#231F20] border border-neutral-800">
			<iframe
				src="http://localhost:3000/player/ballsort"
				className="w-full h-full"
			/>
		</div>
	)
}