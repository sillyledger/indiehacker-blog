export type PostRow = {
  title: string;
  slug: string;
  category: string | null;
  published_at: string;
  content: string | null;
};

export function groupByYear(posts: PostRow[]) {
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

export function formatDate(iso: string) {
  const [year, month, day] = iso.slice(0, 10).split("-");
  return `${month}-${day}-${year}`;
}

export function excerpt(html: string, maxLen = 120) {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).replace(/\s+\S*$/, "") + "…";
}

// Mirrors the cat.* colors in tailwind.config.js — needed as raw hex here
// since the timeline nodes are inline-styled, not Tailwind classes.
export const CATEGORY_HEX: Record<string, string> = {
  thoughts: "#7DD48B",
  money: "#E8AC3D",
  marketing: "#F2789F",
  building: "#4FD1C5",
  productivity: "#B79CF2",
  "my launches": "#6C93FF",
};
