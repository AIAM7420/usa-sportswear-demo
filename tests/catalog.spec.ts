import { test, expect } from "@playwright/test";
test("combinable filters, URL, reload, history, price sort and empty state", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/colecciones");
  await expect(page.getByRole("status")).toContainText("16 productos");
  await page
    .getByRole("textbox", { name: "Buscar por nombre o marca" })
    .fill("Nike");
  await expect(page.getByRole("status")).toContainText("4 productos");
  await expect(page).toHaveURL(/q=Nike/);
  await page.getByRole("checkbox", { name: "Playeras", exact: true }).check();
  await expect(page.getByRole("status")).toContainText("1 producto");
  await page.reload();
  await expect(
    page.getByRole("checkbox", { name: "Playeras", exact: true }),
  ).toBeChecked();
  await page.getByRole("checkbox", { name: "XL", exact: true }).check();
  await expect(
    page.getByRole("heading", { name: "No encontramos esa combinación." }),
  ).toBeVisible();
  await page.goBack();
  await expect(page.getByRole("status")).toContainText("1 producto");
  await page
    .getByRole("button", { name: "Limpiar filtros", exact: true })
    .last()
    .click();
  await expect(page.getByRole("status")).toContainText("16 productos");
  await expect(
    page.getByRole("textbox", { name: "Buscar por nombre o marca" }),
  ).toHaveValue("");
  await page
    .getByRole("combobox", { name: "Ordenar por" })
    .selectOption("price-asc");
  const prices = await page.locator(".product-heading>span").allTextContents();
  expect(prices[0]).toBe("$650");
  await page.getByRole("checkbox", { name: "Nike", exact: true }).check();
  await page.getByRole("checkbox", { name: "Adidas", exact: true }).check();
  await expect(page.getByRole("status")).toContainText("8 productos");
  await page
    .getByRole("spinbutton", { name: "Desde", exact: true })
    .fill("1200");
  await page
    .getByRole("spinbutton", { name: "Hasta", exact: true })
    .fill("1400");
  await expect(page.getByRole("status")).toContainText("2 productos");
});
test("mobile drawer is accessible and applies filters", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/colecciones");
  await page.getByRole("button", { name: "Filtros", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await dialog.getByRole("checkbox", { name: "Puma", exact: true }).check();
  await dialog.evaluate(el => { el.scrollTop = 0; });
  await page.screenshot({
    path: "reports/screenshots/filters-390.png",
    fullPage: false,
  });
  await dialog.getByRole("button", { name: "Ver 4 productos" }).click();
  await expect(dialog).not.toBeVisible();
  await expect(page.getByRole("status")).toContainText("4 productos");
});
test("gallery, variants, query message and sold out product", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/colecciones/nike-playeras-demo");
  await expect(
    page.getByRole("button", { name: "XL", exact: true }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "M", exact: true }).click();
  await page.getByRole("button", { name: "Marino", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "L", exact: true }),
  ).toBeDisabled();
  await expect(page.getByRole("textbox", { name: "Tu mensaje" })).toContainText(
    "talla M, color marino",
  );
  await page.getByRole("button", { name: "Imagen siguiente" }).click();
  await expect(page.getByText("Acercamiento · 2 / 2")).toBeVisible();
  await page.getByRole("region", { name: "Galería del producto" }).focus();
  await page.keyboard.press("ArrowLeft");
  await expect(page.getByText("Vista general · 1 / 2")).toBeVisible();
  await page.getByRole("button", { name: "Copiar consulta" }).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    "Nike",
  );
  await page.goto("/colecciones/under-armour-chamarras-demo");
  await expect(
    page.getByRole("button", { name: "Copiar consulta" }),
  ).toBeDisabled();
  await expect(
    page.getByText("Sin disponibilidad en esta combinación"),
  ).toBeVisible();
});
