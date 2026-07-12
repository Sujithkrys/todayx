import { internalMutation } from "../_generated/server";
import { logActivityArgs } from "./validators";

export const internalLog = internalMutation({
  args: logActivityArgs,
  handler: async (ctx, args) => {
    return await ctx.db.insert("activityLogs", {
      ...args,
      createdAt: Date.now(),
    });
  },
});
