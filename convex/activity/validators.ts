import { v } from "convex/values";

export const logActivityArgs = {
  workspaceId: v.id("workspaces"),
  userId: v.id("users"),
  entityType: v.string(), 
  entityId: v.string(),
  action: v.string(), 
  metadata: v.optional(v.any()),
};
