import { mutation } from "../_generated/server";
import { createConversationArgs, updateConversationArgs, sendMessageArgs } from "./validators";
import { v } from "convex/values";

export const createConversation = mutation({
  args: createConversationArgs,
  handler: async (ctx, args) => {
    return await ctx.db.insert("conversations", {
      ...args,
      isPinned: false,
      isDeleted: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const updateConversation = mutation({
  args: updateConversationArgs,
  handler: async (ctx, args) => {
    const { conversationId, ...updates } = args;
    await ctx.db.patch(conversationId, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

export const softDeleteConversation = mutation({
  args: { conversationId: v.id("conversations") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.conversationId, {
      isDeleted: true,
      updatedAt: Date.now(),
    });
  },
});

export const sendMessage = mutation({
  args: sendMessageArgs,
  handler: async (ctx, args) => {
    const conversation = await ctx.db.get(args.conversationId);
    if (!conversation || conversation.isDeleted) {
      throw new Error("Conversation not found or deleted");
    }

    const messageId = await ctx.db.insert("messages", {
      ...args,
      isDeleted: false,
      createdAt: Date.now(),
    });

    // Update conversation timestamp
    await ctx.db.patch(args.conversationId, {
      updatedAt: Date.now(),
    });

    return messageId;
  },
});
