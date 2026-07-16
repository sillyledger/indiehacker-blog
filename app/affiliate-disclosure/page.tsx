import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Affiliate Disclosure | IndieHacker Blog",
  description: "How affiliate links work on indiehacker.blog.",
  openGraph: {
    title: "Affiliate Disclosure | IndieHacker Blog",
    description: "How affiliate links work on indiehacker.blog.",
  },
};

export default function AffiliateDisclosurePage() {
  return (
    <>
      <Header />

      <main className="max-w-[720px] mx-auto px-6 md:px-10 pt-14 pb-24">
        <h1
          className="mb-3"
          style={{ fontWeight: 800, letterSpacing: "-0.02em", fontSize: "28px" }}
        >
          Affiliate Disclosure
        </h1>

        <p className="text-[13px] font-mono text-faint mb-10">
          Last updated: July 2026
        </p>

        <div className="text-[18px] leading-[1.75]">
          <p className="mb-8">
            Some links on this site are affiliate links. That means if you
            click one and go on to buy something, I may earn a small
            commission, at no extra cost to you. It doesn&rsquo;t change the
            price you pay.
          </p>

          <h2
            className="mb-3"
            style={{ fontWeight: 800, letterSpacing: "-0.01em", fontSize: "20px" }}
          >
            Editorial independence
          </h2>
          <p className="mb-8">
            I only link to products, tools, and services I&rsquo;ve
            actually used or genuinely believe in. Affiliate relationships
            never decide what I write about or how I write about it, if
            something isn&rsquo;t good, I say so.
          </p>

          <h2
            className="mb-3"
            style={{ fontWeight: 800, letterSpacing: "-0.01em", fontSize: "20px" }}
          >
            Where this applies
          </h2>
          <p className="mb-8">
            This applies across the site, including blog posts, project
            pages, and any resources I recommend. Where it&rsquo;s not
            obvious from context, I&rsquo;ll try to flag that a link is an
            affiliate link.
          </p>

          <h2
            className="mb-3"
            style={{ fontWeight: 800, letterSpacing: "-0.01em", fontSize: "20px" }}
          >
            Why
          </h2>
          <p className="mb-8">
            Any income from affiliate links helps cover the cost of running
            this site and the time spent writing it, nothing more
            calculated than that.
          </p>

          <p>
            Questions about a specific link or partnership? Email me at{" "}
            <a
              href="mailto:p@ryoka.xyz"
              className="underline hover:text-accent transition-colors"
            >
              p@ryoka.xyz
            </a>
            .
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
