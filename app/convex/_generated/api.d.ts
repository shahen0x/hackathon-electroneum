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
import type * as compete from "../compete.js";
import type * as cycles from "../cycles.js";
import type * as http from "../http.js";
import type * as levelsBallsort from "../levelsBallsort.js";
import type * as levelsMatchtwo from "../levelsMatchtwo.js";
import type * as mockData from "../mockData.js";
import type * as paytable_paytable from "../paytable/paytable.js";
import type * as paytable_shareBasedPaytable from "../paytable/shareBasedPaytable.js";
import type * as paytable_utils_calculateOptimalToppers from "../paytable/utils/calculateOptimalToppers.js";
import type * as paytable_utils_getDecimalPlaces from "../paytable/utils/getDecimalPlaces.js";
import type * as paytable_utils_logEntireArray from "../paytable/utils/logEntireArray.js";
import type * as paytable_utils_roundDP from "../paytable/utils/roundDP.js";
import type * as paytable_utils_sumPaytable from "../paytable/utils/sumPaytable.js";
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
  compete: typeof compete;
  cycles: typeof cycles;
  http: typeof http;
  levelsBallsort: typeof levelsBallsort;
  levelsMatchtwo: typeof levelsMatchtwo;
  mockData: typeof mockData;
  "paytable/paytable": typeof paytable_paytable;
  "paytable/shareBasedPaytable": typeof paytable_shareBasedPaytable;
  "paytable/utils/calculateOptimalToppers": typeof paytable_utils_calculateOptimalToppers;
  "paytable/utils/getDecimalPlaces": typeof paytable_utils_getDecimalPlaces;
  "paytable/utils/logEntireArray": typeof paytable_utils_logEntireArray;
  "paytable/utils/roundDP": typeof paytable_utils_roundDP;
  "paytable/utils/sumPaytable": typeof paytable_utils_sumPaytable;
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
