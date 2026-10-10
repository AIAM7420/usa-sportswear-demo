"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import type { Product } from "@/lib/data";
import { money } from "@/lib/contact";
import { ContactAction } from "./contact-action";
export function ProductDetail({
  product: p,
  phone,
}: {
  product: Product;
  phone: string | null;
}) {
  const first = p.variants.find((v) => v.available);
  const [color, setColor] = useState(first?.color || p.variants[0].color);
  const [size, setSize] = useState(first?.size || "");
  const [active, setActive] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const colors = [...new Set(p.variants.map((v) => v.color))];
  const sizes = [...new Set(p.variants.map((v) => v.size))];
  const available = p.variants.some(
    (v) => v.color === color && v.size === size && v.available,
  );
  function changeColor(c: string) {
    setColor(c);
    if (
      !p.variants.some((v) => v.color === c && v.size === size && v.available)
    )
      setSize(p.variants.find((v) => v.color === c && v.available)?.size || "");
  }
  function go(index: number) {
    setActive(index);
    track.current?.scrollTo({
      left: index * track.current.clientWidth,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }
  const message = available
    ? `Hola, me interesa ${p.brand} ${p.name}, talla ${size}, color ${color.toLowerCase()}, con precio de ${money(p.price)} MXN. ¿Está disponible?`
    : `Me interesa ${p.brand} ${p.name}. Esta referencia de demostración no tiene una variante disponible seleccionada.`;
  return (
    <div className="product-detail">
      <div className="gallery">
        <div
          ref={track}
          className="gallery-track"
          tabIndex={0}
          role="region"
          aria-label="Galería del producto"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              e.preventDefault();
              go(Math.min(active + 1, p.images.length - 1));
            }
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              go(Math.max(active - 1, 0));
            }
          }}
          onScroll={(e) =>
            setActive(
              Math.round(
                e.currentTarget.scrollLeft / e.currentTarget.clientWidth,
              ),
            )
          }
        >
          {p.images.map((img, i) => (
            <div className={`gallery-slide ${img.zoom ? "zoom" : ""}`} key={i}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                priority={i === 0}
                sizes="(max-width: 767px) 100vw, 55vw"
              />
            </div>
          ))}
        </div>
        <div className="gallery-controls">
          <button
            className="icon-button"
            aria-label="Imagen anterior"
            disabled={active === 0}
            onClick={() => go(active - 1)}
          >
            <ChevronLeft size={20} />
          </button>
          <p aria-live="polite">
            {p.images[active]?.label} · {active + 1} / {p.images.length}
          </p>
          <button
            className="icon-button"
            aria-label="Imagen siguiente"
            disabled={active === p.images.length - 1}
            onClick={() => go(active + 1)}
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="thumbnails">
          {p.images.map((img, i) => (
            <button
              className={active === i ? "selected" : ""}
              key={i}
              onClick={() => go(i)}
              aria-label={`Mostrar ${img.label.toLowerCase()}`}
              aria-pressed={active === i}
            >
              <Image src={img.src} alt="" width={75} height={90} />
              <span>{img.label}</span>
            </button>
          ))}
        </div>
        <p className="fine-print">
          Fotografía ilustrativa de categoría. El acercamiento utiliza la misma
          referencia. No representa un modelo comercial ni cambia al seleccionar
          un color.
        </p>
      </div>
      <div className="product-info">
        <p className="product-brand">{p.brand}</p>
        <h1>{p.name}</h1>
        <p className="detail-price">
          {money(p.price)} <span>MXN · Precio demo</span>
        </p>
        <p>{p.description}</p>
        <fieldset className="variant-fieldset">
          <legend>Color: {color}</legend>
          <div className="variant-options">
            {colors.map((c) => (
              <button
                key={c}
                aria-pressed={c === color}
                disabled={!p.variants.some((v) => v.color === c && v.available)}
                onClick={() => changeColor(c)}
              >
                {c === color ? <Check size={15} /> : null}
                {c}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset className="variant-fieldset">
          <legend>Talla</legend>
          <div className="variant-options">
            {sizes.map((s) => (
              <button
                key={s}
                aria-pressed={size === s}
                disabled={
                  !p.variants.some(
                    (v) => v.color === color && v.size === s && v.available,
                  )
                }
                onClick={() => setSize(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </fieldset>
        <p className={`stock ${available ? "" : "out-of-stock"}`} role="status">
          {available
            ? "Variante disponible en la demo"
            : "Sin disponibilidad en esta combinación"}
        </p>
        <ContactAction message={message} phone={phone} disabled={!available} />
        <details className="product-extra">
          <summary>Información de la prenda</summary>
          <ul>
            {p.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </details>
        <p className="fine-print">
          Ejemplo de catálogo multimarca. No hay afiliación, venta ni garantía
          de disponibilidad real.
        </p>
      </div>
    </div>
  );
}
