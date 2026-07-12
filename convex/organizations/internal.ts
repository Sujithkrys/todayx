import { internalMutation } from "../_generated/server";
import { v } from "convex/values";

// Example of an internal mutation that bypasses standard auth/logic checks
export const internalHardDelete = internalMutation({
  args: { organizationId: v.id("organizations") },
  handler: async (ctx, args) => {
    const members = await ctx.db
      .query("organizationMembers")
      .withIndex("by_organization", (q) => q.eq("organizationId", args.organizationId))
      .collect();

    // Delete members first
    for (const member of members) {
      await ctx.db.delete(member._id);
    }
    
    // Delete org
    await ctx.db.delete(args.organizationId);
  },
});
