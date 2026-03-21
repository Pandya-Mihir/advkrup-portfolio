import { query } from "./_generated/server";

export const getAllPosts = query({
  handler: async (ctx) => {
    return await ctx.db.query("blogPosts").order("desc").collect();
  },
});
