import { v } from "convex/values";

export const createConversationArgs = {
  workspaceId: v.id("workspaces"),
  userId: v.id("users"),
  title: v.optional(v.string()),
};

export const updateConversationArgs = {
  conversationId: v.id("conversations"),
  title: v.optional(v.string()),
  isPinned: v.optional(v.boolean()),
};

export const sendMessageArgs = {
  conversationId: v.id("conversations"),
  role: v.union(v.literal("user"), v.literal("assistant"), v.literal("system")),
  content: v.string(),
  tokensUsed: v.optional(v.number()),
};
