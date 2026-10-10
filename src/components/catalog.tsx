"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { SlidersHorizontal, Search, X } from "lucide-react";
import { ProductCard } from "./product-card";
import type { Product } from "@/lib/data";
import {
  defaults,
  filterProducts,
  readFilters,
  serializeFilters,
  type Filters,
} from "@/lib/catalog";
type Props = {
  products: Product[];
  brands: string[];
  categories: { id: string; name: string }[];
};
function FilterFields({
  filters: f,
  onChange,
  brands,
  categories,
  sizes,
  prefix,
}: {
  filters: Filters;
  onChange: (f: Filters) => void;
  brands: string[];
  categories: Props["categories"];
  sizes: string[];
  prefix: string;
}) {
  function toggle(key: "brands" | "categories" | "sizes", value: string) {
    onChange({
      ...f,
      [key]: f[key].includes(value)
        ? f[key].filter((v) => v !== value)
        : [...f[key], value],
    });
  }
  return (
    <div className="filter-fields">
      {[
        {
          key: "brands" as const,
          title: "Marca",
          values: brands.map((b) => ({ id: b, name: b })),
        },
        { key: "categories" as const, title: "Categoría", values: categories },
        {
          key: "sizes" as const,
          title: "Talla disponible",
          values: sizes.map((s) => ({ id: s, name: s })),
        },
      ].map((group) => (
        <fieldset key={group.key}>
          <legend>{group.title}</legend>
          {group.values.map((v) => (
            <label
              className="checkbox-row"
              key={v.id}
              htmlFor={`${prefix}-${group.key}-${v.id}`}
            >
              <input
                id={`${prefix}-${group.key}-${v.id}`}
                type="checkbox"
                checked={f[group.key].includes(v.id)}
                onChange={() => toggle(group.key, v.id)}
              />
              <span>{v.name}</span>
            </label>
          ))}
        </fieldset>
      ))}
      <fieldset>
        <legend>Precio en MXN</legend>
        <div className="price-inputs">
          <label>
            Desde
            <input
              type="number"
              min="0"
              inputMode="numeric"
              placeholder="0"
              value={f.min}
              onChange={(e) => onChange({ ...f, min: e.target.value })}
            />
          </label>
          <label>
            Hasta
            <input
              type="number"
              min="0"
              inputMode="numeric"
              placeholder="Sin límite"
              value={f.max}
              onChange={(e) => onChange({ ...f, max: e.target.value })}
            />
          </label>
        </div>
        {f.min && f.max && Number(f.min) > Number(f.max) ? (
          <p className="filter-error">
            El mínimo supera al máximo. Ajusta el rango.
          </p>
        ) : null}
      </fieldset>
      <button
        className="clear-button"
        onClick={() => onChange({ ...defaults })}
      >
        Limpiar filtros
      </button>
    </div>
  );
}
export function Catalog({ products, brands, categories }: Props) {
  const sizes = [
    ...new Set(products.flatMap((p) => p.variants.map((v) => v.size))),
  ];
  const params = useSearchParams();
  const filters = readFilters(new URLSearchParams(params.toString()));
  const [open, setOpen] = useState(false);
  // Next's native History integration updates useSearchParams and supports browser history.
  const [search, setSearch] = useState(filters.q);
  useEffect(() => {
    const sync = () =>
      setSearch(new URLSearchParams(window.location.search).get("q") || "");
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);
  function update(next: Filters, replace = false) {
    const query = serializeFilters(next);
    window.history[replace ? "replaceState" : "pushState"](
      null,
      "",
      `/colecciones${query ? "?" + query : ""}`,
    );
  }
  const result = filterProducts(products, filters);
  const clear = () => {
    setSearch("");
    update({ ...defaults });
  };
  const change = (next: Filters) => {
    setSearch(next.q);
    update(next);
  };
  return (
    <>
      <div className="catalog-toolbar">
        <label className="search-field">
          <Search size={20} />
          <span className="sr-only">Buscar por nombre o marca</span>
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              update({ ...filters, q: e.target.value }, true);
            }}
            placeholder="Busca una prenda o una marca"
          />
        </label>
        <label className="sort-field">
          Ordenar por
          <select
            value={filters.sort}
            onChange={(e) => update({ ...filters, sort: e.target.value })}
          >
            <option value="newest">Novedades</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
          </select>
        </label>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button className="filter-trigger button button-outline">
              <SlidersHorizontal size={18} /> Filtros
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="dialog-overlay" />
            <Dialog.Content className="drawer filter-drawer">
              <Dialog.Title>Encuentra tu prenda</Dialog.Title>
              <Dialog.Description>
                Combina marca, categoría, talla y precio.
              </Dialog.Description>
              <Dialog.Close asChild>
                <button
                  className="icon-button drawer-close"
                  aria-label="Cerrar filtros"
                >
                  <X />
                </button>
              </Dialog.Close>
              <FilterFields
                filters={filters}
                onChange={change}
                brands={brands}
                categories={categories}
                sizes={sizes}
                prefix="mobile"
              />
              <Dialog.Close asChild>
                <button className="button full-width">
                  Ver {result.length}{" "}
                  {result.length === 1 ? "producto" : "productos"}
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
      <div className="catalog-layout">
        <aside className="filter-sidebar" aria-label="Filtros de productos">
          <h2>Encuentra tu prenda</h2>
          <FilterFields
            filters={filters}
            onChange={change}
            brands={brands}
            categories={categories}
            sizes={sizes}
            prefix="desktop"
          />
        </aside>
        <div>
          <div className="catalog-results">
            <p role="status">
              {result.length} {result.length === 1 ? "producto" : "productos"}
            </p>
            <button className="clear-button" onClick={clear}>
              Limpiar filtros
            </button>
          </div>
          {result.length ? (
            <div className="product-grid catalog-grid">
              {result.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h2>No encontramos esa combinación.</h2>
              <p>Prueba otra talla, amplía el precio o elimina un filtro.</p>
              <button className="button" onClick={clear}>
                Ver todos los productos
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
