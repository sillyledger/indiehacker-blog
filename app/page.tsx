import { createClient } from "../lib/supabase";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const revalidate = 60;

function categorySlug(category: string) {
  return category.toLowerCase().replace(/\s+/g, "-");
}

function formatDate(iso: string) {
  const [year, month, day] = iso.slice(0, 10).split("-");
  return `${month}-${day}-${year}`;
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

// Category -> color + tagline, keyed by lowercase category name.
// These reference literal Tailwind classes (defined in tailwind.config.js)
// rather than being built with string interpolation like `text-cat-${slug}` —
// Tailwind's build-time scanner only picks up class names it can see
// literally in the source, so a dynamically-constructed class name would
// silently produce no CSS in production.
const categoryMeta: Record<
  string,
  { dot: string; hoverBorder: string; tagline: string }
> = {
  thoughts: {
    dot: "bg-cat-thoughts",
    hoverBorder: "hover:border-cat-thoughts",
    tagline: "Reflections on building alone.",
  },
  money: {
    dot: "bg-cat-money",
    hoverBorder: "hover:border-cat-money",
    tagline: "The financial reality nobody posts.",
  },
  marketing: {
    dot: "bg-cat-marketing",
    hoverBorder: "hover:border-cat-marketing",
    tagline: "Getting found without a budget.",
  },
  building: {
    dot: "bg-cat-building",
    hoverBorder: "hover:border-cat-building",
    tagline: "What's actually shipping.",
  },
  productivity: {
    dot: "bg-cat-productivity",
    hoverBorder: "hover:border-cat-productivity",
    tagline: "Systems for actually getting things done.",
  },
  // Key must match the exact category name (lowercased) you type into
  // RyokaOS — if you name it anything other than "My Launches" this
  // won't match and it'll fall back to the generic accent-blue style.
  "my launches": {
    dot: "bg-cat-my-launches",
    hoverBorder: "hover:border-cat-my-launches",
    tagline: "New things I've built, out in the open.",
  },
};

function getCategoryMeta(name: string) {
  return (
    categoryMeta[name.toLowerCase()] || {
      dot: "bg-accent",
      hoverBorder: "hover:border-accent",
      tagline: `Posts about ${name}.`,
    }
  );
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
  // Hard capped at 6 — matches the "never more than 6 categories" rule
  // the node-map layout is designed around.
  const allCategories = (categories || []).slice(0, 6);
  const yearGroups = groupByYear(allPosts);

  const categoryCounts: Record<string, number> = {};
  for (const post of allPosts) {
    if (post.category) {
      categoryCounts[post.category] = (categoryCounts[post.category] || 0) + 1;
    }
  }

  return (
    <>
      <Header activeHref="/" />

      {/* ============ HERO ============ */}
      <section className="max-w-[1180px] mx-auto px-6 md:px-10 pt-14 pb-6 text-center">
        <p className="font-mono text-[13px] text-faint mb-4">
          // solo-founder log
        </p>
        <h1
          className="mx-auto"
          style={{
            fontWeight: 800,
            letterSpacing: "-0.03em",
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            lineHeight: 1.15,
            maxWidth: "720px",
          }}
        >
          I write about building alone,{" "}
          <span className="text-accent">and what nobody warns you about.</span>
        </h1>

        {allCategories.length > 0 && (
          <div className="w-px h-10 bg-line mx-auto mt-10" />
        )}
      </section>

      {/* ============ CATEGORY NODE MAP ============ */}
      {allCategories.length > 0 && (
        <section className="max-w-[1180px] mx-auto px-6 md:px-10 pb-20">
          <div className="h-px w-full bg-line" />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-5 gap-y-10">
            {allCategories.map((category) => {
              const meta = getCategoryMeta(category.name);
              const count = categoryCounts[category.name] || 0;
              return (
                <div key={category.name} className="flex flex-col items-center">
                  <div className="w-px h-[22px] bg-line" />
                  <div className={`w-[9px] h-[9px] rounded-full ${meta.dot}`} />
                  <a
                    href={`/category/${categorySlug(category.name)}`}
                    className={`mt-3 w-full rounded-[14px] border border-line bg-paper p-[18px] transition-colors ${meta.hoverBorder}`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
                      <span className="font-mono text-[12px] uppercase tracking-wide">
                        {category.name}
                      </span>
                    </div>
                    <p className="text-[13px] leading-snug text-faint mb-3">
                      {meta.tagline}
                    </p>
                    <span className="font-mono text-[11px] text-faint">
                      {count} {count === 1 ? "entry" : "entries"}
                    </span>
                  </a>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ============ LATEST POSTS (plain list, no cards) ============ */}
      <main className="max-w-[1180px] mx-auto px-6 md:px-10 pb-24">
        <p className="font-mono text-[13px] text-faint mb-10">LATEST POSTS</p>

        {allPosts.length === 0 && (
          <p className="text-faint text-center mb-10">No posts yet.</p>
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
