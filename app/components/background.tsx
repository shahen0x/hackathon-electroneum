import { FC } from "react";

interface BackgroundProps {

}

const Background: FC<BackgroundProps> = () => {
	return (
		<div className="fixed top-0 left-0 -z-10 w-full h-full bg-[#121214] overflow-hidden">

			<div className="absolute inset-0 h-full w-full bg-[#121214] bg-[radial-gradient(#1a1a1c_1px,transparent_1px)] [background-size:16px_16px]" />
			{/* First gradient - bottom right */}
			{/* <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" /> */}

			{/* Second gradient - bottom */}
			{/* <div className="absolute -bottom-40 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl" /> */}

			<div className="absolute -top-96 -right-96 w-[70rem] h-[70rem] bg-[#7828C8]/5 rounded-full blur-[80px]" />
			{/* Third gradient - bottom left */}
			{/* <div className="absolute -bottom-96 -left-96 w-[40rem] h-[40rem] bg-[#24BEE2]/10 rounded-full blur-3xl" /> */}
			{/* <div className="absolute -bottom-96 -left-96 w-[70rem] h-[70rem] bg-[#24BEE2]/5 rounded-full blur-3xl" /> */}
		</div>
	)
}

export default Background;