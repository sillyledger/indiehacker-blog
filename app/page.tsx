import { posts } from "./data";

// Nav categories are derived from the posts themselves, so adding a new
// category tag to a post automatically surfaces it in the nav — no more
// nav/tag drift like "Decisions" and "Roadmaps" being untagged before.
function categorySlug(category: string) {
  return category.toLowerCase().replace(/\s+/g, "-");
}

function getCategories(allPosts: typeof posts) {
  const seen = new Set<string>();
  const categories: string[] = [];
  for (const post of allPosts) {
    if (!seen.has(post.category)) {
      seen.add(post.category);
      categories.push(post.category);
    }
  }
  return categories;
}

// Groups posts by year while preserving order, assuming posts are already
// sorted newest-first in data.ts.
function groupByYear(allPosts: typeof posts) {
  const groups: { year: string; posts: typeof posts }[] = [];
  for (const post of allPosts) {
    const year = post.date.slice(0, 4);
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
  const [year, month, day] = iso.split("-");
  return `${month}-${day}-${year}`;
}

export default function Home() {
  const categories = getCategories(posts);
  const yearGroups = groupByYear(posts);

  return (
    <div className="flex min-h-screen">
      <aside className="w-[260px] shrink-0 bg-paper border-r border-ink/10 px-8 py-11">
        <a href="/" className="inline-block">
          <span className="text-lg font-medium relative">
            indiehacker
            <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-ink" />
          </span>
        </a>

        <nav className="flex flex-col gap-[10px] mt-10 text-sm">
          <a href="/" className="text-ink font-medium">
            Latest
          </a>
          {categories.map((category) => (
            <a
              key={category}
              href={`/category/${categorySlug(category)}`}
              className="text-muted"
            >
              {category}
            </a>
          ))}
          <a href="/about" className="text-muted mt-[6px]">
            About
          </a>
        </nav>

        <p className="text-sm text-muted leading-relaxed mt-10 max-w-[190px]">
          I write about building alone, and what nobody warns you about.
        </p>

        <p className="text-xs text-faint mt-8">hello@indiehacker.blog</p>
      </aside>

      <main className="flex-1 px-10 py-11 max-w-2xl">
        {yearGroups.map(({ year, posts: yearPosts }) => (
          <section key={year} className="mb-2">
            <p className="text-sm font-semibold text-ink mb-2">{year}</p>
            <div className="border-t border-ink/10" />
            {yearPosts.map((post) => (
              <a
                key={post.slug}
                href={`/posts/${post.slug}`}
                className="flex items-baseline justify-between gap-4 py-[13px] border-b border-ink/5 hover:opacity-70"
              >
                <span className="text-[15px] text-ink leading-snug">
                  {post.title}
                </span>
                <span className="text-xs text-faint whitespace-nowrap">
                  {formatDate(post.date)}
                </span>
              </a>
            ))}
          </section>
        ))}

        <section className="mt-10 bg-paper rounded-xl px-6 py-5">
          <p className="text-[15px] font-medium mb-1">
            One honest read a week
          </p>
          <p className="text-sm text-muted mb-4">
            No growth hacks. Just what building alone actually looks like.
          </p>
          <input
            type="email"
            placeholder="name@email.com"
            className="w-[220px] h-9 px-3 rounded-md border border-ink/15 bg-canvas text-sm"
          />
        </section>
      </main>
    </div>
  );
}
