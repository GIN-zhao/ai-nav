import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "AI Tools Universe",
  description: "Discover and explore the most powerful AI tools that are shaping our future. A curated collection of AI tools for chat, code, art, writing, music and video.",
  keywords: "AI tools, artificial intelligence, ChatGPT, Claude AI, Midjourney, GitHub Copilot, AI chat, AI code, AI art",
  authors: [{ name: "AI Tools Universe" }],
  openGraph: {
    title: "AI Tools Universe",
    description: "Discover and explore the most powerful AI tools that are shaping our future",
    url: "https://ai-nav-nine.vercel.app/",
    siteName: "AI Tools Universe",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Tools Universe",
    description: "Discover and explore the most powerful AI tools that are shaping our future",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
