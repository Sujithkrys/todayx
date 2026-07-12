import { internalMutation } from "../_generated/server";
import { logExecutionArgs } from "./validators";
import { v } from "convex/values";

export const internalLogExecution = internalMutation({
  args: logExecutionArgs,
  handler: async (ctx, args) => {
    return await ctx.db.insert("agentExecutions", {
      ...args,
      startedAt: Date.now(),
    });
  },
});

export const internalUpdateExecutionStatus = internalMutation({
  args: {
    executionId: v.id("agentExecutions"),
    status: v.union(v.literal("success"), v.literal("failed")),
    logs: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const { executionId, ...updates } = args;
    await ctx.db.patch(executionId, {
      ...updates,
      completedAt: Date.now(),
    });
  },
});
