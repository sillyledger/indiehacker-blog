import { notFound } from "next/navigation";
import { createClient } from "../../../lib/supabase";
import { getCategoryMeta } from "../../../lib/categoryMeta";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const revalidate = 60;

function categorySlug(category: string) {
  return category.toLowerCase().replace(/\s+/g, "-");
}

type PostRow = {
  title: string;
  slug: string;
  category: string | null;
  published_at: string;
  content: string | null;
};

function groupByYear(posts: PostRow[]) {
  const groups: { year: string; posts: PostRow[] }[] = [];
  for (const post of posts) {
    const year = post.published_at.slice(0, 4);
    const current = groups[groups.length - 1];
    if (current && current.year === year) {
      current.posts.push(post);
    } else {
      groups.push({ year, posts: [post] });
    }
  }
  return groups;
}

function formatDate(iso: string) {
  const [year, month, day] = iso.slice(0, 10).split("-");
  return `${month}-${day}-${year}`;
}

function excerpt(html: string, maxLen = 120) {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).replace(/\s+\S*$/, "") + "…";
}

// Mirrors the cat.* colors in tailwind.config.js — needed as raw hex here
// since the timeline nodes are inline-styled, not Tailwind classes.
const CATEGORY_HEX: Record<string, string> = {
  thoughts: "#7DD48B",
  money: "#E8AC3D",
  marketing: "#F2789F",
  building: "#4FD1C5",
  productivity: "#B79CF2",
  "my launches": "#6C93FF",
};

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = createClient();

  const { data: allRows } = await supabase
    .from("posts")
    .select("title, slug, category, published_at, content")
    .eq("target_site", "indiehacker.blog")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  const rows = allRows || [];

  const categoryNames = Array.from(
    new Set(
      rows
        .map((r) => r.category)
        .filter((c): c is string => !!c && c.trim().length > 0)
    )
  ).sort((a, b) => a.localeCompare(b));

  const match = categoryNames.find((name) => categorySlug(name) === params.slug);

  if (!match) notFound();

  const categoryPosts = rows.filter((r) => r.category === match);
  const yearGroups = groupByYear(categoryPosts);

  return (
    <>
      <Header activeHref={`/category/${params.slug}`} />

      <main className="max-w-[1040px] mx-auto px-6 md:px-10 pt-14 pb-24">
        <div className="flex items-center justify-center gap-3 mb-12">
          <span
            className={`w-2.5 h-2.5 rounded-full ${getCategoryMeta(match).dot}`}
          />
          <h1
            className="text-center"
            style={{ fontWeight: 800, letterSpacing: "-0.02em", fontSize: "28px" }}
          >
            {match}
          </h1>
        </div>

        {categoryPosts.length === 0 && (
          <p className="text-faint text-center mb-10">
            No posts in this category yet.
          </p>
        )}

        <div className="relative">
          {categoryPosts.length > 0 && (
            <div
              className="absolute top-2 bottom-2 left-6"
              style={{ borderLeft: "1.3px dashed #3A3A42" }}
            />
          )}

          {yearGroups.map(({ year, posts: yearPosts }) => {
            const hex = CATEGORY_HEX[match.toLowerCase()] || "#6C93FF";
            return (
              <div key={year}>
                <div className="relative pl-[60px] mb-7">
                  <span className="absolute left-4 top-0.5 w-4 h-4 rounded-full bg-canvas border-[1.5px] border-accent" />
                  <span className="text-xl font-extrabold tracking-tight">{year}</span>
                </div>

                {yearPosts.map((post) => (
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
                      <span>{match.toUpperCase()}</span>
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
                ))}
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </>
  );
}
