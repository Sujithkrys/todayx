import { mutation } from "../_generated/server";
import { createOrgArgs, updateOrgArgs, addMemberArgs } from "./validators";
import { v } from "convex/values";

export const create = mutation({
  args: createOrgArgs,
  handler: async (ctx, args) => {
    // Check slug uniqueness
    const existing = await ctx.db
      .query("organizations")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
    if (existing) throw new Error("Organization slug already in use");

    const orgId = await ctx.db.insert("organizations", {
      name: args.name,
      slug: args.slug,
      logoUrl: args.logoUrl,
      isDeleted: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    // Add creator as owner
    await ctx.db.insert("organizationMembers", {
      organizationId: orgId,
      userId: args.creatorId,
      role: "owner",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return orgId;
  },
});

export const update = mutation({
  args: updateOrgArgs,
  handler: async (ctx, args) => {
    const { organizationId, ...updates } = args;
    await ctx.db.patch(organizationId, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

export const addMember = mutation({
  args: addMemberArgs,
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("organizationMembers")
      .withIndex("by_org_and_user", (q) => 
        q.eq("organizationId", args.organizationId).eq("userId", args.userId)
      )
      .unique();

    if (existing) throw new Error("User is already a member");

    await ctx.db.insert("organizationMembers", {
      ...args,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const removeMember = mutation({
  args: { organizationId: v.id("organizations"), userId: v.id("users") },
  handler: async (ctx, args) => {
    const member = await ctx.db
      .query("organizationMembers")
      .withIndex("by_org_and_user", (q) => 
        q.eq("organizationId", args.organizationId).eq("userId", args.userId)
      )
      .unique();

    if (!member) throw new Error("Member not found");
    if (member.role === "owner") throw new Error("Cannot remove the owner");

    await ctx.db.delete(member._id);
  },
});

export const softDelete = mutation({
  args: { organizationId: v.id("organizations") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.organizationId, {
      isDeleted: true,
      updatedAt: Date.now(),
    });
  },
});
