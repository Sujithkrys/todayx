import { v } from "convex/values";

export const createTaskArgs = {
  workspaceId: v.id("workspaces"),
  projectId: v.optional(v.id("projects")),
  assigneeId: v.optional(v.id("users")),
  title: v.string(),
  description: v.optional(v.string()),
  status: v.union(v.literal("todo"), v.literal("in_progress"), v.literal("done")),
  priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
  dueDate: v.optional(v.number()),
};

export const updateTaskArgs = {
  taskId: v.id("tasks"),
  projectId: v.optional(v.id("projects")),
  assigneeId: v.optional(v.id("users")),
  title: v.optional(v.string()),
  description: v.optional(v.string()),
  status: v.optional(v.union(v.literal("todo"), v.literal("in_progress"), v.literal("done"))),
  priority: v.optional(v.union(v.literal("low"), v.literal("medium"), v.literal("high"))),
  dueDate: v.optional(v.number()),
};
