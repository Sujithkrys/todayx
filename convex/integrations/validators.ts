import { v } from "convex/values";

export const addIntegrationArgs = {
  workspaceId: v.id("workspaces"),
  provider: v.union(v.literal("slack"), v.literal("notion"), v.literal("linear"), v.literal("github")),
  config: v.optional(v.any()), 
};

export const updateIntegrationArgs = {
  integrationId: v.id("integrations"),
  isActive: v.optional(v.boolean()),
  config: v.optional(v.any()),
};

export const removeIntegrationArgs = {
  integrationId: v.id("integrations"),
};
