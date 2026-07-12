import { mutation } from "../_generated/server";
import { createAgentArgs, updateAgentArgs } from "./validators";
import { v } from "convex/values";

export const create = mutation({
  args: createAgentArgs,
  handler: async (ctx, args) => {
    return await ctx.db.insert("agents", {
      ...args,
      isActive: true,
      isDeleted: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const update = mutation({
  args: updateAgentArgs,
  handler: async (ctx, args) => {
    const { agentId, ...updates } = args;
    await ctx.db.patch(agentId, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

export const softDelete = mutation({
  args: { agentId: v.id("agents") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.agentId, {
      isDeleted: true,
      updatedAt: Date.now(),
    });
  },
});
