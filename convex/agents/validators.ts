import { v } from "convex/values";

export const createAgentArgs = {
  workspaceId: v.id("workspaces"),
  name: v.string(),
  description: v.optional(v.string()),
  systemPrompt: v.string(),
  model: v.string(),
};

export const updateAgentArgs = {
  agentId: v.id("agents"),
  name: v.optional(v.string()),
  description: v.optional(v.string()),
  systemPrompt: v.optional(v.string()),
  model: v.optional(v.string()),
  isActive: v.optional(v.boolean()),
};

export const logExecutionArgs = {
  agentId: v.id("agents"),
  workspaceId: v.id("workspaces"),
  triggeredByUserId: v.optional(v.id("users")),
  action: v.string(),
  status: v.union(v.literal("pending"), v.literal("running"), v.literal("success"), v.literal("failed")),
};
