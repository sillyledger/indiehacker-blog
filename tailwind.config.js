/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Same token names the rest of the repo already uses
        // (bg-paper, text-ink, text-muted, text-faint, border-ink/10, etc.)
        // — only the values change, from the old light palette to the new
        // dark one. This is what makes every existing page go dark the
        // moment this file deploys, with zero other edits required yet.
        ink: "#EDEDF0",     // was #1c1c1e — primary text, now light-on-dark
        muted: "#8B8B92",   // was #666670 — secondary text
        faint: "#ADADB5",   // was #8b8a84 — nav links at rest, timestamps
        paper: "#212126",   // was #f7f6f2 — card/panel background
        canvas: "#19191C",  // was #ffffff — page background

        // New tokens, not used yet by any existing page
        accent: "#6C93FF",
        line: "#313138",

        cat: {
          seo: "#6C93FF",
          money: "#E8AC3D",
          marketing: "#F2789F",
          building: "#4FD1C5",
          opinion: "#B79CF2",
          thoughts: "#7DD48B",
        },
      },
      fontFamily: {
        // These CSS variables get defined in app/layout.tsx in the next
        // step. Until that file is updated, these safely fall back to
        // system-ui, so nothing breaks in between the two deploys.
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
