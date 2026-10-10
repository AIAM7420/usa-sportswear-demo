import { test, expect } from "@playwright/test";
import products from "../src/data/products.json";

test("all product routes, internal links and local images resolve", async ({ page, request }) => {
  const targets = new Set<string>(["/robots.txt", "/sitemap.xml", "/icon.svg"]);
  const routes = ["/", "/colecciones", "/nosotros", "/valores", "/contacto", ...products.map(p => `/colecciones/${p.slug}`)];
  for (const route of routes) {
    expect((await page.goto(route))?.status(), route).toBe(200);
    const paths = await page.locator("a[href], img[src]").evaluateAll(elements => elements.map(el => el.getAttribute("href") || el.getAttribute("src") || "").filter(path => path.startsWith("/") && !path.startsWith("//")));
    paths.forEach(path => targets.add(path.split("#")[0]));
  }
  products.forEach(p => p.images.forEach(img => targets.add(img.src)));
  for (const target of targets) {
    expect((await request.get(target)).ok(), target).toBe(true);
  }
});
