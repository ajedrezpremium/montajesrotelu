import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
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
    "ROTELU es una empresa española con más de 35 años de experiencia en calderería pesada, construcciones soldadas, estructuras metálicas complejas y componentes críticos para hidroeléctrica, eólica offshore y construcción naval. Certificada EN 1090 EXC3 e ISO 3834-2.",
  keywords: [
    "heavy steel fabrication",
    "offshore wind structures",
    "hydroelectric steel components",
    "pressure vessel manufacturer",
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
    locale: "es_ES",
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
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="canonical" href="https://rotelu.es" />
      </head>
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-[#f5f5f5]">
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
