import { FC } from "react";

interface UnityLoaderProps {
	isLoaded: boolean;
	loadingProgression: number;
}

export const UnityLoader: FC<UnityLoaderProps> = ({ isLoaded, loadingProgression }) => {
	return !isLoaded ? (
		<div className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-[#231F20]">
			<div className="max-w-72 md:max-w-md w-full">

				<div className="mb-2 text-center text-3xl md:text-4xl font-thin">
					{Math.round(loadingProgression * 100)}%
				</div>

				{/* <Progress
					aria-label="Loading..."
					color="secondary"
					value={loadingProgression * 100}
					className="max-w-md"
				/> */}

			</div>
		</div>
	) : null;
}