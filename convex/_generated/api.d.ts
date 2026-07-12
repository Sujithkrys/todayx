/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as activity_internal from "../activity/internal.js";
import type * as activity_mutations from "../activity/mutations.js";
import type * as activity_queries from "../activity/queries.js";
import type * as activity_validators from "../activity/validators.js";
import type * as agents_internal from "../agents/internal.js";
import type * as agents_mutations from "../agents/mutations.js";
import type * as agents_queries from "../agents/queries.js";
import type * as agents_validators from "../agents/validators.js";
import type * as chat_ai from "../chat/ai.js";
import type * as chat_internal from "../chat/internal.js";
import type * as chat_mutations from "../chat/mutations.js";
import type * as chat_queries from "../chat/queries.js";
import type * as chat_validators from "../chat/validators.js";
import type * as http from "../http.js";
import type * as integrations_internal from "../integrations/internal.js";
import type * as integrations_mutations from "../integrations/mutations.js";
import type * as integrations_queries from "../integrations/queries.js";
import type * as integrations_validators from "../integrations/validators.js";
import type * as notifications_internal from "../notifications/internal.js";
import type * as notifications_mutations from "../notifications/mutations.js";
import type * as notifications_queries from "../notifications/queries.js";
import type * as notifications_validators from "../notifications/validators.js";
import type * as organizations_internal from "../organizations/internal.js";
import type * as organizations_mutations from "../organizations/mutations.js";
import type * as organizations_queries from "../organizations/queries.js";
import type * as organizations_validators from "../organizations/validators.js";
import type * as tasks_internal from "../tasks/internal.js";
import type * as tasks_mutations from "../tasks/mutations.js";
import type * as tasks_queries from "../tasks/queries.js";
import type * as tasks_validators from "../tasks/validators.js";
import type * as users_internal from "../users/internal.js";
import type * as users_mutations from "../users/mutations.js";
import type * as users_queries from "../users/queries.js";
import type * as users_validators from "../users/validators.js";
import type * as workspace_internal from "../workspace/internal.js";
import type * as workspace_mutations from "../workspace/mutations.js";
import type * as workspace_queries from "../workspace/queries.js";
import type * as workspace_validators from "../workspace/validators.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  "activity/internal": typeof activity_internal;
  "activity/mutations": typeof activity_mutations;
  "activity/queries": typeof activity_queries;
  "activity/validators": typeof activity_validators;
  "agents/internal": typeof agents_internal;
  "agents/mutations": typeof agents_mutations;
  "agents/queries": typeof agents_queries;
  "agents/validators": typeof agents_validators;
  "chat/ai": typeof chat_ai;
  "chat/internal": typeof chat_internal;
  "chat/mutations": typeof chat_mutations;
  "chat/queries": typeof chat_queries;
  "chat/validators": typeof chat_validators;
  http: typeof http;
  "integrations/internal": typeof integrations_internal;
  "integrations/mutations": typeof integrations_mutations;
  "integrations/queries": typeof integrations_queries;
  "integrations/validators": typeof integrations_validators;
  "notifications/internal": typeof notifications_internal;
  "notifications/mutations": typeof notifications_mutations;
  "notifications/queries": typeof notifications_queries;
  "notifications/validators": typeof notifications_validators;
  "organizations/internal": typeof organizations_internal;
  "organizations/mutations": typeof organizations_mutations;
  "organizations/queries": typeof organizations_queries;
  "organizations/validators": typeof organizations_validators;
  "tasks/internal": typeof tasks_internal;
  "tasks/mutations": typeof tasks_mutations;
  "tasks/queries": typeof tasks_queries;
  "tasks/validators": typeof tasks_validators;
  "users/internal": typeof users_internal;
  "users/mutations": typeof users_mutations;
  "users/queries": typeof users_queries;
  "users/validators": typeof users_validators;
  "workspace/internal": typeof workspace_internal;
  "workspace/mutations": typeof workspace_mutations;
  "workspace/queries": typeof workspace_queries;
  "workspace/validators": typeof workspace_validators;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
