import { v } from "convex/values";

export const createWorkspaceArgs = {
  organizationId: v.id("organizations"),
  name: v.string(),
  slug: v.string(),
};

export const updateWorkspaceArgs = {
  workspaceId: v.id("workspaces"),
  name: v.optional(v.string()),
};
