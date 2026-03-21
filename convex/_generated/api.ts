/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type { ApiFromModules, FilterApi, FunctionReference } from "convex/server";
import type * as contacts from "../contacts.js";
import type * as blog from "../blog.js";

type FullApiType = ApiFromModules<{
  contacts: typeof contacts;
  blog: typeof blog;
}>;

type PublicApi = FilterApi<FullApiType, FunctionReference<any, "public">>;
type InternalApi = FilterApi<FullApiType, FunctionReference<any, "internal">>;

// Runtime stub - will be replaced by `npx convex dev` generated code
const createProxy = (prefix: string): any =>
  new Proxy(
    {},
    {
      get(_, prop) {
        return createProxy(`${prefix}.${String(prop)}`);
      },
    }
  );

export const api: PublicApi = createProxy("api") as PublicApi;
export const internal: InternalApi = createProxy("internal") as InternalApi;
