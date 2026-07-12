import { query } from "../_generated/server";
import { v } from "convex/values";

export const getByWorkspace = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("tasks")
      .withIndex("by_workspace", (q) => q.eq("workspaceId", args.workspaceId))
      .filter((q) => q.eq(q.field("isDeleted"), false))
      .order("desc")
      .collect();
  },
});

export const getByAssignee = query({
  args: { assigneeId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("tasks")
      .withIndex("by_assignee", (q) => q.eq("assigneeId", args.assigneeId))
      .filter((q) => q.eq(q.field("isDeleted"), false))
      .order("desc")
      .collect();
  },
});

export const search = query({
  args: { query: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("tasks")
      .withSearchIndex("search_title", (q) => q.search("title", args.query))
      .filter((q) => q.eq(q.field("isDeleted"), false))
      .take(50);
  },
});
