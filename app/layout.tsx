import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "indiehacker.blog",
  description: "No growth hacks. Just what building alone actually looks like.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
