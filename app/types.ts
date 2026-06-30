export type Post = {
  slug: string;
  title: string;
  hook: string;
  category: string;
  date: string;
  readMinutes: number;
  featured?: boolean;
};
