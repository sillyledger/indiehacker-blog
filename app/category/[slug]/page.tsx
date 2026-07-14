import { notFound } from "next/navigation";
import { createClient } from "../../../lib/supabase";
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

// Same map as app/page.tsx and app/posts/[slug]/page.tsx. Third copy —
// this is the point where it's genuinely worth pulling into
// lib/categoryMeta.ts so a color/tagline change only has to happen once.
const categoryMeta: Record<string, { dot: string }> = {
  thoughts: { dot: "bg-cat-thoughts" },
  money: { dot: "bg-cat-money" },
  marketing: { dot: "bg-cat-marketing" },
  building: { dot: "bg-cat-building" },
  productivity: { dot: "bg-cat-productivity" },
  "my launches": { dot: "bg-cat-my-launches" },
};

function getCategoryDot(name: string) {
  return (categoryMeta[name.toLowerCase()] || { dot: "bg-accent" }).dot;
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = createClient();

  const { data: allRows } = await supabase
    .from("posts")
    .select("title, slug, category, published_at")
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

      <main className="max-w-[1180px] mx-auto px-6 md:px-10 pt-14 pb-24">
        <div className="flex items-center justify-center gap-3 mb-12">
          <span className={`w-2.5 h-2.5 rounded-full ${getCategoryDot(match)}`} />
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

        {yearGroups.map(({ year, posts: yearPosts }) => (
          <section key={year} className="mb-2">
            <p className="text-base font-semibold mb-2">{year}</p>
            <div className="border-t border-line" />
            {yearPosts.map((post) => (
              <a
                key={post.slug}
                href={`/posts/${post.slug}`}
                className="block py-8 group border-b border-line"
              >
                <span className="font-mono text-[13px] text-faint">
                  {formatDate(post.published_at)}
                </span>
                <h3
                  className="mt-2 group-hover:text-accent transition-colors"
                  style={{ fontWeight: 700, fontSize: "22px", lineHeight: 1.25 }}
                >
                  {post.title}
                </h3>
              </a>
            ))}
          </section>
        ))}
      </main>

      <Footer />
    </>
  );
}
