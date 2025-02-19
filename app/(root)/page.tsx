// import { useQuery } from "convex/react";
import CurrentCycle from "@/components/cycle";
import Leaderboard from "@/components/leaderboard";
import ActivePools from "@/components/pools";
import { api } from "@/convex/_generated/api";
import { preloadQuery } from "convex/nextjs";
import Link from "next/link";

export default async function Home() {

	const preloadedCycle = await preloadQuery(api.cycles.getActiveCycleWithPools);


	return (
		<div className="container space-y-6">

			{/* {tasks?.map(({ _id, text }) => <div key={_id}>{text}</div>)} */}

			<Link href={"/player/ballsort"}>Play</Link>

			{/* BANNER */}
			<div className="bg-primary/10 rounded-2xl p-6 lg:p-10 lg:flex items-center gap-12 lg:gap-24 bg-[url(/home-banner-mobile.png)] bg-no-repeat bg-right bg-contain xl:bg-[url(/banner.png)]">
				<h1 className="mb-6 lg:mb-0 text-2xl sm:text-3xl font-bold font-start2p text-etn">Compete,<br />Climb,<br />Conquer</h1>
				<div className="max-w-72 sm:max-w-lg md:max-w-xl lg:max-w-2xl">
					<h2 className="mb-2 sm:mb-1 text-[0.59rem] sm:text-lg font-semibold font-start2p">Weekly Token Rewards Await!</h2>
					<p className="text-sm text-neutral-400">Join token pools and compete in exciting games to climb the leaderboards with 30% of the top participants winning weekly rewards, your chances of earning are high!</p>
				</div>
			</div>

			<CurrentCycle preloadedCycle={preloadedCycle} />
			<ActivePools preloadedCycle={preloadedCycle} />
			<Leaderboard />
		</div>
	);
}