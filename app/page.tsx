import { createClient } from "../lib/supabase";
import { getCategoryMeta } from "../lib/categoryMeta";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const revalidate = 60;

function categorySlug(category: string) {
  return category.toLowerCase().replace(/\s+/g, "-");
}

function formatDate(iso: string) {
  const [year, month, day] = iso.slice(0, 10).split("-");
  return `${month}-${day}-${year}`;
}

type PostRow = {
  title: string;
  slug: string;
  category: string | null;
  published_at: string;
};

function groupByYear(posts: PostRow[]) {
  const groups: { year: string; posts: PostRow[] }[] = [];
  for (const post of posts) {
    const year = post.published_at.slice(0, 4);
    const current = groups[groups.length - 1];
    if (current && current.year === year) {
      current.posts.push(post);
    } else {
      groups.push({ year, posts: [post] });
    }
  }
  return groups;
}

export default async function Home() {
  const supabase = createClient();

  const { data: posts } = await supabase
    .from("posts")
    .select("title, slug, category, published_at")
    .eq("target_site", "indiehacker.blog")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  const { data: categories } = await supabase
    .from("categories")
    .select("name")
    .eq("site", "indiehacker.blog");

  const allPosts = posts || [];

  // The wired hero map below has fixed positions + colors keyed to this
  // exact order. Supabase doesn't guarantee row order without an explicit
  // .order() clause, so we sort by this canonical list rather than trust
  // whatever order comes back — otherwise a card could render in the right
  // slot but with another category's color, or vice versa.
  const CATEGORY_ORDER = [
    "thoughts",
    "money",
    "marketing",
    "building",
    "productivity",
    "my launches",
  ];
  // Hard capped at 6 — matches the "never more than 6 categories" rule
  // the node-map layout is designed around.
  const allCategories = (categories || [])
    .slice()
    .sort((a, b) => {
      const ai = CATEGORY_ORDER.indexOf(a.name.toLowerCase());
      const bi = CATEGORY_ORDER.indexOf(b.name.toLowerCase());
      return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
    })
    .slice(0, 6);
  const yearGroups = groupByYear(allPosts);

  // Raw hex values for the SVG wiring (gradients/pins need actual hex,
  // not Tailwind class names). Mirrors the cat.* colors in tailwind.config.js.
  const CARD_HEX = ["#7DD48B", "#E8AC3D", "#F2789F", "#4FD1C5", "#B79CF2", "#6C93FF"];
  // left/top/rotate for each of the 6 slots in the fixed 880px-wide map,
  // row-major: row 1 is indices 0-2, row 2 is indices 3-5.
  const CARD_POS = [
    { left: 0, top: 110, rotate: -1.1 },
    { left: 304, top: 110, rotate: 0.7 },
    { left: 608, top: 110, rotate: -0.6 },
    { left: 0, top: 340, rotate: 0.9 },
    { left: 304, top: 340, rotate: -0.7 },
    { left: 608, top: 340, rotate: 1 },
  ];

  const categoryCounts: Record<string, number> = {};
  for (const post of allPosts) {
    if (post.category) {
      categoryCounts[post.category] = (categoryCounts[post.category] || 0) + 1;
    }
  }

  return (
    <>
      <Header activeHref="/" />

      {/* ============ HERO ============ */}
      <section className="max-w-[1040px] mx-auto px-6 md:px-10 pt-14 pb-6 text-center relative">
        {/* connecting line from the eyebrow down into the headline —
            desktop only, see CATEGORY NODE MAP for why this is split
            into its own small SVG rather than one giant one. */}
        <svg
          className="hidden xl:block absolute left-1/2 -translate-x-1/2 top-0 w-[880px] h-[180px] pointer-events-none"
          viewBox="0 0 880 180"
        >
          <rect
            x="436"
            y="22"
            width="8"
            height="8"
            rx="1.5"
            fill="#3A3A42"
            transform="rotate(45 440 26)"
          />
          <line
            x1="440"
            y1="30"
            x2="440"
            y2="174"
            stroke="#3A3A42"
            strokeWidth="1.3"
            strokeDasharray="3 5"
          />
        </svg>

        <p className="font-mono text-[13px] text-faint mb-4 relative z-10">
          // solo-founder log
        </p>
        <h1
          className="mx-auto relative z-10"
          style={{
            fontWeight: 800,
            letterSpacing: "-0.03em",
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            lineHeight: 1.15,
            maxWidth: "720px",
          }}
        >
          I write about building alone,{" "}
          <span className="text-accent">and what nobody warns you about.</span>
        </h1>

        {allCategories.length > 0 && (
          <div className="xl:hidden w-px h-10 bg-line mx-auto mt-10" />
        )}
      </section>

      {/* ============ CATEGORY NODE MAP ============ */}
      {allCategories.length > 0 && (
        <section className="max-w-[1040px] mx-auto px-6 md:px-10 pb-24">
          {/* Desktop: wired 3x2 map. Fixed pixel coordinates below only
              line up correctly at this exact 880px width, which is why
              this whole block is xl+ only — it doesn't try to reflow. */}
          <div
            className="hidden xl:block relative w-[880px] mx-auto"
            style={{ height: 550 }}
          >
            <svg
              viewBox="0 0 880 550"
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ overflow: "visible" }}
            >
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7DD48B" />
                  <stop offset="100%" stopColor="#4FD1C5" />
                </linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E8AC3D" />
                  <stop offset="100%" stopColor="#B79CF2" />
                </linearGradient>
                <linearGradient id="g3" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F2789F" />
                  <stop offset="100%" stopColor="#6C93FF" />
                </linearGradient>
                <linearGradient id="gA" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7DD48B" />
                  <stop offset="100%" stopColor="#6C93FF" />
                </linearGradient>
                <linearGradient id="gB" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#F2789F" />
                  <stop offset="100%" stopColor="#4FD1C5" />
                </linearGradient>
                <marker
                  id="arrow"
                  viewBox="0 0 8 8"
                  refX="4"
                  refY="7"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto"
                >
                  <path
                    d="M0 0L4 7L8 0"
                    fill="none"
                    stroke="context-stroke"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </marker>
              </defs>

              <text
                x="30"
                y="46"
                fontFamily="JetBrains Mono, monospace"
                fontSize="11"
                fill="#5C5C63"
              >
                // category map
              </text>

              {/* bus junction, fed by the trunk drawn in the hero above */}
              <circle cx="440" cy="50" r="4" fill="#3A3A42" />

              {/* bus */}
              <line x1="136" y1="50" x2="744" y2="50" stroke="#3A3A42" strokeWidth="1.3" strokeDasharray="3 5" />

              {/* drops to row 1 */}
              <line x1="136" y1="50" x2="136" y2="104" stroke="#3A3A42" strokeWidth="1.3" strokeDasharray="3 5" markerEnd="url(#arrow)" />
              <line x1="440" y1="50" x2="440" y2="104" stroke="#3A3A42" strokeWidth="1.3" strokeDasharray="3 5" markerEnd="url(#arrow)" />
              <line x1="744" y1="50" x2="744" y2="104" stroke="#3A3A42" strokeWidth="1.3" strokeDasharray="3 5" markerEnd="url(#arrow)" />

              {/* row1 entry brackets + pins */}
              <rect x="128" y="102" width="16" height="16" rx="2" stroke="#7DD48B" strokeWidth="1.2" fill="none" />
              <rect x="132" y="106" width="8" height="8" rx="1.5" fill="#7DD48B" transform="rotate(45 136 110)" />
              <rect x="432" y="102" width="16" height="16" rx="2" stroke="#E8AC3D" strokeWidth="1.2" fill="none" />
              <rect x="436" y="106" width="8" height="8" rx="1.5" fill="#E8AC3D" transform="rotate(45 440 110)" />
              <rect x="736" y="102" width="16" height="16" rx="2" stroke="#F2789F" strokeWidth="1.2" fill="none" />
              <rect x="740" y="106" width="8" height="8" rx="1.5" fill="#F2789F" transform="rotate(45 744 110)" />

              {/* row1 peer links */}
              <line x1="272" y1="195" x2="304" y2="195" stroke="#3A3A42" strokeWidth="1.2" strokeDasharray="3 4" />
              <line x1="576" y1="195" x2="608" y2="195" stroke="#3A3A42" strokeWidth="1.2" strokeDasharray="3 4" />
              <rect x="269" y="192" width="6" height="6" rx="1" fill="#7DD48B" transform="rotate(45 272 195)" />
              <rect x="301" y="192" width="6" height="6" rx="1" fill="#E8AC3D" transform="rotate(45 304 195)" />
              <rect x="573" y="192" width="6" height="6" rx="1" fill="#E8AC3D" transform="rotate(45 576 195)" />
              <rect x="605" y="192" width="6" height="6" rx="1" fill="#F2789F" transform="rotate(45 608 195)" />

              {/* row2 peer links */}
              <line x1="272" y1="425" x2="304" y2="425" stroke="#3A3A42" strokeWidth="1.2" strokeDasharray="3 4" />
              <line x1="576" y1="425" x2="608" y2="425" stroke="#3A3A42" strokeWidth="1.2" strokeDasharray="3 4" />
              <rect x="269" y="422" width="6" height="6" rx="1" fill="#4FD1C5" transform="rotate(45 272 425)" />
              <rect x="301" y="422" width="6" height="6" rx="1" fill="#B79CF2" transform="rotate(45 304 425)" />
              <rect x="573" y="422" width="6" height="6" rx="1" fill="#B79CF2" transform="rotate(45 576 425)" />
              <rect x="605" y="422" width="6" height="6" rx="1" fill="#6C93FF" transform="rotate(45 608 425)" />

              {/* row1 -> row2 column pairs */}
              <line x1="136" y1="280" x2="136" y2="340" stroke="url(#g1)" strokeWidth="1.5" />
              <line x1="440" y1="280" x2="440" y2="340" stroke="url(#g2)" strokeWidth="1.5" />
              <line x1="744" y1="280" x2="744" y2="340" stroke="url(#g3)" strokeWidth="1.5" />

              {/* crossing diagonals, confined to the gap between rows */}
              <line x1="136" y1="280" x2="744" y2="340" stroke="url(#gA)" strokeWidth="1.3" strokeDasharray="4 4" opacity="0.6" />
              <line x1="744" y1="280" x2="136" y2="340" stroke="url(#gB)" strokeWidth="1.3" strokeDasharray="4 4" opacity="0.6" />

              {/* row2 entry pins */}
              <rect x="132" y="336" width="8" height="8" rx="1.5" fill="#4FD1C5" transform="rotate(45 136 340)" />
              <rect x="436" y="336" width="8" height="8" rx="1.5" fill="#B79CF2" transform="rotate(45 440 340)" />
              <rect x="740" y="336" width="8" height="8" rx="1.5" fill="#6C93FF" transform="rotate(45 744 340)" />
            </svg>

            {allCategories.map((category, i) => {
              const meta = getCategoryMeta(category.name);
              const count = categoryCounts[category.name] || 0;
              const pos = CARD_POS[i];
              const isFeatured = i === 5;
              if (!pos) return null;
              return (
                <a
                  key={category.name}
                  href={`/category/${categorySlug(category.name)}`}
                  className={`absolute w-[272px] h-[170px] rounded-xl border p-5 transition-colors ${
                    isFeatured
                      ? "border-accent/50 bg-accent/[0.08] hover:border-accent"
                      : `border-line bg-paper ${meta.hoverBorder}`
                  }`}
                  style={{
                    left: pos.left,
                    top: pos.top,
                    transform: `rotate(${pos.rotate}deg)`,
                    boxShadow: "0 6px 16px rgba(0,0,0,0.28)",
                  }}
                >
                  {isFeatured && (
                    <span className="absolute -top-[11px] right-3.5 rounded-[5px] bg-accent px-2.5 py-[3px] font-mono text-[11px] font-bold tracking-wide text-[#04122E]">
                      ★ FEATURED
                    </span>
                  )}
                  <div className="flex items-center gap-2 mb-2.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: CARD_HEX[i] }}
                    />
                    <span
                      className={`font-mono text-[12px] tracking-wide ${
                        isFeatured ? "text-accent" : "text-ink"
                      }`}
                    >
                      {category.name.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-[14px] leading-relaxed text-muted mb-4">
                    {meta.tagline}
                  </p>
                  <span className="absolute bottom-5 font-mono text-[12px] text-faint">
                    {count} {count === 1 ? "entry" : "entries"}
                  </span>
                </a>
              );
            })}
          </div>

          {/* Below xl: plain stacked cards, no wiring — the fixed
              coordinates above only work at the 880px desktop width. */}
          <div className="xl:hidden">
            <div className="h-px w-full bg-line mb-10" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {allCategories.map((category) => {
                const meta = getCategoryMeta(category.name);
                const count = categoryCounts[category.name] || 0;
                return (
                  <a
                    key={category.name}
                    href={`/category/${categorySlug(category.name)}`}
                    className={`rounded-[14px] border border-line bg-paper p-[18px] transition-colors ${meta.hoverBorder}`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
                      <span className="font-mono text-[12px] uppercase tracking-wide">
                        {category.name}
                      </span>
                    </div>
                    <p className="text-[13px] leading-snug text-faint mb-3">
                      {meta.tagline}
                    </p>
                    <span className="font-mono text-[11px] text-faint">
                      {count} {count === 1 ? "entry" : "entries"}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ============ LATEST POSTS (plain list, no cards) ============ */}
      <main className="max-w-[1180px] mx-auto px-6 md:px-10 pb-24">
        <p className="font-mono text-[13px] text-faint mb-10">LATEST POSTS</p>

        {allPosts.length === 0 && (
          <p className="text-faint text-center mb-10">No posts yet.</p>
        )}

        {yearGroups.map(({ year, posts: yearPosts }) => (
          <section key={year} className="mb-2">
            <p className="text-base font-semibold mb-2">{year}</p>
            <div className="border-t border-line" />
            {yearPosts.map((post) => (
              <a
                key={post.slug}
                href={`/posts/${post.slug}`}
                className="block py-8 group border-b border-line"
              >
                <span className="font-mono text-[13px] text-faint">
                  {formatDate(post.published_at)}
                </span>
                <h3
                  className="mt-2 group-hover:text-accent transition-colors"
                  style={{ fontWeight: 700, fontSize: "22px", lineHeight: 1.25 }}
                >
                  {post.title}
                </h3>
              </a>
            ))}
          </section>
        ))}
      </main>

      <Footer />
    </>
  );
}
