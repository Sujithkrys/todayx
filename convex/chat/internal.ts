import { internalMutation } from "../_generated/server";
import { v } from "convex/values";
import { sendMessageArgs } from "./validators";

// Allows the system (e.g. backend AI workers) to inject messages 
export const internalSendMessage = internalMutation({
  args: sendMessageArgs,
  handler: async (ctx, args) => {
    return await ctx.db.insert("messages", {
      ...args,
      isDeleted: false,
      createdAt: Date.now(),
    });
  },
});
