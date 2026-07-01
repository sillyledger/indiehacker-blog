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

export default function Home() {
  const categories = getCategories(posts);

  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <nav className="flex items-center justify-between border-b border-ink/10 pb-4 mb-10 flex-wrap gap-y-3">
        <a href="/" className="inline-block">
          <span className="text-lg font-medium relative">
            indiehacker
            <span className="absolute left-0 -bottom-1 h-[3px] w-full bg-ink" />
          </span>
        </a>
        <div className="flex gap-5 text-sm text-muted flex-wrap">
          <a href="/">Latest</a>
          {categories.map((category) => (
            <a key={category} href={`/category/${categorySlug(category)}`}>
              {category}
            </a>
          ))}
          <a href="/about">About</a>
        </div>
      </nav>

      <section className="mb-10">
        <h1 className="text-[28px] font-normal leading-snug">
          I write about building alone, and what nobody warns you about.
        </h1>
      </section>

      <section className="flex flex-col">
        {posts.map((post) => (
          <a
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="border-t border-ink/10 py-5 first:pt-5 block hover:opacity-80"
          >
            <p className="text-xs text-faint mb-1">{post.category}</p>
            <h3 className="text-[17px] font-medium mb-1">{post.title}</h3>
            <p className="text-sm text-muted leading-relaxed">{post.hook}</p>
          </a>
        ))}
      </section>

      <section className="mt-10 bg-surface rounded-xl px-6 py-5 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <p className="text-[15px] font-medium mb-1">
            One honest read a week
          </p>
          <p className="text-sm text-muted">
            No growth hacks. Just what building alone actually looks like.
          </p>
        </div>
        <input
          type="email"
          placeholder="name@email.com"
          className="w-[200px] h-9 px-3 rounded-md border border-ink/15 bg-paper text-ink text-sm"
        />
      </section>
    </main>
  );
}
