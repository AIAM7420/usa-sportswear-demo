import { test, expect } from "@playwright/test";
import { whatsappLink, safeUrl } from "../src/lib/contact";
test("WhatsApp encodes message and rejects missing or invalid contact", () => {
  const message =
    "Hola, talla M, color negro & azul, $850 MXN. ¿Está disponible?";
  const link = whatsappLink("+525512345678", message);
  expect(link).not.toBeNull();
  expect(new URL(link!).searchParams.get("text")).toBe(message);
  expect(new URL(link!).pathname).toBe("/525512345678");
  for (const phone of [null, "", "abc", "123", "+00"])
    expect(whatsappLink(phone, message)).toBeNull();
  expect(safeUrl("javascript:alert(1)")).toBeNull();
  expect(safeUrl(null)).toBeNull();
  expect(safeUrl("https://example.com/reservar")).toBe(
    "https://example.com/reservar",
  );
});
