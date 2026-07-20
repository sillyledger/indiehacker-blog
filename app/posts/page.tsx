import { createClient } from "../../lib/supabase";
import { CATEGORY_HEX, excerpt, formatDate, groupByYear } from "../../lib/postDisplay";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const revalidate = 60;

export default async function AllPostsPage() {
  const supabase = createClient();

  const { data: allRows } = await supabase
    .from("posts")
    .select("title, slug, category, published_at, content")
    .eq("target_site", "indiehacker.blog")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  const posts = allRows || [];
  const yearGroups = groupByYear(posts);

  return (
    <>
      <Header activeHref="/posts" />

      <main className="max-w-[1040px] mx-auto px-6 md:px-10 pt-14 pb-24">
        <div className="text-center mb-12">
          <p className="font-mono text-[13px] text-faint mb-3">// all posts</p>
          <h1
            style={{ fontWeight: 800, letterSpacing: "-0.02em", fontSize: "28px" }}
          >
            Everything I&rsquo;ve written
          </h1>
          <p className="text-faint text-[14px] mt-3">
            {posts.length} posts, newest first
          </p>
        </div>

        {posts.length === 0 && (
          <p className="text-faint text-center mb-10">No posts yet.</p>
        )}

        <div className="relative">
          {posts.length > 0 && (
            <div
              className="absolute top-2 bottom-2 left-6"
              style={{ borderLeft: "1.3px dashed #3A3A42" }}
            />
          )}

          {yearGroups.map(({ year, posts: yearPosts }) => (
            <div key={year}>
              <div className="relative pl-[60px] mb-7">
                <span className="absolute left-4 top-0.5 w-4 h-4 rounded-full bg-canvas border-[1.5px] border-accent" />
                <span className="text-xl font-extrabold tracking-tight">{year}</span>
              </div>

              {yearPosts.map((post) => {
                const hex = post.category
                  ? CATEGORY_HEX[post.category.toLowerCase()] || "#6C93FF"
                  : "#6C93FF";
                return (
                  <a
                    key={post.slug}
                    href={`/posts/${post.slug}`}
                    className="group relative block pl-[60px] mb-11"
                  >
                    <span
                      className="absolute left-[19px] top-[7px] w-2.5 h-2.5 rounded-[2px]"
                      style={{ background: hex, transform: "rotate(45deg)" }}
                    />
                    <span
                      className="absolute left-[29px] top-[11px] w-[31px]"
                      style={{ borderTop: "1.2px dashed #3A3A42" }}
                    />
                    <div
                      className="flex items-center gap-2 font-mono text-[12px] mb-1.5"
                      style={{ color: hex }}
                    >
                      <span>{(post.category || "").toUpperCase()}</span>
                      <span className="text-faint">· {formatDate(post.published_at)}</span>
                    </div>
                    <h3
                      className="mb-1.5 group-hover:text-accent transition-colors"
                      style={{ fontWeight: 700, fontSize: "20px", lineHeight: 1.3 }}
                    >
                      {post.title}
                    </h3>
                    {post.content && (
                      <p className="text-[14px] leading-relaxed text-muted max-w-[560px]">
                        {excerpt(post.content)}
                      </p>
                    )}
                  </a>
                );
              })}
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
