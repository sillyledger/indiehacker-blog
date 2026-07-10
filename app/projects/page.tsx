import type { Metadata } from "next";
import { createClient } from "../../lib/supabase";

export const metadata: Metadata = {
  title: "Projects by Pieter Borremans | IndieHacker Blog",
  description:
    "Active software projects built and operated by Pieter Borremans under Ryoka Group. Solo-built, solo-run.",
  openGraph: {
    title: "Projects by Pieter Borremans | IndieHacker Blog",
    description:
      "Active software projects built and operated by Pieter Borremans under Ryoka Group. Solo-built, solo-run.",
  },
};

function categorySlug(category: string) {
  return category.toLowerCase().replace(/\s+/g, "-");
}

const projects = [
  {
    name: "Sorano",
    type: "SaaS",
    description: "Social media scheduling for solo creators.",
    url: "https://sorano.app",
  },
  {
    name: "TWO Docs",
    type: "SaaS",
    description: "Document management for Taiwan's foreign workforce.",
    url: "https://twodocs.app",
  },
  {
    name: "Aegos Intel",
    type: "SaaS",
    description: "Competitive intelligence and market monitoring.",
    url: "https://aegosintel.com",
  },
  {
    name: "Study Brew",
    type: "SaaS",
    description: "AI study tools for students and self-learners.",
    url: "https://studybrew.co",
  },
  {
    name: "indiehacker.blog",
    type: "Publication",
    description: "This site. Writing about building alone.",
    url: "/",
  },
];

export default async function ProjectsPage() {
  const supabase = createClient();

  const { data: categories } = await supabase
    .from("categories")
    .select("name")
    .eq("site", "indiehacker.blog");

  const allCategories = categories || [];

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
              className="text-muted"
            >
              {category.name}
            </a>
          ))}
          <a href="/projects" className="text-ink font-medium mt-[6px]">
            Projects
          </a>
          <a href="/about" className="text-muted">
            About
          </a>
        </nav>

        <p className="text-xs text-faint mt-10">p@ryoka.xyz</p>
      </aside>

      <main className="flex-1 flex justify-center px-10 py-11">
        <div className="w-full max-w-2xl">
          <h1 className="text-[28px] font-bold text-ink text-center leading-tight tracking-tight mb-3">
            What I&rsquo;m building
          </h1>
          <p className="text-center text-muted text-[15px] mb-12">
            Active projects under{" "}
            <a
              href="https://www.ryokagroup.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-ink underline-offset-[3px]"
            >
              Ryoka Group
            </a>
            . Solo-built, solo-run.
          </p>

          <div className="border-t border-ink/10">
            {projects.map((project) => (
              <a
                key={project.name}
                href={project.url}
                target={project.url.startsWith("/") ? undefined : "_blank"}
                rel={
                  project.url.startsWith("/")
                    ? undefined
                    : "noopener noreferrer"
                }
                className="flex items-baseline justify-between gap-4 py-4 border-b border-ink/5 hover:opacity-70"
              >
                <div>
                  <span className="text-[17px] text-ink font-medium leading-snug">
                    {project.name}
                  </span>
                  <p className="text-sm text-muted mt-1 font-normal">
                    {project.description}
                  </p>
                </div>
                <span className="text-xs text-faint whitespace-nowrap">
                  {project.type}
                </span>
              </a>
            ))}
          </div>

          <div className="mt-6">
            <a
              href="https://www.ryokagroup.com/brands"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted underline underline-offset-[3px] hover:text-ink"
            >
              See all Ryoka Group brands &rarr;
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
