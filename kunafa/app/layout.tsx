import type { Metadata, Viewport } from "next";
import { Fraunces, Work_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#030303",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Captain Kunafa | The Golden Alchemy of Scrollytelling",
  description:
    "An artisanal journey through exploding layers of crisp golden kataifi, molten Akawi cheese, and Aleppo pistachios. Handcrafted royal Kunafa.",
  keywords: ["Kunafa", "Captain Kunafa", "Artisanal Dessert", "Kataifi", "Middle Eastern Pastry", "Scrollytelling"],
  authors: [{ name: "Captain Kunafa" }],
  openGraph: {
    title: "Captain Kunafa | The Golden Alchemy",
    description: "Experience the royal disassembly and reassembly of the world's finest Kunafa.",
    type: "website",
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
      className={`${fraunces.variable} ${workSans.variable} ${ibmPlexMono.variable} dark`}
    >
      <body className="bg-[#030303] text-white/90 font-sans selection:bg-[#EFB80D]/30 selection:text-[#EFB80D] overflow-x-hidden antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
