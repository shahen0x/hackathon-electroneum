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
import type * as auth from "../auth.js";
import type * as authWallet from "../authWallet.js";
import type * as cycles from "../cycles.js";
import type * as http from "../http.js";
import type * as levelsBallsort from "../levelsBallsort.js";
import type * as levelsMatchtwo from "../levelsMatchtwo.js";
import type * as poolOwners from "../poolOwners.js";
import type * as pools from "../pools.js";
import type * as poolsJoin from "../poolsJoin.js";
import type * as users from "../users.js";
import type * as utils_getActiveGameLineup from "../utils/getActiveGameLineup.js";
import type * as utils_shuffleString from "../utils/shuffleString.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  authWallet: typeof authWallet;
  cycles: typeof cycles;
  http: typeof http;
  levelsBallsort: typeof levelsBallsort;
  levelsMatchtwo: typeof levelsMatchtwo;
  poolOwners: typeof poolOwners;
  pools: typeof pools;
  poolsJoin: typeof poolsJoin;
  users: typeof users;
  "utils/getActiveGameLineup": typeof utils_getActiveGameLineup;
  "utils/shuffleString": typeof utils_shuffleString;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
