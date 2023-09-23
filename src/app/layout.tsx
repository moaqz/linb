import "./globals.css";
import type { Metadata } from "next";

import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Linb - Find your Favorite websites in seconds",
  description:
    "A Simple and Intuitive Bookmarking Application to Organize Your Links.",
  themeColor: "#E3FD62",
  openGraph: {
    siteName: "Linb - Find your Favorite websites in seconds",
    description:
      "A Simple and Intuitive Bookmarking Application to Organize Your Links.",
    url: "https://linb.vercel.app",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-primary text-black">{children}</body>
      </html>
    </ClerkProvider>
  );
}
