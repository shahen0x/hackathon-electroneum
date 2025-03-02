/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as adminCycles from "../adminCycles.js";
import type * as adminPayout from "../adminPayout.js";
import type * as auth from "../auth.js";
import type * as authWallet from "../authWallet.js";
import type * as claimReward from "../claimReward.js";
import type * as compete from "../compete.js";
import type * as http from "../http.js";
import type * as levelsBallsort from "../levelsBallsort.js";
import type * as levelsMatchtwo from "../levelsMatchtwo.js";
import type * as mockData from "../mockData.js";
import type * as poolOwners from "../poolOwners.js";
import type * as pools from "../pools.js";
import type * as poolsJoin from "../poolsJoin.js";
import type * as scorecards from "../scorecards.js";
import type * as users from "../users.js";
import type * as utils_base64toBlob from "../utils/base64toBlob.js";
import type * as utils_getActiveGameLineup from "../utils/getActiveGameLineup.js";
import type * as utils_isISODate from "../utils/isISODate.js";
import type * as utils_shuffleString from "../utils/shuffleString.js";
import type * as web3 from "../web3.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  adminCycles: typeof adminCycles;
  adminPayout: typeof adminPayout;
  auth: typeof auth;
  authWallet: typeof authWallet;
  claimReward: typeof claimReward;
  compete: typeof compete;
  http: typeof http;
  levelsBallsort: typeof levelsBallsort;
  levelsMatchtwo: typeof levelsMatchtwo;
  mockData: typeof mockData;
  poolOwners: typeof poolOwners;
  pools: typeof pools;
  poolsJoin: typeof poolsJoin;
  scorecards: typeof scorecards;
  users: typeof users;
  "utils/base64toBlob": typeof utils_base64toBlob;
  "utils/getActiveGameLineup": typeof utils_getActiveGameLineup;
  "utils/isISODate": typeof utils_isISODate;
  "utils/shuffleString": typeof utils_shuffleString;
  web3: typeof web3;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
