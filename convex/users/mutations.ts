import { mutation } from "../_generated/server";
import { userUpdateArgs, userPreferencesUpdateArgs } from "./validators";
import { v } from "convex/values";

export const update = mutation({
  args: userUpdateArgs,
  handler: async (ctx, args) => {
    const { userId, ...updates } = args;
    const existing = await ctx.db.get(userId);
    if (!existing || existing.isDeleted) {
      throw new Error("User not found");
    }
    await ctx.db.patch(userId, {
      ...updates,
      updatedAt: Date.now(),
    });
    return userId;
  },
});

export const updatePreferences = mutation({
  args: userPreferencesUpdateArgs,
  handler: async (ctx, args) => {
    const { userId, ...updates } = args;
    const prefs = await ctx.db
      .query("userPreferences")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();
      
    if (!prefs) {
      // Create if doesn't exist
      await ctx.db.insert("userPreferences", {
        userId,
        theme: args.theme || "system",
        emailNotifications: args.emailNotifications ?? true,
        pushNotifications: args.pushNotifications ?? true,
        sidebarExpanded: args.sidebarExpanded ?? true,
        updatedAt: Date.now(),
      });
      return;
    }

    await ctx.db.patch(prefs._id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

export const softDelete = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      isDeleted: true,
      updatedAt: Date.now(),
    });
  },
});
