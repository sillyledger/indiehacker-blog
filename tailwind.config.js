/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Same token names the rest of the repo already uses
        // (bg-paper, text-ink, text-muted, text-faint, border-ink/10, etc.)
        // — only the values change, from the old light palette to the new
        // dark one.
        ink: "#EDEDF0",     // was #1c1c1e — primary text, now light-on-dark
        muted: "#8B8B92",   // was #666670 — secondary text
        faint: "#ADADB5",   // was #8b8a84 — nav links at rest, timestamps
        paper: "#212126",   // was #f7f6f2 — card/panel background
        canvas: "#19191C",  // was #ffffff — page background

        accent: "#6C93FF",
        line: "#313138",

        // Final taxonomy: Thoughts / Marketing / Money / Building /
        // Productivity / My Launches. (Opinion and SEO were dropped —
        // opinion merged into Thoughts, SEO wasn't a real category.
        // Productivity and my-launches reuse those two freed-up colors
        // rather than introducing new hex values.)
        cat: {
          thoughts: "#7DD48B",
          marketing: "#F2789F",
          money: "#E8AC3D",
          building: "#4FD1C5",
          productivity: "#B79CF2",
          "my-launches": "#6C93FF",
        },
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
