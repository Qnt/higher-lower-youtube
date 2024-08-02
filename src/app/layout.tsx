import "@/styles/globals.css";

import { cn } from "@/lib/utils";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Higher Lower YouTube",
  description: "Like a classic 'Higher or Lower' game, but for YouTube.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={cn(GeistSans.variable)}>{children}</body>
    </html>
  );
}
