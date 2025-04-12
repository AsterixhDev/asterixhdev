import "@/components/magicui/ui.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AsterixhDev | Full Stack Developer & UI/UX Designer",
  description: "Professional web developer specializing in React, Next.js, TypeScript and modern web technologies. View my portfolio of projects and services.",
  keywords: ["web developer", "full stack developer", "React developer", "Next.js", "TypeScript", "UI/UX design", "frontend development", "portfolio"],
  authors: [{ name: "Paul Peter", url: "https://github.com/CodeWithAsterixh" }],
  creator: "Paul Peter",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://asterixhdev.vercel.app",
    title: "AsterixhDev | Full Stack Developer & UI/UX Designer",
    description: "Professional web developer specializing in React, Next.js, TypeScript and modern web technologies.",
    siteName: "AsterixhDev Portfolio",
    images: [{
      url: "/images/my-image.jpg", // Add your OG image
      width: 1200,
      height: 630
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "AsterixhDev | Full Stack Developer & UI/UX Designer",
    description: "Professional web developer specializing in React, Next.js, TypeScript and modern web technologies.",
    creator: "@AsterixhThanks",
    images: ["/my-image.jpg"]
  },
  robots: {
    index: true,
    follow: true
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased !h-screen overflow-hidden bg-gradient-to-tl from-muted to-black`}
      >
        <SidebarProvider>
        {children}
        </SidebarProvider>
      </body>
    </html>
  );
}
