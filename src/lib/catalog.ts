import type { Product } from "./data";
export type Filters = {
  q: string;
  brands: string[];
  categories: string[];
  sizes: string[];
  min: string;
  max: string;
  sort: string;
};
export const defaults: Filters = {
  q: "",
  brands: [],
  categories: [],
  sizes: [],
  min: "",
  max: "",
  sort: "newest",
};
export function readFilters(params: URLSearchParams): Filters {
  return {
    q: params.get("q") || "",
    brands: params.getAll("brand"),
    categories: params.getAll("category"),
    sizes: params.getAll("size"),
    min: params.get("min") || "",
    max: params.get("max") || "",
    sort: params.get("sort") || "newest",
  };
}
export function filterProducts(products: Product[], f: Filters): Product[] {
  const normalize = (s: string) =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLocaleLowerCase("es-MX");
  const min =
    f.min !== "" && Number.isFinite(Number(f.min)) ? Number(f.min) : 0;
  const max =
    f.max !== "" && Number.isFinite(Number(f.max)) ? Number(f.max) : Infinity;
  return products
    .filter(
      (p) =>
        normalize(`${p.name} ${p.brand}`).includes(normalize(f.q)) &&
        (!f.brands.length || f.brands.includes(p.brand)) &&
        (!f.categories.length || f.categories.includes(p.category)) &&
        (!f.sizes.length ||
          p.variants.some((v) => v.available && f.sizes.includes(v.size))) &&
        p.price >= min &&
        p.price <= max,
    )
    .sort((a, b) =>
      f.sort === "price-asc"
        ? a.price - b.price
        : f.sort === "price-desc"
          ? b.price - a.price
          : b.createdAt.localeCompare(a.createdAt),
    );
}
export function serializeFilters(f: Filters): string {
  const p = new URLSearchParams();
  if (f.q) p.set("q", f.q);
  f.brands.forEach((v) => p.append("brand", v));
  f.categories.forEach((v) => p.append("category", v));
  f.sizes.forEach((v) => p.append("size", v));
  if (f.min) p.set("min", f.min);
  if (f.max) p.set("max", f.max);
  if (f.sort !== "newest") p.set("sort", f.sort);
  return p.toString();
}
