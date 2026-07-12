import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
    isDeleted: v.boolean(),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_email", ["email"]),

  userPreferences: defineTable({
    userId: v.id("users"),
    theme: v.union(v.literal("light"), v.literal("dark"), v.literal("system")),
    emailNotifications: v.boolean(),
    pushNotifications: v.boolean(),
    sidebarExpanded: v.boolean(),
    updatedAt: v.number(),
  }).index("by_user", ["userId"]),

  organizations: defineTable({
    name: v.string(),
    slug: v.string(),
    logoUrl: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
    isDeleted: v.boolean(),
  }).index("by_slug", ["slug"]),

  organizationMembers: defineTable({
    organizationId: v.id("organizations"),
    userId: v.id("users"),
    role: v.union(v.literal("owner"), v.literal("admin"), v.literal("member")),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_organization", ["organizationId"])
    .index("by_user", ["userId"])
    .index("by_org_and_user", ["organizationId", "userId"]),

  workspaces: defineTable({
    organizationId: v.id("organizations"),
    name: v.string(),
    slug: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
    isDeleted: v.boolean(),
  })
    .index("by_organization", ["organizationId"])
    .index("by_slug", ["slug"]),

  projects: defineTable({
    workspaceId: v.id("workspaces"),
    name: v.string(),
    description: v.optional(v.string()),
    status: v.union(v.literal("active"), v.literal("archived"), v.literal("completed")),
    createdAt: v.number(),
    updatedAt: v.number(),
    isDeleted: v.boolean(),
  }).index("by_workspace", ["workspaceId"]),

  conversations: defineTable({
    workspaceId: v.id("workspaces"),
    userId: v.id("users"),
    title: v.optional(v.string()),
    isPinned: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
    isDeleted: v.boolean(),
  })
    .index("by_workspace", ["workspaceId"])
    .index("by_user", ["userId"])
    .index("by_user_and_workspace", ["userId", "workspaceId"]),

  messages: defineTable({
    conversationId: v.id("conversations"),
    role: v.union(v.literal("user"), v.literal("assistant"), v.literal("system")),
    content: v.string(),
    tokensUsed: v.optional(v.number()),
    createdAt: v.number(),
    isDeleted: v.boolean(),
  })
    .index("by_conversation", ["conversationId"])
    .searchIndex("search_content", { searchField: "content" }),

  tasks: defineTable({
    workspaceId: v.id("workspaces"),
    projectId: v.optional(v.id("projects")),
    assigneeId: v.optional(v.id("users")),
    title: v.string(),
    description: v.optional(v.string()),
    status: v.union(v.literal("todo"), v.literal("in_progress"), v.literal("done")),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    dueDate: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
    isDeleted: v.boolean(),
  })
    .index("by_workspace", ["workspaceId"])
    .index("by_project", ["projectId"])
    .index("by_assignee", ["assigneeId"])
    .searchIndex("search_title", { searchField: "title" }),

  notifications: defineTable({
    userId: v.id("users"),
    type: v.string(), // e.g., 'task_assigned', 'mention', 'system_alert'
    title: v.string(),
    message: v.string(),
    link: v.optional(v.string()),
    isRead: v.boolean(),
    createdAt: v.number(),
  }).index("by_user_and_read", ["userId", "isRead"]),

  integrations: defineTable({
    workspaceId: v.id("workspaces"),
    provider: v.union(v.literal("slack"), v.literal("notion"), v.literal("linear"), v.literal("github")),
    isActive: v.boolean(),
    config: v.optional(v.any()), // JSON payload of config
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_workspace", ["workspaceId"]),

  oauthConnections: defineTable({
    userId: v.id("users"),
    provider: v.string(), // e.g., 'google', 'microsoft'
    providerAccountId: v.string(),
    accessToken: v.string(),
    refreshToken: v.optional(v.string()),
    expiresAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_provider_and_account", ["provider", "providerAccountId"]),

  agents: defineTable({
    workspaceId: v.id("workspaces"),
    name: v.string(),
    description: v.optional(v.string()),
    systemPrompt: v.string(),
    model: v.string(),
    isActive: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
    isDeleted: v.boolean(),
  }).index("by_workspace", ["workspaceId"]),

  agentExecutions: defineTable({
    agentId: v.id("agents"),
    workspaceId: v.id("workspaces"),
    triggeredByUserId: v.optional(v.id("users")),
    action: v.string(),
    status: v.union(v.literal("pending"), v.literal("running"), v.literal("success"), v.literal("failed")),
    logs: v.optional(v.array(v.string())),
    startedAt: v.number(),
    completedAt: v.optional(v.number()),
  })
    .index("by_agent", ["agentId"])
    .index("by_workspace", ["workspaceId"]),

  activityLogs: defineTable({
    workspaceId: v.id("workspaces"),
    userId: v.id("users"),
    entityType: v.string(), // e.g., 'task', 'project', 'integration'
    entityId: v.string(),
    action: v.string(), // e.g., 'created', 'updated', 'deleted'
    metadata: v.optional(v.any()),
    createdAt: v.number(),
  })
    .index("by_workspace", ["workspaceId"])
    .index("by_user", ["userId"])
    .index("by_entity", ["entityType", "entityId"]),
});
