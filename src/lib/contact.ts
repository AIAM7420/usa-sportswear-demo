export function whatsappLink(
  phone: string | null,
  message: string,
): string | null {
  if (!phone || !/^\+?[1-9]\d{7,14}$/.test(phone)) return null;
  return `https://wa.me/${phone.replace("+", "")}?text=${encodeURIComponent(message)}`;
}
export function safeUrl(value: string | null): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}
export const money = (value: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(value);
