import type { MetaFunction } from "@remix-run/node";
import CycleActive from "~/components/cycle/cycle.active";
import Leaderboard from "~/components/leaderboard/leaderboard";
import ActivePools from "~/components/pools/pools.active";
import { appConfig } from "~/config/app";


export const meta: MetaFunction = () => {
	return [
		{ title: `Dashboard - ${appConfig.name}` },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export default function Index() {


	return (
		<div className="container space-y-8">


			{/* BANNER */}
			<div className="bg-primary/20 rounded-2xl p-6 lg:p-10 lg:flex items-center gap-12 lg:gap-24 bg-[url(/home/home-banner-mobile.png)] bg-no-repeat bg-right bg-contain xl:bg-[url(/home/home-banner.png)]">
				<h1 className="mb-6 lg:mb-0 text-2xl sm:text-3xl font-bold font-pixel">Compete,<br />Climb,<br />Conquer</h1>
				<div className="max-w-72 sm:max-w-lg md:max-w-xl lg:max-w-2xl">
					<h2 className="mb-2 sm:mb-1 text-[0.59rem] sm:text-lg font-semibold font-pixel">Weekly Token Rewards Await!</h2>
					<p className="text-sm">Join token pools and compete in exciting games to climb the leaderboards with 30% of the top participants winning weekly rewards, your chances of earning are high!</p>
				</div>
			</div>

			<div className="grid grid-cols-4 gap-8">
				<CycleActive className="col-span-1" />
				<ActivePools className="col-span-3" />
			</div>

			<Leaderboard />


		</div>
	);
}