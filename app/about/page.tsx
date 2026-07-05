import type { Metadata } from "next";
import { createClient } from "../../lib/supabase";

export const metadata: Metadata = {
  title: "About Pieter Borremans | IndieHacker Blog",
  description:
    "Pieter Borremans is a writer, content creator, and solo founder building micro-SaaS products under Ryoka Group. Based between Taiwan and London.",
  openGraph: {
    title: "About Pieter Borremans | IndieHacker Blog",
    description:
      "Pieter Borremans is a writer, content creator, and solo founder building micro-SaaS products under Ryoka Group. Based between Taiwan and London.",
    images: ["/Pieter-Borremans-founder.jpeg"],
  },
};

function categorySlug(category: string) {
  return category.toLowerCase().replace(/\s+/g, "-");
}

export default async function AboutPage() {
  const supabase = createClient();

  const { data: categories } = await supabase
    .from("categories")
    .select("name")
    .eq("site", "indiehacker.blog");

  const allCategories = categories || [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Pieter Borremans",
    url: "https://www.indiehacker.blog/about",
    image: "https://www.indiehacker.blog/Pieter-Borremans-founder.jpeg",
    jobTitle: "Founder",
    worksFor: {
      "@type": "Organization",
      name: "Ryoka Group",
      url: "https://ryoka.xyz",
    },
    sameAs: [
      "https://pieterborremans.com",
      "https://linkedin.com/in/pieter-borremans",
      "https://www.youtube.com/@PieterBorremans",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
                className="text-muted"
              >
                {category.name}
              </a>
            ))}
            <a href="/about" className="text-ink font-medium mt-[6px]">
              About
            </a>
          </nav>

          <p className="text-xs text-faint mt-10">p@ryoka.xyz</p>
        </aside>

        <main className="flex-1 flex justify-center px-10 py-11">
          <div className="w-full max-w-2xl">
            <div className="flex justify-center mb-8">
              <img
                src="/Pieter-Borremans-founder.jpeg"
                alt="Pieter Borremans — founder of Ryoka Group"
                className="w-[120px] h-[120px] rounded-full object-cover border border-ink/10"
              />
            </div>

            <h1 className="text-[28px] font-bold text-ink text-center leading-tight tracking-tight mb-10">
              About Pieter Borremans
            </h1>

            <div className="text-[17px] leading-[1.75] text-[#1a1a1a]">
              <p className="mb-5">
                I&rsquo;m Pieter Borremans — a writer, content creator, and
                founder based in Taiwan and London. I build independent software
                products under{" "}
                <a
                  href="https://ryoka.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-ink"
                >
                  Ryoka Group
                </a>
                , including{" "}
                <a
                  href="https://sorano.space"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-ink"
                >
                  Sorano
                </a>{" "}
                (public roadmaps for indie founders),{" "}
                <a
                  href="https://two.so"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-ink"
                >
                  TWO Docs
                </a>{" "}
                (minimal docs editor), Aegos Intel (intelligent company data for
                investors), Study Brew (language learning platform), and Kiroka
                (free subscription tracker).
              </p>

              <p className="mb-5">
                I write about the psychological and emotional side of building
                alone — the burnout, the loneliness, the decision fatigue, and
                the small wins that keep you going. This blog exists because most
                indie hacker content focuses on tactics and revenue. Almost
                nobody talks about what it really feels like.
              </p>

              <p className="mb-5">
                Pieter Borremans builds everything from an iPad, MacBook and mostly using Next.js,
                Supabase, and Vercel. English is not my first language, and I
                treat that as a feature, not a limitation.
              </p>
            </div>

            <div className="mt-10 pt-6 border-t border-ink/10">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                <a
                  href="https://pieterborremans.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-ink"
                >
                  pieterborremans.com
                </a>
                <a
                  href="https://linkedin.com/in/pieter-borremans"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-ink"
                >
                  LinkedIn
                </a>
                <a
                  href="https://www.youtube.com/@PieterBorremans"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-ink"
                >
                  YouTube
                </a>
                <a
                  href="https://sorano.space"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-ink"
                >
                  sorano.space
                </a>
                <a
                  href="https://two.so"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-ink"
                >
                  two.so
                </a>
                <a
                  href="https://ryoka.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-ink"
                >
                  ryoka.xyz
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
