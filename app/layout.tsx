import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import GlobalBackground from "@/components/GlobalBackground";

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  variable: "--font-noto-sans-thai",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ValorHub | The Ultimate Valorant Database",
    template: "%s | ValorHub"
  },
  description: "Explore the most minimalist and fastest database for Valorant agents, bundle skins, and weapon accessories. Elegant design with real-time API data.",
  keywords: ["Valorant", "Valorant Database", "Valorant Agents", "Valorant Skins", "ValorHub", "Jett", "Valorant API", "Bundles"],
  authors: [{ name: "ValorHub Team" }],
  openGraph: {
    title: "ValorHub | Valorant Database",
    description: "The most elegant way to browse Valorant content.",
    url: "https://valorhub.vercel.app",
    siteName: "ValorHub",
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ValorHub | Valorant Database",
    description: "Minimalist Valorant database for agents and skins.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${notoSansThai.variable}`}>
      <body className="antialiased relative overflow-x-hidden">
        <GlobalBackground />
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="border-t border-white/10 py-10 mt-20 text-center text-sm text-white/50">
          <p>&copy; {new Date().getFullYear()} ValorHub. ข้อมูลสนับสนุนโดย Valorant-API.</p>
        </footer>
      </body>
    </html>
  );
}
