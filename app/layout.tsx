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
  weight: ["400", "600", "700"],
  display: "swap",
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const luckiestGuy = Luckiest_Guy({
  variable: "--font-brand",
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
  title: "Captain Kunafa | Authentic Middle Eastern Kunafa in Hyderabad",
  description:
    "Hand-pressed on live copper pans with authentic Akawi cheese, cold-pressed ghee, and Aleppo pistachios. Visit our branches in Barkas, Jubilee Hills, Malakpet, Tolichowki & Aero City. Founded by Saud bin Nasar Khulagi.",
  keywords: [
    "Captain Kunafa",
    "Kunafa Hyderabad",
    "Best Kunafa Barkas",
    "Kunafa Jubilee Hills",
    "Middle Eastern Dessert Hyderabad",
    "Saud bin Nasar Khulagi",
    "Live Kunafa Counter",
    "Akawi Cheese Kunafa",
  ],
  authors: [{ name: "Saud bin Nasar Khulagi" }, { name: "Captain Kunafa" }],
  openGraph: {
    title: "Captain Kunafa | Authentic Middle Eastern Kunafa in Hyderabad",
    description:
      "Handcrafted on live copper pans across our branches in Hyderabad. Fresh-pressed every single order with 48 dB acoustic crunch.",
    url: "https://captainkunafa.com",
    siteName: "Captain Kunafa",
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
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
        {/* Structured Data: LocalBusiness / Restaurant schema for local SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "Captain Kunafa",
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
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "520",
              },
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
