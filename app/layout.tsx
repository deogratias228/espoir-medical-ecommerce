import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { CartProvider } from "@/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "400", "600", "900"],
});

export const metadata: Metadata = {
  title: "Espoir Médical | Fournisseur de matériel médical au Togo",
  description: "Espoir Médical est votre partenaire de confiance pour la vente de matériel médical, chirurgical, orthopédique, sportif et de kinésithérapie au Togo. Produits fiables et durables pour professionnels et particuliers.",
  keywords: [
    "matériel médical Togo",
    "vente équipements médicaux",
    "fournisseur chirurgical Lomé",
    "orthopédie",
    "kinésithérapie",
    "Espoir Médical",
  ],
  openGraph: {
    title: "Espoir Médical - Fournisseur de matériel médical au Togo",
    description:
      "Découvrez nos équipements médicaux fiables et accessibles : fauteuils roulants, glucomètres, tensiomètres, et bien plus.",
    url: "https://espoir-medical.com",
    siteName: "Espoir Médical",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://espoir-medical.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Espoir Médical - Boutique d’équipements médicaux au Togo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Espoir Médical | Fournisseur de matériel médical au Togo",
    description:
      "Votre partenaire de confiance pour du matériel médical fiable et durable au Togo.",
    images: ["https://espoir-medical.com/og-image.jpg"],
  },
  metadataBase: new URL("https://espoir-medical.com"),
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-grow bg-white px-2">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster position="bottom-right" />
        </CartProvider>
      </body>
    </html>
  );
}