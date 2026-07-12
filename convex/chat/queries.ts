import { query } from "../_generated/server";
import { v } from "convex/values";

export const getConversations = query({
  args: { workspaceId: v.id("workspaces"), userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("conversations")
      .withIndex("by_user_and_workspace", (q) => 
        q.eq("userId", args.userId).eq("workspaceId", args.workspaceId)
      )
      .filter((q) => q.eq(q.field("isDeleted"), false))
      .order("desc") // default ordering by _id which effectively is chronologically created
      .collect();
  },
});

export const getMessages = query({
  args: { conversationId: v.id("conversations") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .withIndex("by_conversation", (q) => q.eq("conversationId", args.conversationId))
      .filter((q) => q.eq(q.field("isDeleted"), false))
      .collect();
  },
});

export const searchMessages = query({
  args: { query: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .withSearchIndex("search_content", (q) => q.search("content", args.query))
      .filter((q) => q.eq(q.field("isDeleted"), false))
      .take(50);
  },
});
