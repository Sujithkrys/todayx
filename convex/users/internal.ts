import { internalMutation, internalQuery } from "../_generated/server";
import { userCreateArgs } from "./validators";
import { v } from "convex/values";

// Used by Clerk webhook to sync user creation
export const internalCreate = internalMutation({
  args: userCreateArgs,
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();
      
    if (existing) {
      return existing._id;
    }

    const userId = await ctx.db.insert("users", {
      ...args,
      isDeleted: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    // Create default preferences
    await ctx.db.insert("userPreferences", {
      userId,
      theme: "system",
      emailNotifications: true,
      pushNotifications: true,
      sidebarExpanded: true,
      updatedAt: Date.now(),
    });

    return userId;
  },
});
