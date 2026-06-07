import "./globals.css";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ServiceWorkerRegister from "@/components/layout/ServiceWorkerRegister";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "xBatoto — Read Manga, Manhwa & Manhua Online Free",
  description: "Read your favorite high-definition manga, manhwa, and manhua with premium speed, dynamic scrolling viewer, and offline caching on xBatoto.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://xbatoto.vercel.app"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/icon-192.png",
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark scroll-smooth`}>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#030303" />
      </head>
      <body className="min-h-screen flex flex-col bg-bg-primary text-text-primary font-sans antialiased overflow-x-hidden selection:bg-accent selection:text-white">
        {/* Navigation sticky header */}
        <Header />
        
        {/* Main core viewport container */}
        <main className="flex-grow flex flex-col w-full">
          {children}
        </main>
        
        {/* Footer directories */}
        <Footer />

        {/* Dynamic Client Actions mounting */}
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
