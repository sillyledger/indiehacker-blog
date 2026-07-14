import { MetadataRoute } from "next";
import { createClient } from "../lib/supabase";

function categorySlug(category: string) {
  return category.toLowerCase().replace(/\s+/g, "-");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient();

  const { data: posts } = await supabase
    .from("posts")
    .select("slug, category, published_at")
    .eq("target_site", "indiehacker.blog")
    .eq("status", "published");

  const allPosts = posts || [];

  const categoryNames = Array.from(
    new Set(
      allPosts
        .map((p) => p.category)
        .filter((c): c is string => !!c && c.trim().length > 0)
    )
  );

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: "https://www.indiehacker.blog", lastModified: new Date() },
    { url: "https://www.indiehacker.blog/about", lastModified: new Date() },
    { url: "https://www.indiehacker.blog/projects", lastModified: new Date() },
  ];

  const postRoutes: MetadataRoute.Sitemap = allPosts.map((post) => ({
    url: `https://www.indiehacker.blog/posts/${post.slug}`,
    lastModified: new Date(post.published_at),
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categoryNames.map((name) => ({
    url: `https://www.indiehacker.blog/category/${categorySlug(name)}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...postRoutes, ...categoryRoutes];
}
