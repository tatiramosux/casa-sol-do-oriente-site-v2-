import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { WhatsAppButton } from "../components/whatsapp-button";
import { RouteTransition } from "../components/route-transition";
import { GoogleAnalytics } from "../components/google-analytics";
import { StructuredData } from "../components/structured-data";
import { siteConfig } from "../lib/site";

const display = Cormorant_Garamond({ variable: "--font-display", subsets: ["latin"], weight: ["500", "600", "700"], style: ["normal", "italic"] });
const sans = DM_Sans({ variable: "--font-sans", subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "Casa Sol do Oriente | Acolhimento e espiritualidade", template: "%s | Casa Sol do Oriente" },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "Espiritualidade e projetos sociais",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website", locale: "pt_BR", url: "/", siteName: siteConfig.name,
    title: "Casa Sol do Oriente | Acolhimento e espiritualidade", description: siteConfig.description,
    images: [{ url: "/casa-sol/banner-hero.webp", alt: "Casa Universalista Sol do Oriente" }],
  },
  twitter: {
    card: "summary_large_image", title: "Casa Sol do Oriente | Acolhimento e espiritualidade",
    description: siteConfig.description, images: ["/casa-sol/banner-hero.webp"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  icons: {
    icon: [
      { url: "/favicon-casa-sol.ico", sizes: "any" },
      { url: "/favicon-casa-sol-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-casa-sol-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-casa-sol-96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/favicon-casa-sol.ico",
    apple: [{ url: "/apple-touch-icon-casa-sol.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className={`${display.variable} ${sans.variable}`}><StructuredData />{children}<RouteTransition /><WhatsAppButton /><GoogleAnalytics /></body></html>;
}
