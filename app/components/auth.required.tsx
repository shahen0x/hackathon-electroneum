import { PiWarningDiamondLight } from "react-icons/pi"
import { Card } from "./ui/card"


const AuthRequired = () => {
	return (
		<div className="container min-h-[calc(100vh_-_18rem)] flex flex-col">
			<div className="w-full max-w-md mx-auto flex-1 flex items-center justify-center">
				<Card className="w-full flex item-center gap-4 p-4">
					<div className="shrink-0 w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center">
						<PiWarningDiamondLight size={26} className="text-rose-500 animate-pulse" />
					</div>
					<div>
						<h2 className="font-bold">Wallet Required</h2>
						<p className="text-xs text-muted-foreground">Sign in with your wallet to claim your rewards.</p>
					</div>
				</Card>
			</div>
		</div>
	)
}

export default AuthRequired;