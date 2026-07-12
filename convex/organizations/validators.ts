import { v } from "convex/values";

export const createOrgArgs = {
  name: v.string(),
  slug: v.string(),
  logoUrl: v.optional(v.string()),
  creatorId: v.id("users"), // the user creating it
};

export const updateOrgArgs = {
  organizationId: v.id("organizations"),
  name: v.optional(v.string()),
  logoUrl: v.optional(v.string()),
};

export const addMemberArgs = {
  organizationId: v.id("organizations"),
  userId: v.id("users"),
  role: v.union(v.literal("owner"), v.literal("admin"), v.literal("member")),
};
