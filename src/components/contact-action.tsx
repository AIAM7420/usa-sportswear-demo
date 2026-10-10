"use client";
import { useState } from "react";
import { Copy, Check, MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/contact";
export function ContactAction({
  message,
  phone,
  disabled = false,
}: {
  message: string;
  phone: string | null;
  disabled?: boolean;
}) {
  const [status, setStatus] = useState("");
  const link = whatsappLink(phone, message);
  async function copy() {
    try {
      await navigator.clipboard.writeText(message);
      setStatus("Mensaje copiado.");
    } catch {
      setStatus("Selecciona y copia el mensaje del campo de texto.");
    }
  }
  return (
    <div className="contact-action">
      {link ? (
        <a
          className={`button ${disabled ? "is-disabled" : ""}`}
          href={disabled ? undefined : link}
          aria-disabled={disabled}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle size={18} /> Consultar por WhatsApp
        </a>
      ) : (
        <>
          <p className="muted">
            Demo: contacto pendiente de configuración. Puedes preparar tu
            consulta.
          </p>
          <label className="field">
            Tu mensaje
            <textarea
              readOnly
              value={message}
              rows={4}
              onFocus={(e) => e.currentTarget.select()}
            />
          </label>
          <button className="button" disabled={disabled} onClick={copy}>
            {status === "Mensaje copiado." ? (
              <Check size={18} />
            ) : (
              <Copy size={18} />
            )}{" "}
            Copiar consulta
          </button>
        </>
      )}
      <p role="status" className="status">
        {status}
      </p>
    </div>
  );
}
