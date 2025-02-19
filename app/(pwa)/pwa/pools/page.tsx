"use client";

import ActivePools from "@/components/pools";
import PoolsPwa from "@/components/pools/pools-pwa";

export default function PWAPools() {

	return (
		<>
			<div className="fixed z-20 top-0 w-full h-20 bg-slate-500"></div>
			<div className="container space-y-4 pt-24">
				<PoolsPwa />
				<PoolsPwa />
				<PoolsPwa />
				<PoolsPwa />
			</div>
		</>
	);
}