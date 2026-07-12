import { v } from "convex/values";

export const createNotificationArgs = {
  userId: v.id("users"),
  type: v.string(),
  title: v.string(),
  message: v.string(),
  link: v.optional(v.string()),
};

export const markAsReadArgs = {
  notificationId: v.id("notifications"),
};

export const markAllAsReadArgs = {
  userId: v.id("users"),
};
