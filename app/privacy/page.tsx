import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | IndieHacker Blog",
  description:
    "How indiehacker.blog collects, uses, and protects your data.",
  openGraph: {
    title: "Privacy Policy | IndieHacker Blog",
    description:
      "How indiehacker.blog collects, uses, and protects your data.",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />

      <main className="max-w-[720px] mx-auto px-6 md:px-10 pt-14 pb-24">
        <h1
          className="mb-3"
          style={{ fontWeight: 800, letterSpacing: "-0.02em", fontSize: "28px" }}
        >
          Privacy Policy
        </h1>

        <p className="text-[13px] font-mono text-faint mb-10">
          Last updated: July 2026
        </p>

        <div className="text-[18px] leading-[1.75]">
          <p className="mb-8">
            indiehacker.blog is a personal site. I don&rsquo;t sell your
            data, and I try to collect as little of it as possible.
          </p>

          <h2
            className="mb-3"
            style={{ fontWeight: 800, letterSpacing: "-0.01em", fontSize: "20px" }}
          >
            What&rsquo;s collected
          </h2>
          <p className="mb-8">
            Basic analytics, like which pages get visited and roughly where
            from, so I can understand what people find useful. If you email
            me, I keep that conversation to reply to you, nothing more.
          </p>

          <h2
            className="mb-3"
            style={{ fontWeight: 800, letterSpacing: "-0.01em", fontSize: "20px" }}
          >
            Cookies
          </h2>
          <p className="mb-8">
            This site may use cookies for basic functionality and analytics.
            You can block or clear cookies in your browser at any time
            without breaking the site.
          </p>

          <h2
            className="mb-3"
            style={{ fontWeight: 800, letterSpacing: "-0.01em", fontSize: "20px" }}
          >
            Third parties
          </h2>
          <p className="mb-8">
            This site is hosted on Vercel and may use Google Analytics or
            Search Console to understand traffic. Those services have their
            own privacy policies covering how they handle data.
          </p>

          <h2
            className="mb-3"
            style={{ fontWeight: 800, letterSpacing: "-0.01em", fontSize: "20px" }}
          >
            Your data
          </h2>
          <p className="mb-8">
            I don&rsquo;t sell or trade personal information. If
            you&rsquo;d like to know what I have on you, or want it
            deleted, just ask.
          </p>

          <p>
            Questions about any of this? Email me at{" "}
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
