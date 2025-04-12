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
  metadataBase: new URL('https://asterixhdev.vercel.app'),
  title: {
    default: "Paul Peter - Frontend Developer",
    template: "%s | AsterixhDev"
  },
  description: "Professional frontend developer specializing in React, Next.js, TypeScript and modern web technologies. View my portfolio of projects and services.",
  keywords: [
    "frontend developer", 
    "React developer", 
    "Next.js developer", 
    "web development",
    "full stack developer", 
    "TypeScript", 
    "UI/UX design", 
    "portfolio"
  ],
  authors: [{ name: "Paul Peter", url: "https://github.com/CodeWithAsterixh" }],
  creator: "Paul Peter",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://asterixhdev.vercel.app",
    title: "Paul Peter - Frontend Developer",
    description: "Professional frontend developer specializing in React, Next.js, TypeScript and modern web technologies.",
    siteName: "AsterixhDev Portfolio",
    images: [{
      url: "/images/my-image.jpg",
      width: 1200,
      height: 630,
      alt: "Paul Peter - Frontend Developer"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Paul Peter - Frontend Developer",
    description: "Professional frontend developer specializing in React, Next.js, TypeScript and modern web technologies.",
    creator: "@AsterixhThanks",
    images: [{
      url: "/images/my-image.jpg",
      alt: "Paul Peter - Frontend Developer"
    }]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
  alternates: {
    canonical: "https://asterixhdev.com"
  },
  verification: {
    google: "YOUR-GOOGLE-VERIFICATION-ID", // Add your Google verification ID
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#072126" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
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