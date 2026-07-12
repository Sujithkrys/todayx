import { mutation } from "../_generated/server";
import { createWorkspaceArgs, updateWorkspaceArgs } from "./validators";
import { v } from "convex/values";

export const create = mutation({
  args: createWorkspaceArgs,
  handler: async (ctx, args) => {
    // Check if org exists and is not deleted
    const org = await ctx.db.get(args.organizationId);
    if (!org || org.isDeleted) throw new Error("Organization not found");

    // Check slug uniqueness
    const existing = await ctx.db
      .query("workspaces")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
    if (existing) throw new Error("Workspace slug already in use");

    return await ctx.db.insert("workspaces", {
      ...args,
      isDeleted: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const update = mutation({
  args: updateWorkspaceArgs,
  handler: async (ctx, args) => {
    const { workspaceId, ...updates } = args;
    await ctx.db.patch(workspaceId, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

export const softDelete = mutation({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.workspaceId, {
      isDeleted: true,
      updatedAt: Date.now(),
    });
  },
});

export const restore = mutation({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.workspaceId, {
      isDeleted: false,
      updatedAt: Date.now(),
    });
  },
});
