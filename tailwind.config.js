/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1c1c1e",
        muted: "#666670",
        faint: "#8b8a84",
        paper: "#f7f6f2",
        canvas: "#ffffff",
      },
    },
  },
  plugins: [],
};
