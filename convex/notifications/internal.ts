import { internalMutation } from "../_generated/server";
import { createNotificationArgs } from "./validators";

// System alerts and background jobs trigger notifications here
export const internalCreate = internalMutation({
  args: createNotificationArgs,
  handler: async (ctx, args) => {
    return await ctx.db.insert("notifications", {
      ...args,
      isRead: false,
      createdAt: Date.now(),
    });
  },
});
