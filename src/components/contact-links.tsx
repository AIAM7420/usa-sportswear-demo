import { safeUrl, whatsappLink } from "@/lib/contact";
type Contact = {
  phone: string | null;
  email: string | null;
  socials: { label: string; url: string }[];
};
export function ContactLinks({ contact }: { contact: Contact }) {
  const validPhone = whatsappLink(
    contact.phone,
    "Hola, me gustaría recibir información.",
  );
  const email =
    contact.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)
      ? contact.email
      : null;
  return (
    <div className="configured-links">
      {validPhone ? (
        <a className="text-link" href={`tel:${contact.phone}`}>
          Llamar al {contact.phone}
        </a>
      ) : null}
      {email ? (
        <a className="text-link" href={`mailto:${email}`}>
          {email}
        </a>
      ) : null}
      {contact.socials.map((s) =>
        safeUrl(s.url) ? (
          <a
            className="text-link"
            key={s.url}
            href={safeUrl(s.url)!}
            target="_blank"
            rel="noopener noreferrer"
          >
            {s.label}
          </a>
        ) : null,
      )}
    </div>
  );
}
