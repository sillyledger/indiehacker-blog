/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#f2f1ec",
        muted: "#a9a8a2",
        faint: "#8b8a84",
        paper: "#17181c",
        surface: "#212226",
        accent: "#c9d9b0",
      },
    },
  },
  plugins: [],
};
