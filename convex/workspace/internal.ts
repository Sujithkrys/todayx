import { internalMutation } from "../_generated/server";
import { v } from "convex/values";

export const internalHardDelete = internalMutation({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, args) => {
    // In a real production system, this would cascade delete 
    // projects, tasks, conversations, messages, agents, etc.
    // For this module, we just delete the workspace itself.
    await ctx.db.delete(args.workspaceId);
  },
});
