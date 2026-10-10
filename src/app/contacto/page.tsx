import type { Metadata } from "next";
import Link from "next/link";
import { getSite } from "@/lib/data";
import { ContactAction } from "@/components/contact-action";
import { ContactLinks } from "@/components/contact-links";
export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Prepara tu consulta sobre prendas, tallas y colores del catálogo demo.",
};
export default function Contact() {
  const s = getSite();
  return (
    <div className="container page-section">
      <div className="page-heading">
        <p className="section-kicker">Estamos para ayudarte a elegir</p>
        <h1>Hablemos de tu estilo.</h1>
        <p>
          ¿Una talla, un color, una prenda? Empieza por lo que tienes en mente.
        </p>
      </div>
      <div className="contact-grid">
        <section>
          <h2>Una consulta más fácil.</h2>
          <p>
            Entra a una ficha, elige una talla y un color disponibles y prepara
            un mensaje con toda la información de la prenda.
          </p>
          <Link className="button" href="/colecciones">
            Explorar productos
          </Link>
          <h3>Información de la demo</h3>
          <p>
            No hay tienda física, venta ni inventario real. WhatsApp, correo y
            redes se habilitan al configurar los datos de un negocio.
          </p>
          <ContactLinks contact={s} />
        </section>
        <section className="contact-panel">
          <h2>Tu mensaje, listo.</h2>
          <ContactAction
            phone={s.phone}
            message="Hola, me gustaría conocer más sobre USA Sportswear y consultar las opciones de prendas, tallas y colores."
          />
        </section>
      </div>
    </div>
  );
}
