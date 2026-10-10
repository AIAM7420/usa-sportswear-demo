import type { Metadata } from "next";
import { Suspense } from "react";
import { getProducts, getSite } from "@/lib/data";
import { Catalog } from "@/components/catalog";
export const metadata: Metadata = {
  title: "Colecciones",
  description:
    "Explora el catálogo demo con filtros de marca, talla, categoría y precio en MXN.",
  alternates: { canonical: "/colecciones" },
};
export default function Collections() {
  const site = getSite();
  return (
    <div className="container page-section">
      <div className="page-heading">
        <p className="section-kicker">Encuentra lo que va contigo</p>
        <h1>La colección.</h1>
        <p>Busca, combina y elige a tu ritmo.</p>
      </div>
      <Suspense fallback={<p role="status">Preparando el catálogo…</p>}>
        <Catalog
          products={getProducts()}
          brands={site.brands}
          categories={site.categories}
        />
      </Suspense>
      <p className="fine-print">
        Precios e inventario demostrativos. Las imágenes son referencias de
        categoría y no corresponden a modelos comerciales de las marcas. No
        existe afiliación con Nike, Adidas, Puma o Under Armour.
      </p>
    </div>
  );
}
