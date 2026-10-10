import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProducts, getProduct, getSite } from "@/lib/data";
import { ProductDetail } from "@/components/product-detail";
import { ProductCard } from "@/components/product-card";
type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return getProducts().map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return { title: "Producto no encontrado" };
  return {
    title: `${p.brand} ${p.name}`,
    description: p.description,
    alternates: { canonical: `/colecciones/${p.slug}` },
    openGraph: {
      title: `${p.brand} ${p.name} · Demo`,
      description: p.description,
      images: [{ url: p.images[0].src, alt: p.images[0].alt }],
    },
  };
}
export default async function ProductPage({ params }: Props) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  return (
    <div className="container product-page">
      <nav className="breadcrumbs" aria-label="Ruta de navegación">
        <Link href="/">Inicio</Link>
        <span>/</span>
        <Link href="/colecciones">Colecciones</Link>
        <span>/</span>
        <span>{p.name}</span>
      </nav>
      <ProductDetail product={p} phone={getSite().phone} />
      <section className="section">
        <div className="section-heading">
          <h2>Completa tu día.</h2>
          <Link href="/colecciones" className="text-link">
            Toda la colección
          </Link>
        </div>
        <div className="product-grid">
          {getProducts()
            .filter((x) => x.slug !== p.slug)
            .slice(0, 4)
            .map((x) => (
              <ProductCard key={x.id} product={x} heading="h3" />
            ))}
        </div>
      </section>
    </div>
  );
}
