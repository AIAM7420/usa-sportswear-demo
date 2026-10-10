import type { Metadata } from "next";
import Image from "next/image";
import { getSite } from "@/lib/data";
export const metadata: Metadata = {
  title: "Valores",
  description: "Comodidad, claridad y atención al detalle en USA Sportswear.",
};
export default function Values() {
  return (
    <div className="container page-section">
      <div className="page-heading">
        <p className="section-kicker">Lo que nos mueve</p>
        <h1>Actitud en cada detalle.</h1>
        <p>El estilo empieza por cómo hacemos las cosas.</p>
      </div>
      <div className="values-layout">
        <div className="values-photo">
          <Image
            src="/images/sudadera.jpg"
            alt="Textura de una sudadera gris con capucha"
            fill
            sizes="(max-width: 767px) 100vw, 45vw"
          />
        </div>
        <div>
          {getSite().values.map((v) => (
            <section className="value-row" key={v.title}>
              <h2>{v.title}</h2>
              <p>{v.text}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
