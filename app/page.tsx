import { createClient } from "../lib/supabase";

export const revalidate = 60;

function categorySlug(category: string) {
  return category.toLowerCase().replace(/\s+/g, "-");
}

function groupByYear(posts: { published_at: string }[]) {
  const groups: { year: string; posts: typeof posts }[] = [];
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

export default async function Home() {
  const supabase = createClient();

  const { data: posts } = await supabase
    .from("posts")
    .select("title, slug, category, published_at")
    .eq("target_site", "indiehacker.blog")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  const { data: categories } = await supabase
    .from("categories")
    .select("name")
    .eq("site", "indiehacker.blog");

  const allPosts = posts || [];
  const allCategories = categories || [];
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
          <a href="/" className="text-ink font-medium">
            Latest
          </a>
          {allCategories.map((category) => (
            
              key={category.name}
              href={`/category/${categorySlug(category.name)}`}
              className="text-muted"
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
            I write about building alone, and what nobody warns you about.
          </h1>

          {allPosts.length === 0 && (
            <p className="text-muted text-center mb-10">No posts yet.</p>
          )}

          {yearGroups.map(({ year, posts: yearPosts }) => (
            <section key={year} className="mb-2">
              <p className="text-base font-semibold text-ink mb-2">{year}</p>
              <div className="border-t border-ink/10" />
              {yearPosts.map((post) => (
                
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

          <section className="mt-10 bg-paper rounded-xl px-6 py-5">
            <p className="text-lg font-medium mb-1">One honest read a week</p>
            <p className="text-base text-muted mb-4">
              No growth hacks. Just what building alone actually looks like.
            </p>
            <input
              type="email"
              placeholder="name@email.com"
              className="w-[220px] h-10 px-3 rounded-md border border-ink/15 bg-canvas text-base"
            />
          </section>
        </div>
      </main>
    </div>
  );
}
