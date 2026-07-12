import { mutation } from "../_generated/server";
import { markAsReadArgs, markAllAsReadArgs } from "./validators";
import { v } from "convex/values";

export const markAsRead = mutation({
  args: markAsReadArgs,
  handler: async (ctx, args) => {
    await ctx.db.patch(args.notificationId, {
      isRead: true,
    });
  },
});

export const markAllAsRead = mutation({
  args: markAllAsReadArgs,
  handler: async (ctx, args) => {
    const unread = await ctx.db
      .query("notifications")
      .withIndex("by_user_and_read", (q) => 
        q.eq("userId", args.userId).eq("isRead", false)
      )
      .collect();

    for (const notif of unread) {
      await ctx.db.patch(notif._id, { isRead: true });
    }
  },
});
