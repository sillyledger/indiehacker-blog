import { posts } from "./data";

export default function Home() {
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p.slug !== featured.slug);

  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <nav className="flex items-center justify-between border-b border-ink/10 pb-4 mb-10">
        <a href="/" className="inline-block">
          <span className="text-lg font-medium relative">
            indiehacker
            <span className="absolute left-0 -bottom-1 h-[3px] w-full bg-ink" />
          </span>
        </a>
        <div className="flex gap-5 text-sm text-muted">
          <a href="/">Latest</a>
          <a href="/category/building-alone">Building alone</a>
          <a href="/category/money">Money</a>
          <a href="/about">About</a>
        </div>
      </nav>

      <section className="mb-10">
        <p className="text-xs text-faint mb-2">Featured</p>
        <a href={`/posts/${featured.slug}`}>
          <h1 className="text-2xl font-medium leading-snug mb-2">
            {featured.title}
          </h1>
        </a>
        <p className="text-[15px] text-muted leading-relaxed mb-2">
          {featured.hook}
        </p>
        <p className="text-xs text-faint">
          {formatDate(featured.date)} · {featured.readMinutes} min read
        </p>
      </section>

      <section className="flex flex-col">
        {rest.map((post) => (
          
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="border-t border-ink/10 py-5 first:pt-5 block hover:opacity-80"
          >
            <p className="text-xs text-faint mb-1">{post.category}</p>
            <h3 className="text-[17px] font-medium mb-1">{post.title}</h3>
            <p className="text-sm text-muted leading-relaxed">{post.hook}</p>
          </a>
        ))}
      </section>

      <section className="mt-10 bg-ink/5 rounded-xl px-6 py-5 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <p className="text-[15px] font-medium mb-1">
            One honest read a week
          </p>
          <p className="text-sm text-muted">
            No growth hacks. Just what building alone actually looks like.
          </p>
        </div>
        <input
          type="email"
          placeholder="name@email.com"
          className="w-[200px] h-9 px-3 rounded-md border border-ink/15 bg-white text-sm"
        />
      </section>
    </main>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}
