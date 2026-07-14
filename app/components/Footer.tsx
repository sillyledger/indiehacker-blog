export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="max-w-[1180px] mx-auto px-6 md:px-10 py-10 flex flex-wrap items-center justify-between gap-4 font-mono text-[12px] text-faint">
        <span>© 2026 indiehacker.blog</span>
        <a href="mailto:p@ryoka.xyz" className="hover:text-ink transition-colors">
          p@ryoka.xyz
        </a>
      </div>
    </footer>
  );
}
