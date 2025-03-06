import type { MetaFunction } from "@remix-run/node";
import { appConfig } from "~/config/app";


export const meta: MetaFunction = () => {
	return [
		{ title: `Litepaper - ${appConfig.name}` },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export default function Litepaper() {

	const section = "space-y-6";
	const h2 = "text-3xl font-bold";

	return (
		<div className="container space-y-8 lg:space-y-8">
			<div className="max-w-3xl mx-auto text-justify leading-relaxed bg-white rounded-2xl p-10 text-black space-y-10">

				{/* <h1 className="text-3xl font-bold">ElectroPlay Litepaper</h1> */}
				<div className={section}>
					<h2 className={h2}>Introduction</h2>
					<p>ElectroPlay is a Web3 gaming platform built on the Electroneum Smart Chain (ETN). We provide an engaging, competitive, and rewarding gaming experience while serving as a robust gaming infrastructure for Web3 projects looking to add gaming utility to their ecosystem.</p>
					<p>Unlike many gaming platforms that focus solely on monetization, ElectroPlay is built with the ecosystem in mind, offering sustainable token sinks for partner projects while ensuring players are fairly rewarded.</p>
					<p>Through creative game design and key partnerships, ElectroPlay builds an enriching gaming ecosystem that serves all participants. By emphasizing seamless user experience alongside decentralized gaming benefits, we make Web3 gaming accessible to everyday players.</p>
				</div>

				<div className={section}>
					<h2 className={h2}>Core Vision & Differentiation</h2>
					<p>ElectroPlay&apos;s role extends beyond gaming into ecosystem enhancement. Through our gaming infrastructure, we introduce innovative use cases for Web3 projects&apos; tokens and facilitate revenue redistribution via token pools. Partners can reclaim tokens for marketing and community initiatives while participating in a sustainable, fair economy that promotes long-term growth across the ecosystem.</p>
					<p>We emphasize ecosystem sustainability and community engagement over short-term gains. Our agile development process delivers high-quality gaming experiences within weeks, maintaining efficiency without requiring substantial capital. By keeping development fully in-house, we maintain creative control while optimizing costs and delivering seamless user experiences.</p>
				</div>

				<div className={section}>
					<h2 className={h2}>Weekly Gaming Cycle</h2>
					<p>Our fully autonomous weekly gaming cycle operates on UTC time and consists of multiple phases. Each phase is carefully designed to ensure fair participation and transparent reward distribution, while maintaining competitive gameplay integrity. Players can track their progress and earnings in real-time through our intuitive dashboard. The system&apos;s automation eliminates manual intervention, reducing potential errors and ensuring consistent execution of all gaming protocols.</p>

					<div>
						<strong>Cycle Start → on Mondays at 23:59 UTC</strong>
						<p className="mb-4 pl-6">Players can join different token pools after deployment completes.</p>

						<strong>Playtime Start → on Tuesdays at 18:00 UTC</strong>
						<p className="mb-4 pl-6">Compete mode unlocks in selected games (Game Lineup), where players earn LB Points to secure positions on the leaderboards.</p>

					</div>
				</div>

			</div>
		</div>
	);
}