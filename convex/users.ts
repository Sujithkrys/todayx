import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * Store or update a user upon login
 */
export const store = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }

    // Check if we've already stored this user
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (existingUser !== null) {
      // If we've seen this user before, we can update their details if they changed
      if (
        existingUser.email !== identity.email ||
        existingUser.firstName !== identity.givenName ||
        existingUser.lastName !== identity.familyName ||
        existingUser.imageUrl !== identity.pictureUrl
      ) {
        await ctx.db.patch(existingUser._id, {
          email: identity.email,
          firstName: identity.givenName,
          lastName: identity.familyName,
          imageUrl: identity.pictureUrl,
          updatedAt: Date.now(),
        });
      }
      return existingUser._id;
    }

    // If it's a new user, create a new record
    const newUserId = await ctx.db.insert("users", {
      clerkId: identity.subject,
      email: identity.email!,
      firstName: identity.givenName,
      lastName: identity.familyName,
      imageUrl: identity.pictureUrl,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      isDeleted: false,
    });
    
    // Create default workspace for new user
    const orgId = await ctx.db.insert("organizations", {
      name: `${identity.givenName || "My"} Organization`,
      slug: `org-${identity.subject}`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      isDeleted: false,
    });
    
    await ctx.db.insert("organizationMembers", {
      organizationId: orgId,
      userId: newUserId,
      role: "owner",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    
    await ctx.db.insert("workspaces", {
      organizationId: orgId,
      name: "Personal Workspace",
      slug: "personal",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      isDeleted: false,
    });

    return newUserId;
  },
});

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }
    return await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
  },
});
