import { v } from "convex/values";

export const userCreateArgs = {
  clerkId: v.string(),
  email: v.string(),
  firstName: v.optional(v.string()),
  lastName: v.optional(v.string()),
  imageUrl: v.optional(v.string()),
};

export const userUpdateArgs = {
  userId: v.id("users"),
  firstName: v.optional(v.string()),
  lastName: v.optional(v.string()),
  imageUrl: v.optional(v.string()),
};

export const userPreferencesUpdateArgs = {
  userId: v.id("users"),
  theme: v.optional(v.union(v.literal("light"), v.literal("dark"), v.literal("system"))),
  emailNotifications: v.optional(v.boolean()),
  pushNotifications: v.optional(v.boolean()),
  sidebarExpanded: v.optional(v.boolean()),
};
