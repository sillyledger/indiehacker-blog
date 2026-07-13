import type { Metadata } from "next";
import { createClient } from "../../lib/supabase";

export const metadata: Metadata = {
  title: "About Pieter Borremans | IndieHacker Blog",
  description:
    "Pieter Borremans is a writer, digital entrepreneur, and founder of Ryoka Group. Born in Indonesia, raised in Belgium, based between Taipei and London.",
  openGraph: {
    title: "About Pieter Borremans | IndieHacker Blog",
    description:
      "Pieter Borremans is a writer, digital entrepreneur, and founder of Ryoka Group. Born in Indonesia, raised in Belgium, based between Taipei and London.",
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

  // Same @id as the Person schema on ryokagroup.com/founder — this tells
  // Google it's the same entity, not a separate one, across both domains.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://ryokagroup.com/founder#pieter",
    name: "Pieter Borremans",
    givenName: "Pieter",
    familyName: "Borremans",
    url: "https://www.indiehacker.blog/about",
    image: "https://www.indiehacker.blog/Pieter-Borremans-founder.jpeg",
    jobTitle: "Founder",
    description:
      "Pieter Borremans is the founder of Ryoka Group. A writer, digital entrepreneur, and software founder who builds, operates, and invests in software products.",
    birthPlace: {
      "@type": "Place",
      name: "Indonesia",
    },
    nationality: {
      "@type": "Country",
      name: "Belgium",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "KdG University College",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Antwerp",
        addressCountry: "BE",
      },
    },
    homeLocation: [
      { "@type": "Place", name: "Taipei, Taiwan" },
      { "@type": "Place", name: "London, United Kingdom" },
    ],
    worksFor: {
      "@type": "Organization",
      "@id": "https://ryokagroup.com/#organization",
      name: "Ryoka Group",
      url: "https://ryokagroup.com",
    },
    sameAs: [
  "https://pieterborremans.com",
  "https://ryokagroup.com/founder",
  "https://echoroom.xyz/about",
  "https://ryoka.xyz",
  "https://www.linkedin.com/in/pieter-borremans/",
  "https://medium.com/@borremanspieter",
  "https://www.youtube.com/@PieterBorremans",
  "https://github.com/sillyledger",
  "https://www.pinterest.com/borremanspieter",
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
            <a href="/projects" className="text-muted mt-[6px]">
              Projects
            </a>
            <a href="/about" className="text-ink font-medium">
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
                alt="Pieter Borremans, digital entrepreneur and founder of Ryoka Group"
                className="w-[120px] h-[120px] rounded-full object-cover border border-ink/10"
              />
            </div>

            <h1 className="text-[28px] font-bold text-ink text-center leading-tight tracking-tight mb-10">
              About Pieter Borremans
            </h1>

            <div className="text-[17px] leading-[1.75] text-[#1a1a1a]">
              <p className="mb-5">
                I&rsquo;m Pieter Borremans. Writer, digital entrepreneur, and
                content creator based between Taipei and London. Born in
                Indonesia, raised in Belgium, and educated at KDG University
                College in Antwerp. I&rsquo;ve spent 25 years living and working
                across countries. That restlessness shaped everything I do now.
              </p>

              <p className="mb-5">
                I started my first business at the age of 22 and never looked
                back. Sold it almost 15 years later, right before AI,
                vibecoding, and no-code tools made it possible for anyone without
                a dev background (like me) to build software from scratch.
              </p>

              <p className="mb-5">
                I write about the psychological and emotional side of building
                alone. The burnout, the loneliness, the decision fatigue, and the
                small wins that keep you going. This blog exists because most
                indie hacker content focuses on tactics and revenue. Almost
                nobody talks about what it actually feels like.
              </p>

              <p className="mb-5">
                Pieter Borremans is the founder of{" "}
                <a
                  href="https://ryokagroup.com/founder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-ink"
                >
                  Ryoka Group
                </a>
                , which builds, operates, and invests in software products.
                Some are held for the long run, others run as experiments to
                test what is worth building next.
              </p>

              <p>
                If you&rsquo;re someone building something alone, figuring
                things out in public, or just appreciate honesty over polish,
                then you&rsquo;re in the right place.
              </p>
            </div>

            <div className="mt-10 pt-6 border-t border-ink/10">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                <a
                  href="https://ryokagroup.com/founder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-ink"
                >
                  ryokagroup.com
                </a>
                <a
                  href="https://pieterborremans.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-ink"
                >
                  pieterborremans.com
                </a>
                <a
                  href="https://ryoka.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-ink"
                >
                  ryoka.xyz
                </a>
                <a
                  href="https://www.linkedin.com/in/pieter-borremans/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-ink"
                >
                  LinkedIn
                </a>
                <a
                  href="https://medium.com/@borremanspieter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-ink"
                >
                  Medium
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
                  href="https://github.com/sillyledger"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-ink"
                >
                  GitHub
                </a>
                <a
                  href="https://www.pinterest.com/borremanspieter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-ink"
                >
                  Pinterest
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
