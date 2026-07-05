import { notFound } from "next/navigation";
import { createClient } from "../../../lib/supabase";

export const revalidate = 60;

function categorySlug(category: string) {
  return category.toLowerCase().replace(/\s+/g, "-");
}

function formatDate(iso: string) {
  const [year, month, day] = iso.slice(0, 10).split("-");
  return `${month}-${day}-${year}`;
}

function readTime(html: string) {
  const text = html.replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = createClient();

  const { data: post } = await supabase
    .from("posts")
    .select("title, slug, content, category, published_at")
    .eq("target_site", "indiehacker.blog")
    .eq("status", "published")
    .eq("slug", params.slug)
    .single();

  if (!post) notFound();

  const { data: categories } = await supabase
    .from("categories")
    .select("name")
    .eq("site", "indiehacker.blog");

  const allCategories = categories || [];

  return (
    <div className="flex min-h-screen">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .post-body p { margin: 0 0 1.25rem; line-height: 1.7; font-size: 17px; color: #1a1a1a; }
            .post-body h2 { font-size: 22px; font-weight: 600; margin: 2rem 0 0.75rem; color: #1a1a1a; }
            .post-body h3 { font-size: 18px; font-weight: 600; margin: 1.75rem 0 0.5rem; color: #1a1a1a; }
            .post-body ul { list-style: disc; padding-left: 1.4rem; margin: 0 0 1.25rem; }
            .post-body ol { list-style: decimal; padding-left: 1.4rem; margin: 0 0 1.25rem; }
            .post-body li { margin-bottom: 0.4rem; line-height: 1.7; font-size: 17px; }
            .post-body a { text-decoration: underline; }
            .post-body blockquote { border-left: 3px solid rgba(0,0,0,0.15); padding-left: 1rem; margin: 0 0 1.25rem; color: #555; }
            .post-body img { max-width: 100%; border-radius: 12px; margin: 1.5rem 0; }
          `,
        }}
      />

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
                post.category === category.name
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

        <p className="text-xs text-faint mt-10">p@ryoka.xyz</p>
      </aside>

      <main className="flex-1 flex justify-center px-10 py-11">
        <div className="w-full max-w-2xl">
          <div className="flex items-center gap-3 text-sm text-faint mb-6">
            {post.category && (
              <>
                <a
                  href={`/category/${categorySlug(post.category)}`}
                  className="text-muted hover:opacity-70"
                >
                  {post.category}
                </a>
                <span>·</span>
              </>
            )}
            <span>{formatDate(post.published_at)}</span>
            <span>·</span>
            <span>{readTime(post.content || "")} min read</span>
          </div>

          <h1 className="text-[40px] leading-[1.1] font-bold text-ink tracking-tight mb-10">
            {post.title}
          </h1>

          <article
            className="post-body"
            dangerouslySetInnerHTML={{ __html: post.content || "" }}
          />

          <div className="mt-16 pt-8 border-t border-ink/10 flex gap-5">
            <img
              src="/Pieter-Borremans-founder.jpeg"
              alt="Pieter Borremans"
              className="w-14 h-14 shrink-0 rounded-full object-cover border border-ink/10"
            />
            <div>
              <p className="text-base font-semibold text-ink mb-1">
                Written by Pieter Borremans
              </p>
              <p className="text-[15px] text-muted leading-relaxed mb-3">
                I am a writer, content creator, and founder based in Taiwan and London, UK. I write about entrepreneurship, independent business-building, and the unfiltered reality of creating things online, documenting the journey publicly on his personal blog, where he holds nothing back
              </p>
              <div className="flex items-center gap-4 text-sm">
                <a
                  href="https://pieterborremans.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-ink"
                >
                  Personal Blog
                </a>
                <a
                  href="https://www.pinterest.com/borremanspieter/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-ink"
                >
                  Pinterest
                </a>
                <a
                  href="https://open.spotify.com/show/765k4LuyZrS2sYEkXHOZ47?si=008f51f82ca341d9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-ink"
                >
                  Spotify
                </a>
                <a
                  href="https://www.youtube.com/@PieterBorremans"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-ink"
                >
                  YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
