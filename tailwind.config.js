/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1c1c1e",
        muted: "#666670",
        faint: "#888780",
        paper: "#f7f6f2",
      },
    },
  },
  plugins: [],
};
