import { FC } from "react";

interface BackgroundProps {

}

const Background: FC<BackgroundProps> = () => {
	return (
		<div className="fixed top-0 left-0 -z-10 w-full h-full bg-[#121214] overflow-hidden">
			{/* GRID */}
			<div className="absolute inset-0 h-full w-full bg-background/30 bg-[radial-gradient(#1a1a1c_1px,transparent_1px)] [background-size:16px_16px]" />

			<div className="absolute -top-96 -right-96 w-[60rem] h-[60rem] bg-etn/5 rounded-full blur-3xl" />
			<div className="absolute -bottom-96 -left-96 w-[40rem] h-[40rem] bg-etn/15 rounded-full blur-3xl" />
		</div>
	)
}

export default Background;