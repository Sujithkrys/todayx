import { internalMutation } from "../_generated/server";
import { v } from "convex/values";

export const internalUpdateTokens = internalMutation({
  args: {
    userId: v.id("users"),
    provider: v.string(),
    providerAccountId: v.string(),
    accessToken: v.string(),
    refreshToken: v.optional(v.string()),
    expiresAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("oauthConnections")
      .withIndex("by_provider_and_account", (q) => 
        q.eq("provider", args.provider).eq("providerAccountId", args.providerAccountId)
      )
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        accessToken: args.accessToken,
        refreshToken: args.refreshToken,
        expiresAt: args.expiresAt,
        updatedAt: Date.now(),
      });
      return existing._id;
    }

    return await ctx.db.insert("oauthConnections", {
      ...args,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});
