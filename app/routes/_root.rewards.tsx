import type { MetaFunction } from "@remix-run/node";
import { appConfig } from "~/config/app";
import { useConvexAuth } from "convex/react";
import { useActiveAccount } from "thirdweb/react";
import AuthRequired from "~/components/auth.required";
import RewardsList from "~/components/rewards/rewards.list";

export const meta: MetaFunction = () => {
	return [
		{ title: `Claim Rewards - ${appConfig.name}` },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export default function Rewards() {

	const wallet = useActiveAccount();
	const { isAuthenticated } = useConvexAuth();

	return !wallet || !isAuthenticated ? <AuthRequired /> : <RewardsList />
}