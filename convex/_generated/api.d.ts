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
import type * as cycles from "../cycles.js";
import type * as http from "../http.js";
import type * as poolOwners from "../poolOwners.js";
import type * as pools from "../pools.js";
import type * as tasks from "../tasks.js";
import type * as telegram from "../telegram.js";

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
  cycles: typeof cycles;
  http: typeof http;
  poolOwners: typeof poolOwners;
  pools: typeof pools;
  tasks: typeof tasks;
  telegram: typeof telegram;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
