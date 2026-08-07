import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { SiteChrome } from "./components/SiteChrome";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const interDisplay = Inter({
  variable: "--font-inter-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://teampsmpv.com"),
  title: {
    default: "TEAM-PSMPV | Engineering the Essential",
    template: "%s | TEAM-PSMPV",
  },
  description:
    "Moradabad-based IT company building websites, CRM systems, WhatsApp automation, AI agents, Android products and managed digital operations across India.",
  keywords: [
    "TEAM-PSMPV",
    "best IT company in Moradabad",
    "best IT company in Varanasi",
    "IT company in Uttar Pradesh",
    "software company in Moradabad",
    "web development company in Moradabad",
    "IT services in Varanasi",
    "software development",
    "AI automation",
    "WhatsApp automation",
    "CRM development",
    "website development India",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "TEAM-PSMPV | Engineering the Essential",
    description:
      "Precision systems for modern products, workflows and digital operations.",
    url: "https://teampsmpv.com",
    siteName: "TEAM-PSMPV",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary",
    title: "TEAM-PSMPV | Engineering the Essential",
    description: "Precision Systems for Modern Products & Vision.",
  },
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/brand/APPLE-TOUCH-ICON-180X180.PNG",
  },
  other: {
    "codex-preview": "development",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organization = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": "https://teampsmpv.com/#organization",
    name: "TEAM-PSMPV",
    url: "https://teampsmpv.com",
    logo: "https://teampsmpv.com/brand/TEAM-PSMPV-LOCKUP-BLACK-OUTLINED.svg",
    description:
      "IT and software engineering company in Moradabad serving businesses across Uttar Pradesh and India.",
    email: "support@teampsmpv.com",
    telephone: "+91 8218501002",
    identifier: {
      "@type": "PropertyValue",
      name: "Udyam Registration Number",
      value: "UDYAM-UP-59-0114903",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Moradabad",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    areaServed: [
      "Moradabad",
      "Varanasi",
      "Lucknow",
      "Noida",
      "Ghaziabad",
      "Bareilly",
      "Rampur",
      "Amroha",
      "Kanpur",
      "Prayagraj",
      "Delhi NCR",
      "India",
    ].map((name) => ({ "@type": name === "India" ? "Country" : "City", name })),
    sameAs: [
      "https://www.linkedin.com/company/teampsmpv/",
      "https://www.instagram.com/teampsmpv/",
      "https://x.com/teampsmpv",
    ],
    knowsAbout: [
      "Website development",
      "CRM development",
      "WhatsApp automation",
      "AI agents and chatbots",
      "Android app development",
      "Managed IT services",
    ],
  };

  return (
    <html lang="en">
      <body
        className={`${geist.variable} ${geistMono.variable} ${interDisplay.variable}`}
      >
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <SiteChrome>{children}</SiteChrome>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
        />
      </body>
    </html>
  );
}
