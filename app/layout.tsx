import type { Metadata, Viewport } from "next";
import { Fraunces, Work_Sans, IBM_Plex_Mono, Luckiest_Guy } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-mono",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

const luckiestGuy = Luckiest_Guy({
  variable: "--font-luckiest-guy",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Kunafa | Authentic Middle Eastern Kunafa in Hyderabad",
  description:
    "Hand-pressed on live copper pans with authentic Akawi cheese, cold-pressed ghee, and Aleppo pistachios. Visit our branches in Barkas, Jubilee Hills, Malakpet, Tolichowki & Aero City. Founded by Saud bin Nasar Khulagi.",
  keywords: [
    "Kunafa",
    "Kunafa Hyderabad",
    "Best Kunafa Barkas",
    "Kunafa Jubilee Hills",
    "Middle Eastern Dessert Hyderabad",
    "Saud bin Nasar Khulagi",
    "Live Kunafa Counter",
    "Akawi Cheese Kunafa",
  ],
  authors: [{ name: "Saud bin Nasar Khulagi" }, { name: "Kunafa" }],
  openGraph: {
    title: "Kunafa | Authentic Middle Eastern Kunafa in Hyderabad",
    description:
      "Handcrafted on live copper pans across our branches in Hyderabad. Fresh-pressed every single order with 48 dB acoustic crunch.",
    url: "https://captainkunafa.com",
    siteName: "Kunafa",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://captainkunafa.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kunafa - Authentic Levantine Kunafa in Hyderabad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kunafa | Authentic Middle Eastern Kunafa in Hyderabad",
    description:
      "Handcrafted on live copper pans across our branches in Hyderabad. Fresh-pressed every single order.",
    images: ["https://captainkunafa.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://captainkunafa.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${workSans.variable} ${ibmPlexMono.variable} ${luckiestGuy.variable}`}
    >
      <head>
        {/* Preconnects for critical external origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://unpkg.com" />

        {/* Eager Preload for LCP Hero First Frame */}
        <link
          rel="preload"
          as="image"
          href="/mobile-view-framesv2/ezgif-frame-001.webp"
          type="image/webp"
          fetchPriority="high"
          media="(max-width: 767px)"
        />
        <link
          rel="preload"
          as="image"
          href="/Kunafa-animations-v2/ezgif-frame-001.webp"
          type="image/webp"
          fetchPriority="high"
          media="(min-width: 768px)"
        />

        {/* Structured Data: LocalBusiness / Restaurant schema for local SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "Kunafa",
              image: "https://captainkunafa.com/og-image.jpg",
              "@id": "https://captainkunafa.com",
              url: "https://captainkunafa.com",
              telephone: "+919000000001",
              priceRange: "₹₹",
              servesCuisine: ["Middle Eastern", "Dessert", "Levantine"],
              founder: {
                "@type": "Person",
                name: "Saud bin Nasar Khulagi",
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: "Barkas, Old City",
                addressLocality: "Hyderabad",
                addressRegion: "Telangana",
                postalCode: "500005",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 17.3115,
                longitude: 78.4871,
              },
              // NOTE: aggregateRating removed to comply with Google Structured Data guidelines.
              // Re-add only with dynamically-sourced real customer reviews from Google Business Profile or verified feed.
            }),
          }}
        />
      </head>
      <body className="bg-[#050505] text-[#FFF8EC] font-sans selection:bg-[#EFB80D]/30 selection:text-[#EFB80D] min-h-screen flex flex-col antialiased">
        <SmoothScroll>
          <Navbar />
          <div className="grow">{children}</div>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
