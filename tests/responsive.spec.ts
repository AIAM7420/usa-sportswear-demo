import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const routes = [
  "/",
  "/colecciones",
  "/nosotros",
  "/valores",
  "/contacto",
  "/colecciones/nike-playeras-demo",
];
const widths = [320, 360, 375, 390, 430, 600, 768, 820, 1024, 1280, 1440, 1920];
test("all routes, responsive widths, images and console", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const width of widths) {
    await page.setViewportSize({ width, height: width < 600 ? 844 : 1000 });
    for (const route of routes) {
      await page.goto(route);
      await expect(page.locator("h1")).toBeVisible();
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth + 1,
      );
      expect(overflow, `${route} at ${width}px overflows`).toBe(false);
    }
  }
  for (const size of [
    { width: 844, height: 390 },
    { width: 1024, height: 768 },
  ]) {
    await page.setViewportSize(size);
    await page.goto("/");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBe(true);
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const route of routes) {
    await page.goto(route);
    const images = page.locator("img");
    for (let i = 0; i < (await images.count()); i++) {
      const img = images.nth(i);
      await img.scrollIntoViewIfNeeded();
      await expect(img).toHaveJSProperty("complete", true);
      expect(
        await img.evaluate((el: HTMLImageElement) => el.naturalWidth),
        `${route} image ${i}`,
      ).toBeGreaterThan(0);
    }
  }
  expect(errors).toEqual([]);
});
test("mobile menu keyboard behavior", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Abrir menú" });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Tab");
  expect(
    await dialog.evaluate((el) => el.contains(document.activeElement)),
  ).toBe(true);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await dialog.getByRole("link", { name: "Contacto", exact: true }).click();
  await expect(page).toHaveURL(/contacto/);
  await expect(dialog).not.toBeVisible();
});
test("accessibility audit desktop and mobile", async ({ page }) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of routes) {
      await page.goto(route);
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(result.violations, `${route} at ${width}px`).toEqual([]);
    }
  }
});
test("screenshots and reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [390, 820, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of [
      "/",
      "/colecciones",
      "/contacto",
      "/colecciones/nike-playeras-demo",
    ]) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(async () => {
        await Promise.all(
          Array.from(document.images).map((img) => {
            img.loading = "eager";
            return img.decode();
          }),
        );
      });
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({
        path: `reports/screenshots/${route.replaceAll("/", "_") || "home"}-${width}.png`,
        fullPage: true,
      });
    }
  }
});
test("demo contact and metadata", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/contacto");
  await expect(page.getByRole("textbox", { name: "Tu mensaje" })).toBeVisible();
  await page.getByRole("button", { name: "Copiar consulta" }).click();
  await expect(page.getByRole("status")).toContainText("Mensaje copiado");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    "Hola",
  );
  expect(await page.locator('a[href*="wa.me"]').count()).toBe(0);
  expect(
    await page
      .locator('head meta[property="og:title"]')
      .getAttribute("content"),
  ).toBeTruthy();
  const sitemap = await page.request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain("/colecciones/nike-playeras-demo");
  const robots = await page.request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  await page.goto("/ruta-inexistente");
  await expect(
    page.getByRole("link", { name: "Explorar la colección" }),
  ).toBeVisible();
});
