import Link from "next/link";
export default function NotFound() {
  return (
    <div className="container page-section empty-state">
      <h1>Cambiemos de rumbo.</h1>
      <p>No encontramos esta página o producto.</p>
      <Link href="/colecciones" className="button">
        Explorar la colección
      </Link>
    </div>
  );
}
