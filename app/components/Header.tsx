import { createClient } from "../../lib/supabase";

function categorySlug(category: string) {
  return category.toLowerCase().replace(/\s+/g, "-");
}

type HeaderProps = {
  /**
   * The current page's href, used to highlight the active nav item.
   * e.g. "/", "/category/money", "/projects", "/about"
   */
  activeHref?: string;
};

export default async function Header({ activeHref = "/" }: HeaderProps) {
  const supabase = createClient();

  const { data: categories } = await supabase
    .from("categories")
    .select("name")
    .eq("site", "indiehacker.blog");

  const allCategories = categories || [];

  const navItems = [
    { label: "latest", href: "/" },
    ...allCategories.map((c) => ({
      label: c.name.toLowerCase(),
      href: `/category/${categorySlug(c.name)}`,
    })),
    { label: "projects", href: "/projects" },
    { label: "about", href: "/about" },
  ];

  return (
    <header>
      <div className="max-w-[1180px] mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between">
        <a
          href="/"
          className="text-xl flex items-center gap-2"
          style={{ fontWeight: 800, letterSpacing: "-0.03em" }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-accent" />
          indiehacker
          <span className="font-mono font-normal text-base">.blog</span>
        </a>

        <nav className="hidden md:flex items-center gap-5 font-mono text-[12px] text-faint overflow-x-auto whitespace-nowrap">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={
                item.href === activeHref
                  ? "text-accent shrink-0"
                  : "hover:text-ink transition-colors shrink-0"
              }
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button aria-label="Open menu" className="md:hidden flex flex-col gap-1.5 w-6">
          <span className="h-[1.5px] bg-ink" />
          <span className="h-[1.5px] bg-ink" />
        </button>
      </div>
    </header>
  );
}
