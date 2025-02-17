import { FC } from "react";

interface BottomBarProps {

}

const BottomBar: FC<BottomBarProps> = () => {
	return (
		<div className="fixed bottom-0 left-0 w-full h-20 bg-primary-500">
			test
		</div>
	)
}

export default BottomBar;