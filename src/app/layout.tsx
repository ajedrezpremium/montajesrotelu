import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";
import { LanguageProvider } from "@/lib/language";
import Chatbot from "@/components/Chatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
  openGraph: {
    title: "ROTELU — Engineering Steel Solutions",
    description:
      "More than 35 years manufacturing critical welded structures for hydroelectric, offshore wind, naval and industrial clients worldwide.",
    locale: "en_US",
    type: "website",
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
        <link rel="canonical" href="https://rotelu-web.vercel.app" />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <LanguageProvider>
            {children}
            <Chatbot />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
