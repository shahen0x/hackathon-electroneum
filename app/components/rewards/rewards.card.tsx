import { FC, useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { formatDate } from "~/lib/format.date";
import { toEther } from "thirdweb/utils";
import { Id } from "~/convex/_generated/dataModel";
import { getContract, readContract } from "thirdweb";
import { clientThirdweb } from "~/thirdweb/client";
import { chain } from "~/config/chain";
import { abiPoolNative } from "~/thirdweb/abi/abi.pool.native";
import RewardsClaim from "./rewards.claim";
import { PiChecksBold, PiCoinsDuotone, PiMedalLight } from "react-icons/pi";

interface RewardsCardProps {
	claim: {
		poolRewards: ({
			poolPrice: number;
			tokenLogo: string;
			tokenSymbol: string;
			amount: number;
			poolId: Id<"pools">;
			contractAddress: string;
		} | null)[];
		claimId: Id<"claims">;
		cycle: {
			week: number;
			schedule: {
				cycleStart: string;
				cycleEnd: string;
				playtimeStart: string;
				playtimeEnd: string;
			}
		};
	} | undefined
}

const RewardsCard: FC<RewardsCardProps> = ({ claim }) => {

	const [expiry, setExpiry] = useState<string | null>(null);

	// Get claim expiry from smart contract
	// Since all pools have the same expiry during the same cycle, we pull only 1
	const getExpiry = async () => {
		if (!claim || !claim.poolRewards[0]) return null;
		const contract = getContract({
			client: clientThirdweb,
			chain,
			address: claim.poolRewards[0].contractAddress,
			abi: abiPoolNative
		});

		const expiryBigInt = await readContract({ contract, method: "getClaimExpiryTime" });
		const expiryTime = Number(expiryBigInt) * 1000;
		const expiryDate = new Date(expiryTime);
		return expiryDate.toISOString();
	}

	useEffect(() => {
		if (claim) {
			getExpiry().then(data => (setExpiry(data)))
		}
	}, [claim]);


	return (
		<Card key={claim?.claimId}>
			<CardHeader className="relative z-10 space-y-1 border-b">
				<CardTitle className="flex items-center gap-3 font-pixel text-md">
					Gaming Week #{claim?.cycle.week}
				</CardTitle>
				<CardDescription className="flex items-center gap-2 text-sm">
					{formatDate(claim?.cycle.schedule.cycleStart)} to {formatDate(claim?.cycle.schedule.cycleEnd)}
				</CardDescription>

				{/* <div>Expiry:
					{formatDate(expiry, "dd MMM y")}
				</div>

				{claim?.poolRewards[0]?.poolId} <br />
				{claim?.poolRewards[0]?.amount} */}
			</CardHeader>
			<CardContent className="p-0">

				{claim?.poolRewards.map((pool) => {
					if (!pool) return null;
					const amount = toEther(BigInt(pool.amount));
					const truncatedAmount = Math.floor(parseFloat(amount) * 10000) / 10000;

					return (
						<div key={pool.poolId} className="grid grid-cols-[1fr_1fr_5rem] items-center border-b last:border-b-0 py-2 px-2 sm:px-4">
							<div className="flex items-center gap-3">
								<img src={pool.tokenLogo} alt={pool.tokenSymbol} className="w-8 h-8 rounded-full" />
								<div className="text-xs sm:text-sm">
									<div className="">{pool.tokenSymbol}</div>
									<div className="text-neutral-500">Pool</div>
								</div>
							</div>
							<div className="text-xs sm:text-sm flex items-center gap-2 text-green-400">
								<PiMedalLight size={20} className="text-green-400" />
								<span>{truncatedAmount}</span>
							</div>

							<RewardsClaim pool={pool} />
						</div>
					);
				})}

			</CardContent>
		</Card>
	)
}

export default RewardsCard;