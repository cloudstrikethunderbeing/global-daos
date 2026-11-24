import { t as createLucideIcon } from "./createLucideIcon-SKDJ6oLf.js";
import { it as FoundingBadge, lt as RewardType } from "./index-Bd2sA-Nq.js";
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Gift = createLucideIcon("gift", [
	["rect", {
		x: "3",
		y: "8",
		width: "18",
		height: "4",
		rx: "1",
		key: "bkv52"
	}],
	["path", {
		d: "M12 8v13",
		key: "1c76mn"
	}],
	["path", {
		d: "M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7",
		key: "6wjy6b"
	}],
	["path", {
		d: "M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5",
		key: "1ihvrl"
	}]
]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Lock = createLucideIcon("lock", [["rect", {
	width: "18",
	height: "11",
	x: "3",
	y: "11",
	rx: "2",
	ry: "2",
	key: "1w4ew1"
}], ["path", {
	d: "M7 11V7a5 5 0 0 1 10 0v4",
	key: "fwvmzm"
}]]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var UserPlus = createLucideIcon("user-plus", [
	["path", {
		d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
		key: "1yyitq"
	}],
	["circle", {
		cx: "9",
		cy: "7",
		r: "4",
		key: "nufk8"
	}],
	["line", {
		x1: "19",
		x2: "19",
		y1: "8",
		y2: "14",
		key: "1bvyxn"
	}],
	["line", {
		x1: "22",
		x2: "16",
		y1: "11",
		y2: "11",
		key: "1shjgl"
	}]
]);
//#endregion
//#region src/lib/credits.ts
/**
* Founding Credits are simulated, non-currency recognition markers for
* early-stage supporters. They are never money, equity, a token or an
* investment, and every label here keeps that framing explicit.
*/
var rewardTypeLabels = {
	[RewardType.firstSimulatedPurchase]: "First simulated purchase",
	[RewardType.valuableFeedback]: "Valuable feedback",
	[RewardType.daoDeployment]: "DAO deployment",
	[RewardType.consumerReferral]: "Consumer referral",
	[RewardType.earlyConsumerRegistration]: "Early consumer registration",
	[RewardType.foundingBusinessRegistration]: "Founding business registration",
	[RewardType.businessReferral]: "Business referral",
	[RewardType.businessNomination]: "Business nomination"
};
/** Ordered reward types for admin editors and analytics breakdowns. */
var rewardTypeOrder = [
	RewardType.firstSimulatedPurchase,
	RewardType.earlyConsumerRegistration,
	RewardType.valuableFeedback,
	RewardType.consumerReferral,
	RewardType.businessReferral,
	RewardType.businessNomination,
	RewardType.foundingBusinessRegistration,
	RewardType.daoDeployment
];
var badgeLabels = {
	[FoundingBadge.consumer]: "Founding Member",
	[FoundingBadge.business]: "Founding Business"
};
/** Short descriptions used in reward-amount editors. */
var rewardTypeHints = {
	[RewardType.firstSimulatedPurchase]: "Awarded once after a first checkout",
	[RewardType.valuableFeedback]: "Granted for feedback that shapes the product",
	[RewardType.daoDeployment]: "Awarded when a business DAO goes live",
	[RewardType.consumerReferral]: "Paid to the referrer when a consumer joins",
	[RewardType.earlyConsumerRegistration]: "Awarded to early access sign-ups",
	[RewardType.foundingBusinessRegistration]: "Awarded to founding business registrations",
	[RewardType.businessReferral]: "Paid to the referrer when a business joins",
	[RewardType.businessNomination]: "Awarded for nominating a business"
};
/** Build the public referral link for a referral code. */
function buildReferralLink(code) {
	return `${typeof window !== "undefined" && window.location.origin ? window.location.origin : "https://globaldaos.org"}/early-access?ref=${encodeURIComponent(code)}`;
}
/** Format a credit amount with thousands separators, e.g. 1275n -> "1,275". */
function formatCredits(amount) {
	return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(Number(amount));
}
/** Zero-padded founding member number, e.g. 42n -> "#0042". */
function formatMemberNumber(memberNumber) {
	return `#${memberNumber.toString().padStart(4, "0")}`;
}
//#endregion
export { rewardTypeHints as a, UserPlus as c, formatMemberNumber as i, Lock as l, buildReferralLink as n, rewardTypeLabels as o, formatCredits as r, rewardTypeOrder as s, badgeLabels as t, Gift as u };
