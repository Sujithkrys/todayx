import { query } from "../_generated/server";
import { v } from "convex/values";

export const getUserNotifications = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("notifications")
      .withIndex("by_user_and_read", (q) => q.eq("userId", args.userId))
      .order("desc")
      .take(100);
  },
});

export const getUnreadCount = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const unread = await ctx.db
      .query("notifications")
      .withIndex("by_user_and_read", (q) => 
        q.eq("userId", args.userId).eq("isRead", false)
      )
      .collect();
      
    return unread.length;
  },
});
