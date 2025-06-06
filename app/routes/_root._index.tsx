/**
 * DASHBOARD PAGE
 * 
 */
import type { MetaFunction } from "@remix-run/node";
import CycleActive from "~/components/cycle/cycle.active";
import Leaderboard from "~/components/leaderboard/board";
import Pools from "~/components/pools/pools";
import { Card, CardContent } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { appConfig } from "~/config/app";
import { useCycleStore } from "~/store/store.cycle";


export const meta: MetaFunction = () => {
	return [
		{ title: `Dashboard - ${appConfig.name}` },
		{ name: "description", content: appConfig.description },
	];
};

export default function Index() {

	// Store
	const { isLoading } = useCycleStore();


	return (
		<div className="container space-y-8 lg:space-y-8">

			{/* BANNER */}
			<Card>
				<CardContent className="pt-4 md:p-6 lg:flex items-center gap-12 lg:gap-24 bg-[url(https://cdn.electroplay.fun/home/home-banner-mobile.png)] bg-no-repeat bg-right bg-contain xl:bg-[url(https://cdn.electroplay.fun/home/home-banner.png)]">
					<h1 className="mb-4 lg:mb-0 text-etn text-2xl sm:text-3xl font-bold font-pixel">Compete,<br />Climb,<br />Conquer</h1>
					<div className="max-w-72 sm:max-w-lg md:max-w-xl lg:max-w-2xl">
						<h2 className="mb-2 sm:mb-1 text-[0.59rem] sm:text-lg font-semibold font-pixel">Weekly Token Rewards Await!</h2>
						<p className="text-xs">Join token pools and compete in exciting games to climb the leaderboards with 30% of the top participants winning weekly rewards, your chances of earning are high!</p>
					</div>
				</CardContent>
			</Card>

			<div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-[19rem_1fr] xl:grid-cols-[22rem_1fr] lg:gap-8">

				{/* ACTIVE CYCLE */}
				{isLoading ? <LoadingCycle /> : <CycleActive />}

				{/* POOLS */}
				{isLoading ? <LoadingPools /> : <Pools />}

			</div>

			{/* LEADERBOARD */}
			<Leaderboard />

		</div>
	);
}


const LoadingCycle = () => {
	return (
		<>
			<Skeleton className="col-span-1 min-h-[361px] w-full">

				<div className="p-4 h-[76px] space-y-3 border-b border-white/5">
					<div className="h-[16px] w-52 rounded-md bg-white/5" />
					<div className="h-[10px] w-36 rounded-md bg-white/5" />
				</div>

				<div className="p-4 space-y-3 border-b border-white/5">
					<div className="flex justify-between items-center">
						<div className="h-[10px] w-28 rounded-md bg-white/5" />
						<div className="h-4 w-4 rounded-md bg-white/5" />
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div className="w-full aspect-video rounded-md bg-white/5" />
						<div className="w-full aspect-video rounded-md bg-white/5" />
					</div>
				</div>

				<div className="p-4 space-y-3">
					<div className="flex justify-between items-center">
						<div className="h-[10px] w-28 rounded-md bg-white/5" />
						<div className="h-4 w-16 rounded-md bg-white/5" />
					</div>
				</div>
			</Skeleton>
		</>
	)
}


const LoadingPools = () => {

	const PoolLoadingCard = () => {
		return (
			<Skeleton className="flex flex-col">
				<div className="border-b border-white/5 p-2 flex items-center gap-2">
					<div className="w-10 h-10 rounded-full bg-white/5" />
					<div className="space-y-3">
						<div className="h-[10px] w-28 rounded-md bg-white/5" />
						<div className="h-[8px] w-20 rounded-md bg-white/5" />
					</div>
				</div>

				<div className="h-full p-3 pt-4 space-y-2 flex flex-col justify-center">
					<div className="h-[8px] w-20 rounded-md bg-white/5" />
					<div className="h-[20px] w-32 rounded-md bg-white/5" />
				</div>

				<div className="p-3">
					<div className="h-8 rounded-md bg-white/5" />
				</div>
			</Skeleton>
		)
	}

	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-2">
			<PoolLoadingCard />
			<PoolLoadingCard />
			<PoolLoadingCard />
			<PoolLoadingCard />
			<PoolLoadingCard />
			<PoolLoadingCard />
			<PoolLoadingCard />
			<PoolLoadingCard />
		</div>
	)
}