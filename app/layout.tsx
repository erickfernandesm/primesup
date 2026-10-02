import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Archivo } from "next/font/google";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartProvider } from "@/components/cart/CartProvider";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { JsonLd } from "@/components/ui/JsonLd";
import { storeConfig } from "@/data/store";
import { storeJsonLd } from "@/lib/seo";
import "./globals.css";

/** Uma família só: largura normal no texto, expandida nos títulos (eixo wdth). */
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const title = `${storeConfig.name} | Loja de suplementos em Juiz de Fora`;

export const metadata: Metadata = {
  metadataBase: new URL(storeConfig.url),
  title: { default: title, template: `%s | ${storeConfig.name}` },
  description: storeConfig.description,
  applicationName: storeConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: storeConfig.name,
    title,
    description: storeConfig.description,
    url: "/",
    images: [{ url: storeConfig.ogImage, width: 1200, height: 630, alt: storeConfig.name }],
  },
  twitter: { card: "summary_large_image", title, description: storeConfig.description },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={archivo.variable}>
      <body className="flex min-h-dvh flex-col">
        <CartProvider>
          <Header />
          <main id="conteudo" className="flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppFloat />
          <CartDrawer />
        </CartProvider>
        <JsonLd data={storeJsonLd()} />
      </body>
    </html>
  );
}
