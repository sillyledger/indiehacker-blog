import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";

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

const projects = [
  {
    name: "Sorano",
    type: "SaaS",
    description:
      "Social media scheduling Roadmap, changelog and community votes for your product.",
    url: "https://sorano.space",
  },
  {
    name: "Kiroka",
    type: "B2C",
    description:
      "Tracks your subscriptions and flags renewals before you are charged.",
    url: "https://kiroka.xyz",
  },
  {
    name: "Aegos Intel",
    type: "SaaS",
    description: "Company intelligence and market monitoring.",
    url: "https://aegosintel.com",
  },
  {
    name: "Study Brew",
    type: "Education",
    description: "Study tools for students and self-learners.",
    url: "https://studybrew.co",
  },
  {
    name: "TWO Docs",
    type: "SaaS",
    description: "A minimal docs editor for Mac and iPad.",
    url: "https://two.so/",
  },
];

export default async function ProjectsPage() {
  return (
    <>
      <Header activeHref="/projects" />

      <main className="max-w-[820px] mx-auto px-6 md:px-10 pt-14 pb-24">
        <h1
          className="text-center mb-3"
          style={{ fontWeight: 800, letterSpacing: "-0.02em", fontSize: "28px" }}
        >
          What I&rsquo;m building
        </h1>
        <p className="text-center text-faint text-[15px] mb-12">
          Active projects under{" "}
          <a
            href="https://www.ryokagroup.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-accent transition-colors"
          >
            Ryoka Group
          </a>
          . Solo-built, solo-run.
        </p>

        <div className="border-t border-line">
          {projects.map((project) => (
            <a
              key={project.name}
              href={project.url}
              target={project.url.startsWith("/") ? undefined : "_blank"}
              rel={
                project.url.startsWith("/") ? undefined : "noopener noreferrer"
              }
              className="flex items-baseline justify-between gap-4 py-6 border-b border-line hover:opacity-80 transition-opacity"
            >
              <div>
                <span
                  style={{ fontWeight: 700, fontSize: "19px" }}
                >
                  {project.name}
                </span>
                <p className="text-sm text-faint mt-1 font-normal">
                  {project.description}
                </p>
              </div>
              <span className="font-mono text-xs text-faint whitespace-nowrap">
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
            className="text-sm font-mono text-faint underline underline-offset-[3px] hover:text-ink transition-colors"
          >
            See all Ryoka Group brands &rarr;
          </a>
        </div>
      </main>

      <Footer />
    </>
  );
}
