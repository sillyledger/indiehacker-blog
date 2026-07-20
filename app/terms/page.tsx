import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | IndieHacker Blog",
  description: "The terms for using indiehacker.blog.",
  openGraph: {
    title: "Terms of Service | IndieHacker Blog",
    description: "The terms for using indiehacker.blog.",
  },
};

export default function TermsPage() {
  return (
    <>
      <Header />

      <main className="max-w-[720px] mx-auto px-6 md:px-10 pt-14 pb-24">
        <h1
          className="mb-3"
          style={{ fontWeight: 800, letterSpacing: "-0.02em", fontSize: "28px" }}
        >
          Terms of Service
        </h1>

        <p className="text-[13px] font-mono text-faint mb-10">
          Last updated: July 2026
        </p>

        <div className="text-[18px] leading-[1.75]">
          <p className="mb-8">
            By using indiehacker.blog, you&rsquo;re agreeing to the basics
            below. Nothing here is unusual, it&rsquo;s mostly common sense
            written down.
          </p>

          <h2
            className="mb-3"
            style={{ fontWeight: 800, letterSpacing: "-0.01em", fontSize: "20px" }}
          >
            Content
          </h2>
          <p className="mb-8">
            Everything I write or publish here, posts and images, is mine
            unless stated otherwise. You&rsquo;re welcome to quote or link
            to it with credit and a link back. Please don&rsquo;t republish
            it wholesale as your own.
          </p>

          <h2
            className="mb-3"
            style={{ fontWeight: 800, letterSpacing: "-0.01em", fontSize: "20px" }}
          >
            No professional advice
          </h2>
          <p className="mb-8">
            Nothing on this site is legal, financial, or professional
            advice. It&rsquo;s my own thinking and experience, shared for
            what it&rsquo;s worth. Make your own decisions accordingly.
          </p>

          <h2
            className="mb-3"
            style={{ fontWeight: 800, letterSpacing: "-0.01em", fontSize: "20px" }}
          >
            External links
          </h2>
          <p className="mb-8">
            This site links to other sites and services I don&rsquo;t
            control. I&rsquo;m not responsible for their content or how they
            handle your data once you leave.
          </p>

          <h2
            className="mb-3"
            style={{ fontWeight: 800, letterSpacing: "-0.01em", fontSize: "20px" }}
          >
            No guarantees
          </h2>
          <p className="mb-8">
            This site is provided as-is. I try to keep things accurate and
            working, but I can&rsquo;t promise it&rsquo;ll always be
            error-free or available.
          </p>

          <h2
            className="mb-3"
            style={{ fontWeight: 800, letterSpacing: "-0.01em", fontSize: "20px" }}
          >
            Changes
          </h2>
          <p className="mb-8">
            These terms might change as the site evolves. The date at the
            top of this page reflects the last update.
          </p>

          <p>
            Questions? Email me at{" "}
            <a
              href="mailto:p@ryoka.xyz"
              className="underline decoration-dotted hover:text-accent transition-colors"
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
