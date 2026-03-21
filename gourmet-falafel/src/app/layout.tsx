import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Gourmet Falafel | Adelaide's Best Falafel – Central Market & Rundle Mall",
    template: "%s | Gourmet Falafel Adelaide",
  },
  description:
    "Gourmet Falafel serves 100% South Australian-made falafels at Adelaide Central Market and Adelaide Central Plaza (Rundle Mall). Fully vegan and gluten-free options. Visit us at 44-60 Gouger St or 100 Rundle Mall, Adelaide SA 5000.",
  keywords: [
    "gourmet falafel",
    "falafel Adelaide",
    "vegan Adelaide",
    "gluten free Adelaide",
    "Adelaide Central Market food",
    "Rundle Mall food",
    "Middle Eastern food Adelaide",
    "falafel wrap Adelaide",
    "halal Adelaide",
    "plant-based Adelaide",
  ],
  authors: [{ name: "Gourmet Falafel" }],
  creator: "Gourmet Falafel",
  metadataBase: new URL("https://www.gourmetfalafel.com.au"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://www.gourmetfalafel.com.au",
    siteName: "Gourmet Falafel",
    title: "Gourmet Falafel | Adelaide's Best Falafel",
    description:
      "100% SA-made falafels, fully vegan & gluten-free. Find us at Adelaide Central Market (44-60 Gouger St) and Adelaide Central Plaza (100 Rundle Mall).",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gourmet Falafel | Adelaide's Best Falafel",
    description:
      "100% SA-made falafels, fully vegan & gluten-free. Find us at Adelaide Central Market & Rundle Mall.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FoodEstablishment",
      "@id": "https://www.gourmetfalafel.com.au/#central-market",
      name: "Gourmet Falafel – Adelaide Central Market",
      url: "https://www.gourmetfalafel.com.au",
      servesCuisine: ["Middle Eastern", "Vegan", "Gluten-Free"],
      priceRange: "$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "44-60 Gouger St",
        addressLocality: "Adelaide",
        addressRegion: "SA",
        postalCode: "5000",
        addressCountry: "AU",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -34.9285,
        longitude: 138.5986,
      },
    },
    {
      "@type": "FoodEstablishment",
      "@id": "https://www.gourmetfalafel.com.au/#rundle-mall",
      name: "Gourmet Falafel – Adelaide Central Plaza",
      url: "https://www.gourmetfalafel.com.au",
      servesCuisine: ["Middle Eastern", "Vegan", "Gluten-Free"],
      priceRange: "$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "100 Rundle Mall",
        addressLocality: "Adelaide",
        addressRegion: "SA",
        postalCode: "5000",
        addressCountry: "AU",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
