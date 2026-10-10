import Link from "next/link";
import { getSite } from "@/lib/data";
export function Footer() {
  const s = getSite();
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link href="/" className="footer-brand">
            USA Sportswear<span>.</span>
          </Link>
          <p>
            La ciudad es tu cancha.
            <br />
            El ritmo lo pones tú.
          </p>
        </div>
        <nav aria-label="Pie de página">
          {s.navigation.slice(1).map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div>
          <p>Explora. Elige. Consulta.</p>
          <p>
            Demo comercial sin venta ni cobro.
            <br />
            Sin afiliación con las marcas mencionadas.
          </p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} USA Sportswear</span>
        <span>
          Precios, marcas asociadas al catálogo e inventario de demostración.
        </span>
      </div>
    </footer>
  );
}
