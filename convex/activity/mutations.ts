import { mutation } from "../_generated/server";
import { logActivityArgs } from "./validators";

export const log = mutation({
  args: logActivityArgs,
  handler: async (ctx, args) => {
    return await ctx.db.insert("activityLogs", {
      ...args,
      createdAt: Date.now(),
    });
  },
});
