import type { Metadata } from "next";
import { Barlow_Condensed, Manrope } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";
const heading = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});
const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "USA Sportswear | Tu ritmo. Tu estilo.",
    template: "%s | USA Sportswear",
  },
  description:
    "Demo de una boutique deportiva multimarca. Explora prendas, tallas y colores y prepara tu consulta.",
  openGraph: {
    title: "USA Sportswear",
    description: "Hecho para moverte. Catálogo multimarca de demostración.",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/images/movimiento.jpg",
        width: 1600,
        height: 1067,
        alt: "Ropa deportiva en movimiento",
      },
    ],
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX" className={`${heading.variable} ${body.variable}`}>
      <body>
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
