import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";
import { LanguageProvider } from "@/lib/language";
import Chatbot from "@/components/Chatbot";
import CookieConsent from "@/components/CookieConsent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rotelu-web.vercel.app";

export const metadata: Metadata = {
  title: "ROTELU | Engineering Steel Solutions — Heavy Steel Fabrication & Certified Welding",
  description:
    "ROTELU is a Spanish company with over 35 years of experience in heavy steel fabrication, welded constructions, complex metal structures and critical components for hydroelectric, offshore wind and shipbuilding industries. Certified EN 1090 EXC3 and ISO 3834-2.",
  keywords: [
    "heavy steel fabrication",
    "offshore wind structures",
    "hydroelectric steel components",
    "pressure vessel manufacturer Europe",
    "certified welding company",
    "EN 1090 EXC3",
    "ISO 3834-2",
    "industrial metalwork Spain",
    "naval steel structures",
    "calderería pesada",
    "soldadura certificada",
    "estructuras metálicas",
  ],
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      es: "/",
      fr: "/",
      de: "/",
    },
  },
  openGraph: {
    title: "ROTELU — Engineering Steel Solutions",
    description:
      "More than 35 years manufacturing critical welded structures for hydroelectric, offshore wind, naval and industrial clients worldwide.",
    locale: "en_US",
    type: "website",
    siteName: "ROTELU",
    url: baseUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "ROTELU — Engineering Steel Solutions",
    description:
      "Heavy steel fabrication, certified welding, hydroelectric & offshore wind components since 1988.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="canonical" href={baseUrl} />
        <link rel="alternate" hrefLang="en" href={baseUrl} />
        <link rel="alternate" hrefLang="es" href={baseUrl} />
        <link rel="alternate" hrefLang="fr" href={baseUrl} />
        <link rel="alternate" hrefLang="de" href={baseUrl} />
        <link rel="alternate" hrefLang="x-default" href={baseUrl} />
        <link rel="manifest" href="/manifest.json" />
        <script dangerouslySetInnerHTML={{ __html: `if('serviceWorker' in navigator){navigator.serviceWorker.register('/sw.js')}` }} />
        <link rel="preconnect" href="https://rotelu.es" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://img.freepik.com" />
        <link rel="dns-prefetch" href="https://rotelu.es" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <script defer data-domain="rotelu.es" src="https://plausible.io/js/script.js" />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <LanguageProvider>
            {children}
            <Chatbot />
            <CookieConsent />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
