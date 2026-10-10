import type { Metadata } from "next";
import Image from "next/image";
import { getSite } from "@/lib/data";
export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Descubre la historia y el concepto de la tienda ficticia USA Sportswear.",
};
export default function About() {
  const s = getSite().story;
  return (
    <div className="container page-section">
      <div className="page-heading">
        <p className="section-kicker">Así imaginamos USA</p>
        <h1>{s.title}</h1>
        <p>{s.intro}</p>
      </div>
      <div className="wide-photo">
        <Image
          src="/images/movimiento.jpg"
          alt="Referencia de movimiento deportivo en la ciudad"
          fill
          sizes="100vw"
        />
      </div>
      <div className="story-grid">
        {s.sections.map((x) => (
          <section key={x.title}>
            <h2>{x.title}</h2>
            <p>{x.text}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
