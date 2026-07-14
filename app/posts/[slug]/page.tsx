import { notFound } from "next/navigation";
import { createClient } from "../../../lib/supabase";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

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

// Same map as app/page.tsx. Duplicated for now rather than shared —
// worth extracting to lib/categoryMeta.ts once category/[slug]/page.tsx
// needs it too, so there's one place to update instead of three.
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

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .post-body p { margin: 0 0 1.5rem; line-height: 1.75; font-size: 18px; color: #EDEDF0; }
            .post-body h2 { font-family: var(--font-dm-sans); font-weight: 800; letter-spacing: -0.02em; font-size: 28px; margin: 2em 0 0.75em; line-height: 1.2; color: #EDEDF0; }
            .post-body h3 { font-weight: 700; font-size: 20px; margin: 1.75rem 0 0.5rem; color: #EDEDF0; }
            .post-body ul { list-style: disc; padding-left: 1.4rem; margin: 0 0 1.5rem; color: #EDEDF0; }
            .post-body ol { list-style: decimal; padding-left: 1.4rem; margin: 0 0 1.5rem; color: #EDEDF0; }
            .post-body li { margin-bottom: 0.4rem; line-height: 1.75; font-size: 18px; }
            .post-body a { color: #EDEDF0; text-decoration: underline; text-decoration-color: #313138; text-underline-offset: 3px; }
            .post-body a:hover { color: #6C93FF; text-decoration-color: #6C93FF; }
            .post-body blockquote { font-weight: 700; letter-spacing: -0.01em; font-size: 26px; line-height: 1.35; color: #EDEDF0; border-left: 3px solid #6C93FF; padding-left: 1.25rem; margin: 2.5em 0; max-width: 32ch; }
            .post-body img { max-width: 100%; border-radius: 12px; margin: 1.5rem 0; }
          `,
        }}
      />

      <Header
        activeHref={
          post.category ? `/category/${categorySlug(post.category)}` : "/"
        }
      />

      <main className="max-w-[820px] mx-auto px-6 md:px-10 pt-8 pb-24">
        <div className="flex items-center gap-2 text-[13px] font-mono text-faint mb-6">
          {post.category && (
            <>
              <a
                href={`/category/${categorySlug(post.category)}`}
                className="flex items-center gap-2 hover:text-ink transition-colors"
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${getCategoryDot(
                    post.category
                  )}`}
                />
                {post.category}
              </a>
              <span>·</span>
            </>
          )}
          <span>{formatDate(post.published_at)}</span>
          <span>·</span>
          <span>{readTime(post.content || "")} min read</span>
        </div>

        <h1
          className="mb-10"
          style={{
            fontWeight: 800,
            letterSpacing: "-0.03em",
            fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
            lineHeight: 1.05,
          }}
        >
          {post.title}
        </h1>

        <article
          className="post-body"
          dangerouslySetInnerHTML={{ __html: post.content || "" }}
        />

        <div className="mt-16 pt-8 border-t border-line flex gap-5">
          <img
            src="/Pieter-Borremans-founder.jpeg"
            alt="Pieter Borremans"
            className="w-14 h-14 shrink-0 rounded-full object-cover border border-line"
          />
          <div>
            <p className="text-base font-semibold mb-1">
              Written by Pieter Borremans
            </p>
            <p className="text-[15px] text-faint leading-relaxed mb-3">
              Pieter Borremans is a writer, content creator, and founder
              based in Taichung, Taiwan and London, UK. He writes about
              entrepreneurship, independent business-building, and the
              unfiltered reality of creating things online, documenting the
              journey publicly on his personal blog, where he holds nothing
              back.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <a
                href="https://pieterborremans.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-faint hover:text-ink transition-colors"
              >
                Personal Blog
              </a>
              <a
                href="https://www.pinterest.com/borremanspieter/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-faint hover:text-ink transition-colors"
              >
                Pinterest
              </a>
              <a
                href="https://open.spotify.com/show/765k4LuyZrS2sYEkXHOZ47?si=008f51f82ca341d9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-faint hover:text-ink transition-colors"
              >
                Spotify
              </a>
              <a
                href="https://www.youtube.com/@PieterBorremans"
                target="_blank"
                rel="noopener noreferrer"
                className="text-faint hover:text-ink transition-colors"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
