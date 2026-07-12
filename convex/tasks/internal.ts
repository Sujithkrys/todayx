import { internalMutation } from "../_generated/server";
import { v } from "convex/values";
import { createTaskArgs } from "./validators";

// AI Agents can create tasks via internal API
export const internalCreate = internalMutation({
  args: createTaskArgs,
  handler: async (ctx, args) => {
    return await ctx.db.insert("tasks", {
      ...args,
      isDeleted: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const internalHardDelete = internalMutation({
  args: { taskId: v.id("tasks") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.taskId);
  },
});
