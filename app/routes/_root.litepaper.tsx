import type { MetaFunction } from "@remix-run/node";
import { PiScroll } from "react-icons/pi";
import { appConfig } from "~/config/app";


export const meta: MetaFunction = () => {
	return [
		{ title: `Litepaper - ${appConfig.name}` },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export default function Litepaper() {

	const section = "space-y-4 md:space-y-6";
	const h2 = "text-3xl font-bold text-left";

	return (
		<div className="container">
			<div className="max-w-4xl mx-auto p-6 md:p-10 space-y-10 md:space-y-16 bg-white rounded-2xl text-sm md:text-lg text-black text-justify leading-relaxed shadow-[-6px_-6px_0_rgba(255,255,255,0.8)]">

				<div className={section}>
					<h1 className={h2}>ELECTROPLAY LITEPAPER</h1>
					<p>Welcome to ElectroPlay - where gaming meets Web3 on the Electroneum Smart Chain! We&apos;ve created something special: an engaging, competitive, and rewarding gaming experience that serves as a robust gaming infrastructure for Web3 projects looking to add gaming utility to their ecosystem.</p>
					<p>What makes us different? Unlike many gaming platforms that focus solely on monetization, ElectroPlay is built with the ecosystem in mind. We help partner projects create sustainable token economies while rewarding players fairly for their skills and dedication.</p>
					<p>By combining cutting-edge GameFi features with strong partnerships, we&apos;re creating a gaming community that works for everyone. Through our emphasis on seamless user experience alongside decentralized gaming benefits, we make Web3 gaming accessible to everyday players.</p>
				</div>

				<div className={section}>
					<h2 className={h2}>Overview</h2>
					<img src="https://cdn.electroplay.fun/litepaper/litepaper-overview.png" alt="Weekly Gaming Cycle" className="border border-border/40 rounded-2xl" />
				</div>

				<div className={section}>
					<h2 className={h2}>Core Vision & Differentiation</h2>
					<p>We&apos;re not just another gaming platform - we&apos;re building something bigger. Our infrastructure introduces innovative use cases for Web3 projects&apos; tokens and shares revenues through token pools. Through these pools, partners can reclaim tokens for marketing and community initiatives while participating in a sustainable, fair economy that promotes long-term growth across the ecosystem.</p>
					<p>Rather than chasing quick wins, we prioritize ecosystem sustainability and community engagement. Our experienced development team creates amazing gaming experiences in weeks without compromising quality or breaking the bank. By keeping development fully in-house, we maintain creative control while optimizing costs and delivering seamless user experiences.</p>
				</div>

				<div className={section}>
					<h2 className={h2}>Weekly Gaming Cycle</h2>
					<p>Our weekly gaming cycle runs on UTC time through a series of well-defined phases. Each phase is designed to provide fair competition opportunities while maintaining excitement and transparency. Players can easily monitor their progress and earnings through our intuitive dashboard. The fully automated system runs without manual intervention, ensuring error-free and consistent execution of all gaming protocols.</p>
					<img src="https://cdn.electroplay.fun/litepaper/litepaper-cycles.png" alt="Weekly Gaming Cycle" className="border border-border/40 rounded-2xl" />

					<div className="pt-2">
						<strong>Cycle Start → on Mondays at 23:59 UTC</strong>
						<p className="mb-4 pl-6">Players can join different token pools after deployment completes.</p>

						<strong>Playtime Start → on Tuesdays at 18:00 UTC</strong>
						<p className="mb-4 pl-6">Compete mode unlocks in selected games (Game Lineup), where players earn LB Points to secure positions on the leaderboards.</p>

						<strong>Playtime End → on Sundays at 23:59 UTC</strong>
						<p className="mb-4 pl-6">The protocol automatically calculates payouts and updates all relevant functions in smart contracts and backend systems. Players can begin claiming rewards shortly after.</p>

						<strong>Cycle End → on Mondays at 23:59 UTC</strong>
						<p className="mb-4 pl-6">The current cycle ends and a new one deploys. Players have 30 days to claim their earned rewards.</p>

					</div>
				</div>

				<div className={section}>
					<h2 className={h2}>Competitive Token Pools</h2>
					<p>Token pools are the foundation of our gaming ecosystem. Through specialized smart contracts, these pools create a competitive environment where players compete for rewards fairly. Each pool manages the complete weekly gaming cycle - from player registration through reward distribution - with full automation ensuring transparency and competitive integrity.</p>
					<p>Players have the flexibility to join any combination of pools, from our primary ETN token pool to partner pools like ETN Buddy, Pandy, MEGA, and more. Once players pay the entry fee for their chosen pools, they gain access to &quot;Compete Mode&quot; in select games, allowing them to earn points and climb the leaderboards.</p>

					<a href="https://blockexplorer.electroneum.com/address/0x477Ae4E9810ba5F78BB3D3a098EDa5BBF5a599CD" target="_blank" rel="noreferrer" className="border border-border/40 rounded-lg shadow-lg p-4 flex items-center gap-4 overflow-hidden">
						<PiScroll size={26} className="shrink-0" />
						<div>
							<p className="text-sm font-bold text-left">TokenPoolERC20</p>
							<div className="text-xs w-full text-ellipsis">blockexplorer.electroneum.com</div>
						</div>
					</a>
				</div>

				<div className={section}>
					<h2 className={h2}>Secure Score Submissions</h2>
					<p>We&apos;ve built a sophisticated scoring system that ensures fair play for everyone. Every score goes through multiple security checks in our backend before being officially recorded, making it impossible for anyone - including our team - to manipulate results.</p>
					<p>Our verification process is thorough. We check for unusual patterns, unrealistic scores, and automated play using advanced anti-cheating algorithms. This protects the integrity of our leaderboards and ensures fair reward distribution.</p>
					<p>We monitor every gaming session. Scores are transmitted through secure, encrypted channels and undergo comprehensive checks. We verify everything from how long you played to how your score progressed, ensuring genuine gameplay.</p>
					<p>Important: If you join a new pool while having an existing score elsewhere, that previous score won&apos;t count in the new pool. Your next game session will count for all your active pools. However, if you achieve a lower score than your previous best, it won&apos;t affect your ranking in existing pools.</p>
				</div>

				<div className={section}>
					<h2 className={h2}>Rewards & Prize Distribution</h2>
					<p>ElectroPlay ensures a large number of players receive rewards instead of a winner-takes-all model.</p>
					<p>The reward structure is designed to be both competitive and fair, with the top 30% of players receiving rewards from a substantial prize pool (70% of the revenue from each token pool).</p>
					<p>To maximize their winning potential, players have the flexibility to join multiple pools simultaneously. This means that a single game score can count toward their ranking in all joined pools, effectively multiplying their chances of winning rewards across different token ecosystems.</p>
					<p>Here&apos;s a detailed breakdown of our prize distribution algorithm using real examples:</p>
					<img src="https://cdn.electroplay.fun/litepaper/litepaper-paytable.png" alt="Weekly Gaming Cycle" className="w-full rounded-2xl" />
					<div>
						<h3 className="mb-2 font-bold">Example Pool with 100 Players</h3>
						<ul className="list-disc pl-8">
							<li>Entry Fee: 4,200 ETN per player</li>
							<li>Total Prize Pool: 294,000 ETN</li>
							<li>First Place Prize: 64,166 ETN</li>
							<li>Top 30% of players (30 players) receive rewards</li>
						</ul>
					</div>
					<div>
						<h3 className="mb-2 font-bold">Example Pool with 300 Players</h3>
						<ul className="list-disc pl-8">
							<li>Entry Fee: 4,200 ETN per player</li>
							<li>Total Prize Pool: 882,000 ETN</li>
							<li>First Place Prize: 113,400 ETN</li>
							<li>Top 30% of players (90 players) receive rewards</li>
						</ul>
					</div>
					<p>Our revenue sharing model allocates a strategic portion of each pool between ElectroPlay and partner projects. These funds support both platform development and partner ecosystem growth through platform maintenance, ongoing development, joint marketing campaigns, community engagement initiatives, and ecosystem expansion activities.</p>
					<p>This collaborative approach ensures both ElectroPlay and its partners can sustain long-term growth while maintaining competitive rewards for players.</p>
				</div>

				<div className={section}>
					<h2 className={h2}>Fully Automated Protocol</h2>
					<p>ElectroPlay is designed as a fully autonomous protocol, requiring minimal manual intervention. The system operates 99% autonomously, ensuring seamless execution of gaming cycles, payouts, and leaderboard updates.</p>
					<div className="pt-2">
						<strong>Self-Executing Weekly Cycles</strong>
						<p className="mb-4 pl-6">The platform automatically manages each phase of the gaming cycle, from player registration to payout calculations.</p>

						<strong>Automated Payout Generation</strong>
						<p className="mb-4 pl-6">Once playtime ends, the system triggers reward calculations and winners can claim their payouts.</p>

						<strong>Smart Contract-Managed Token Pools</strong>
						<p className="mb-4 pl-6">Each pool is automatically deployed and functions independently, ensuring fair and transparent competition.</p>

						<strong>Scheduled Processes & Event Handling</strong>
						<p className="mb-4 pl-6">The backend uses advanced schedulers to execute time-sensitive operations with precision.</p>

						<strong>Security & Anti-Cheat Enforcement</strong>
						<p className="mb-4 pl-6">The system continuously monitors for cheating, invalid scores, or suspicious activity, ensuring fairness.</p>
					</div>

					<p>This level of automation ensures efficiency, fairness, and security while minimizing operational overhead.</p>
				</div>

				<div className={section}>
					<h2 className={h2}>Security & Fair Play</h2>
					<p>At ElectroPlay, we use multi-layered security measures to ensure fair gameplay. Our secure backend validates all game scores with real-time monitoring and anti-cheating algorithms to detect and remove any unfair play.</p>
					<p>The platform&apos;s robust server-side validation system, combined with encryption and obfuscation techniques, protects game logic and prevents score manipulation. This ensures complete integrity of our competitive gaming environment.</p>
					<p>While we implement comprehensive automated monitoring and audit systems to proactively identify and address security concerns, it is impossible to guarantee 100% protection against all potential exploits. However, we are committed to continuously improving our security measures and will promptly address and patch any vulnerabilities that may be discovered to maintain a fair gaming experience for all players.</p>
				</div>

				<div className={section}>
					<h2 className={h2}>Technical Stack & Infrastructure</h2>
					<p>ElectroPlay is built on a modern tech stack designed for optimal performance and scalability. Our robust infrastructure features a reactive backend that seamlessly handles cycle scheduling, automatic deployment of weekly token pool smart contracts, anti-cheating algorithms for score submissions, payout calculations, and smart contract updates with merkle trees.</p>
					<img src="https://cdn.electroplay.fun/litepaper/litepaper-infra.png" alt="Weekly Gaming Cycle" className="w-full rounded-2xl" />
					<p>Our web3 features are powered by Thirdweb, a full-stack web3 development platform that supports thousands of dapps. We implement Sign-In With Ethereum (SIWE) to provide secure wallet authentication and verification in our backend.</p>
					<p>We develop our games in C# using Unity, enabling us to export WebGL games that work seamlessly on both mobile and desktop browsers.</p>
					<p>Our infrastructure uses cloud services and content delivery networks (CDNs) to distribute games and handle player traffic efficiently. Our microservices architecture lets us update and add new features without disrupting gameplay.</p>
				</div>

				<div className={section}>
					<h2 className={h2}>Partnerships</h2>
					<p>Partner projects joining ElectroPlay gain two key benefits: enhanced token utility and broader audience exposure. Our ecosystem enables projects to engage their communities in new ways while reaching new users.</p>
					<p>Partner tokens gain practical use cases that naturally increase their value through our platform. Projects receive 15% back from their respective pools weekly, providing consistent resources for marketing and community rewards. Our gaming integration offers engaging entertainment that strengthens community bonds.</p>
					<p>To maintain quality, we thoroughly vet partner tokens, accepting only reputable projects with active communities. While ElectroSwap is our preferred DEX, tokens may also be listed on other established decentralized exchanges if they maintain sufficient liquidity and meet our requirements.</p>
					<p>We are committed to supporting diverse communities. Through active participation in various Web3 communities, we stay informed about developments and trends. Our platform provides a space for projects of all sizes to enhance their token utility and engage with their audiences.</p>
				</div>

				<div className={section}>
					<h2 className={h2}>Roadmap</h2>
					<p>ElectroPlay is continuously evolving with exciting plans for the future. Our primary focus is on expanding our game lineup to offer more variety and engaging experiences for players. We&apos;re actively working to bring in new partnerships, which will introduce additional token pools from respected Web3 projects, creating more opportunities for our community.</p>
					<p>To support our growing ecosystem, we&apos;re implementing significant scalability enhancements to ensure our platform can handle an increasing number of players and tokens efficiently. Looking further ahead, we&apos;re exploring innovative features including NFT integration and other blockchain technologies to expand the platform&apos;s capabilities and enhance the gaming experience.</p>
				</div>

				<div className={section}>
					<h2 className={h2}>Conclusion</h2>
					<p>ElectroPlay is built with the community, sustainability, and long-term growth in mind. By offering valuable utility to Web3 projects and rewards to players, we are creating a platform that benefits all stakeholders. With our focus on fairness, security, and efficiency, ElectroPlay is set to revolutionize Web3 gaming and become a core part of the Electroneum ecosystem.</p>
				</div>

			</div>
		</div>
	);
}