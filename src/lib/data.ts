import data from "@/data/products.json";
import site from "@/data/site.json";
export type Variant = { size: string; color: string; available: boolean };
export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  createdAt: string;
  description: string;
  images: { src: string; alt: string; label: string; zoom: boolean }[];
  variants: Variant[];
  details: string[];
};
const products: Product[] = data;
if (
  new Set(products.map((p) => p.slug)).size !== products.length ||
  products.some(
    (p) =>
      !site.brands.includes(p.brand) ||
      !site.categories.some((c) => c.id === p.category) ||
      !Number.isFinite(p.price) ||
      p.price < 0 ||
      !p.images.length ||
      !p.variants.length ||
      new Set(p.variants.map((v) => `${v.size}:${v.color}`)).size !==
        p.variants.length ||
      p.variants.some((v) => typeof v.available !== "boolean"),
  )
)
  throw new Error("Revisa productos, variantes, categorías y precios.");
export const getProducts = () => products;
export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);
export const getSite = () => site;
