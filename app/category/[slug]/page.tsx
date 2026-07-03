import { notFound } from "next/navigation";
import { createClient } from "../../../lib/supabase";

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

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = createClient();

  const { data: categories } = await supabase
    .from("categories")
    .select("name")
    .eq("site", "indiehacker.blog");

  const allCategories = categories || [];
  const match = allCategories.find(
    (c) => categorySlug(c.name) === params.slug
  );

  if (!match) notFound();

  const { data: posts } = await supabase
    .from("posts")
    .select("title, slug, category, published_at")
    .eq("target_site", "indiehacker.blog")
    .eq("status", "published")
    .eq("category", match.name)
    .order("published_at", { ascending: false });

  const allPosts = posts || [];
  const yearGroups = groupByYear(allPosts);

  return (
    <div className="flex min-h-screen">
      <aside className="w-[260px] shrink-0 bg-paper border-r border-ink/10 px-8 py-11">
        <a href="/" className="inline-block">
          <span className="text-lg font-medium relative">
            indiehacker
            <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-ink" />
          </span>
        </a>

        <nav className="flex flex-col gap-3 mt-10 text-[15px]">
          <a href="/" className="text-muted">
            Latest
          </a>
          {allCategories.map((category) => (
            <a
              key={category.name}
              href={`/category/${categorySlug(category.name)}`}
              className={
                category.name === match.name
                  ? "text-ink font-medium"
                  : "text-muted"
              }
            >
              {category.name}
            </a>
          ))}
          <a href="/about" className="text-muted mt-[6px]">
            About
          </a>
        </nav>

        <p className="text-xs text-faint mt-10">hello@indiehacker.blog</p>
      </aside>

      <main className="flex-1 flex justify-center px-10 py-11">
        <div className="w-full max-w-2xl">
          <h1 className="text-2xl font-bold text-ink text-center leading-snug mb-12">
            {match.name}
          </h1>

          {allPosts.length === 0 && (
            <p className="text-muted text-center mb-10">
              No posts in this category yet.
            </p>
          )}

          {yearGroups.map(({ year, posts: yearPosts }) => (
            <section key={year} className="mb-2">
              <p className="text-base font-semibold text-ink mb-2">{year}</p>
              <div className="border-t border-ink/10" />
              {yearPosts.map((post) => (
                <a
                  key={post.slug}
                  href={`/posts/${post.slug}`}
                  className="flex items-baseline justify-between gap-4 py-4 border-b border-ink/5 hover:opacity-70"
                >
                  <span className="text-[17px] text-ink leading-snug">
                    {post.title}
                  </span>
                  <span className="text-sm text-faint whitespace-nowrap">
                    {formatDate(post.published_at)}
                  </span>
                </a>
              ))}
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
