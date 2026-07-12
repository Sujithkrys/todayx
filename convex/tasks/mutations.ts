import { mutation } from "../_generated/server";
import { createTaskArgs, updateTaskArgs } from "./validators";
import { v } from "convex/values";

export const create = mutation({
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

export const update = mutation({
  args: updateTaskArgs,
  handler: async (ctx, args) => {
    const { taskId, ...updates } = args;
    await ctx.db.patch(taskId, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

export const softDelete = mutation({
  args: { taskId: v.id("tasks") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.taskId, {
      isDeleted: true,
      updatedAt: Date.now(),
    });
  },
});
