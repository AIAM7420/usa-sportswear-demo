import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/data";
import { money } from "@/lib/contact";
export function ProductCard({ product: p, heading = "h2" }: { product: Product; heading?: "h2" | "h3" }) {
  const Heading = heading;
  const available = p.variants.some((v) => v.available);
  return (
    <article className="product-card">
      <Link
        href={`/colecciones/${p.slug}`}
        className="product-photo"
        aria-label={`${p.brand} ${p.name}, ver detalle`}
      >
        <Image
          src={p.images[0].src}
          alt={p.images[0].alt}
          fill
          sizes="(max-width: 359px) 100vw, (max-width: 767px) 50vw, (max-width: 1199px) 33vw, 25vw"
        />
        <span className="product-badge">
          {available ? "Referencia de categoría" : "Agotado · demo"}
        </span>
        <span className="product-view">Ver detalle</span>
      </Link>
      <div className="product-brand">{p.brand}</div>
      <div className="product-heading">
        <Heading>
          <Link href={`/colecciones/${p.slug}`}>{p.name}</Link>
        </Heading>
        <span>{money(p.price)}</span>
      </div>
      <p className="product-meta">
        {[...new Set(p.variants.map((v) => v.color))].join(" / ")} · Demo
      </p>
    </article>
  );
}
