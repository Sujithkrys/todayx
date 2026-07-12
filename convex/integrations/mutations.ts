import { mutation } from "../_generated/server";
import { addIntegrationArgs, updateIntegrationArgs, removeIntegrationArgs } from "./validators";

export const add = mutation({
  args: addIntegrationArgs,
  handler: async (ctx, args) => {
    return await ctx.db.insert("integrations", {
      ...args,
      isActive: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const update = mutation({
  args: updateIntegrationArgs,
  handler: async (ctx, args) => {
    const { integrationId, ...updates } = args;
    await ctx.db.patch(integrationId, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

export const remove = mutation({
  args: removeIntegrationArgs,
  handler: async (ctx, args) => {
    await ctx.db.delete(args.integrationId);
  },
});
