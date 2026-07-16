import { createClient } from "../../lib/supabase";

function categorySlug(category: string) {
  return category.toLowerCase().replace(/\s+/g, "-");
}

export default async function Footer() {
  const supabase = createClient();

  const { data: categories } = await supabase
    .from("categories")
    .select("name")
    .eq("site", "indiehacker.blog");

  const allCategories = categories || [];

  return (
    <footer className="border-t border-dashed border-line">
      <div className="max-w-[1180px] mx-auto px-6 md:px-10 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          <div>
            <p className="font-mono text-[12px] tracking-wider text-faint mb-4">
              NAVIGATE
            </p>
            <ul className="space-y-4 text-[15px]">
              <li>
                <a href="/" className="hover:text-accent transition-colors">
                  Latest
                </a>
              </li>
              <li>
                <a
                  href="/projects"
                  className="hover:text-accent transition-colors"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-accent transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="mailto:p@ryoka.xyz"
                  className="hover:text-accent transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[12px] tracking-wider text-faint mb-4">
              CATEGORIES
            </p>
            <ul className="space-y-4 text-[15px]">
              {allCategories.map((c) => (
                <li key={c.name}>
                  <a
                    href={`/category/${categorySlug(c.name)}`}
                    className="hover:text-accent transition-colors"
                  >
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[12px] tracking-wider text-faint mb-4">
              LEGAL
            </p>
            <ul className="space-y-4 text-[15px]">
              <li>
                <a
                  href="/privacy"
                  className="hover:text-accent transition-colors"
                >
                  Privacy policy
                </a>
              </li>
              <li>
                <a
                  href="/affiliate-disclosure"
                  className="hover:text-accent transition-colors"
                >
                  Affiliate disclaimer
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="hover:text-accent transition-colors"
                >
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-dashed border-line flex flex-wrap items-center justify-between gap-4 font-mono text-[12px] text-faint">
          <span>© 2026 indiehacker.blog</span>
          <span className="flex items-center gap-2">
            🇧🇪 🇬🇧 🇹🇼 TAICHUNG · LONDON
          </span>
        </div>
      </div>
    </footer>
  );
}
