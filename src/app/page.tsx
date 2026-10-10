import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MoveUpRight } from "lucide-react";
import { getProducts, getSite } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
export default function Home() {
  const site = getSite();
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <Reveal>
            <p className="hero-season">{site.home.heroNote}</p>
            <h1>
              {site.home.heroLine1}
              <br />
              {site.home.heroLine2}
              <span>.</span>
            </h1>
            <p>{site.home.intro}</p>
            <Link className="button" href="/colecciones">
              {site.home.heroButton} <ArrowUpRight size={20} />
            </Link>
          </Reveal>
          <div className="hero-bottom">
            <span>Entrena. Explora. Repite.</span>
            <span>Estilo en movimiento</span>
          </div>
        </div>
        <div className="hero-visual">
          <Image
            src="/images/movimiento.jpg"
            alt="Persona con leggings deportivos en unas escaleras exteriores"
            fill
            priority
            sizes="(max-width: 767px) 100vw, 50vw"
          />
          <div className="hero-sticker">
            <MoveUpRight size={38} />
            <span>
              El ritmo
              <br />
              lo pones tú.
            </span>
          </div>
        </div>
      </section>
      <div
        className="brand-strip"
        aria-label="Marcas incluidas como ejemplos de catálogo"
      >
        {site.brands.map((b) => (
          <span key={b}>{b}</span>
        ))}
      </div>
      <section className="section container">
        <div className="section-heading">
          <div>
            <p className="section-kicker">{site.home.categoryNote}</p>
            <h2>{site.home.categoryTitle}</h2>
          </div>
          <p>{site.home.categoryDescription}</p>
        </div>
        <div className="category-grid">
          {site.categories.map((c) => (
            <Link
              className="category-card"
              href={`/colecciones?category=${c.id}`}
              key={c.id}
            >
              <Image
                src={c.image}
                alt={`Referencia visual de ${c.name.toLowerCase()}`}
                fill
                sizes="(max-width: 767px) 50vw, 25vw"
              />
              <div>
                <h3>{c.name}</h3>
                <ArrowUpRight size={24} />
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="section selected-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="section-kicker">{site.home.featuredNote}</p>
              <h2>{site.home.featuredTitle}</h2>
            </div>
            <Link href="/colecciones" className="text-link">
              Ver todos los productos <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="product-grid">
            {getProducts()
              .slice(0, 4)
              .map((p) => (
                <ProductCard key={p.id} product={p} heading="h3" />
              ))}
          </div>
          <p className="fine-print">
            Catálogo ficticio. Fotografías ilustrativas de categoría; no
            representan modelos de las marcas indicadas.
          </p>
        </div>
      </section>
      <section className="editorial">
        <div className="editorial-visual">
          <Image
            src="/images/sudadera.jpg"
            alt="Detalle de una sudadera gris con capucha"
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
          />
        </div>
        <div className="editorial-copy">
          <p className="section-kicker">Más allá del entrenamiento</p>
          <h2>{site.home.storyTitle}</h2>
          <p>{site.home.story}</p>
          <Link href="/nosotros" className="text-link">
            Conoce USA Sportswear <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className="section container journal">
        <div>
          <p className="section-kicker">{site.home.journalNote}</p>
          <h2>
            {site.home.journalTitle1}
            <br />
            {site.home.journalTitle2}
          </h2>
          <p>{site.home.journalDescription}</p>
          <Link href="/colecciones?category=playeras" className="text-link">
            Encuentra tus básicos <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="journal-photo">
          <Image
            src="/images/playera.jpg"
            alt="Playera blanca de corte sencillo como referencia de un básico"
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
          />
        </div>
      </section>
      <section className="closing">
        <div className="container">
          <h2>{site.home.closingTitle}</h2>
          <Link className="button button-light" href="/colecciones">
            Encuentra tu prenda <ArrowUpRight size={20} />
          </Link>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: site.name,
            description: "Demo de catálogo de ropa deportiva, sin venta real",
            inLanguage: "es-MX",
          }),
        }}
      />
    </>
  );
}
