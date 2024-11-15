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
  title: "AI工具宇宙",
  description: "发现和探索最强大的AI工具，精选聊天、代码、艺术、写作、音乐和视频等领域的AI工具集合。",
  keywords: "AI工具, 人工智能, ChatGPT, Claude AI, Midjourney, GitHub Copilot, AI聊天, AI编程, AI艺术",
  authors: [{ name: "AI工具宇宙" }],
  openGraph: {
    title: "AI工具宇宙",
    description: "发现和探索最强大的AI工具，塑造我们的未来",
    url: "https://ai-nav-nine.vercel.app/",
    siteName: "AI工具宇宙",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI工具宇宙",
    description: "发现和探索最强大的AI工具，塑造我们的未来",
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
