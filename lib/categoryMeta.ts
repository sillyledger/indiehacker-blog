export type CategoryMeta = {
  dot: string;
  hoverBorder: string;
  tagline: string;
};

// These reference literal Tailwind classes (defined in tailwind.config.js)
// rather than being built with string interpolation like `text-cat-${slug}` —
// Tailwind's build-time scanner only picks up class names it can see
// literally in the source, so a dynamically-constructed class name would
// silently produce no CSS in production.
//
// Key must match the exact category name (lowercased) as typed into
// RyokaOS. "My Launches" -> "my launches".
const categoryMeta: Record<string, CategoryMeta> = {
  thoughts: {
    dot: "bg-cat-thoughts",
    hoverBorder: "hover:border-cat-thoughts",
    tagline: "Reflections on building alone.",
  },
  money: {
    dot: "bg-cat-money",
    hoverBorder: "hover:border-cat-money",
    tagline: "The financial reality nobody posts.",
  },
  marketing: {
    dot: "bg-cat-marketing",
    hoverBorder: "hover:border-cat-marketing",
    tagline: "Getting found without a budget.",
  },
  building: {
    dot: "bg-cat-building",
    hoverBorder: "hover:border-cat-building",
    tagline: "What's actually shipping.",
  },
  productivity: {
    dot: "bg-cat-productivity",
    hoverBorder: "hover:border-cat-productivity",
    tagline: "Systems for actually getting things done.",
  },
  "my launches": {
    dot: "bg-cat-my-launches",
    hoverBorder: "hover:border-cat-my-launches",
    tagline: "New things I've built, out in the open.",
  },
};

const fallback: Omit<CategoryMeta, "tagline"> = {
  dot: "bg-accent",
  hoverBorder: "hover:border-accent",
};

/**
 * Looks up color + tagline for a category name. Falls back to a generic
 * accent-blue style with an auto-generated tagline for any category that
 * isn't one of the six above (e.g. a typo, or a new category added in
 * RyokaOS that hasn't been given a color here yet).
 */
export function getCategoryMeta(name: string): CategoryMeta {
  const meta = categoryMeta[name.toLowerCase()];
  if (meta) return meta;
  return { ...fallback, tagline: `Posts about ${name}.` };
}
