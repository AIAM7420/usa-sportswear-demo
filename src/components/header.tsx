"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X, Search } from "lucide-react";
import { useState } from "react";
import site from "@/data/site.json";
export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  return (
    <>
      <div className="announcement">
        Tu ritmo. Tu estilo.{" "}
        <span>Una experiencia de compra de demostración.</span>
      </div>
      <header className="header">
        <div className="header-inner">
          <Link
            className="wordmark"
            href="/"
            aria-label="USA Sportswear, inicio"
          >
            <span className="usa">
              USA
              <span className="brand-dot" />
            </span>
            <span className="sportswear">Sportswear</span>
          </Link>
          <nav className="desktop-nav" aria-label="Principal">
            {site.navigation.slice(1).map((n) => (
              <Link
                key={n.href}
                href={n.href}
                aria-current={path.startsWith(n.href) ? "page" : undefined}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <Link
              className="icon-button"
              href="/colecciones"
              aria-label="Buscar productos"
            >
              <Search size={21} />
            </Link>
            <Dialog.Root open={open} onOpenChange={setOpen}>
              <Dialog.Trigger asChild>
                <button
                  className="icon-button mobile-trigger"
                  aria-label="Abrir menú"
                >
                  <Menu />
                </button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="dialog-overlay" />
                <Dialog.Content className="drawer">
                  <Dialog.Title>USA Sportswear</Dialog.Title>
                  <Dialog.Description>
                    Encuentra tu siguiente movimiento.
                  </Dialog.Description>
                  <Dialog.Close asChild>
                    <button
                      className="icon-button drawer-close"
                      aria-label="Cerrar menú"
                    >
                      <X />
                    </button>
                  </Dialog.Close>
                  <nav aria-label="Navegación móvil">
                    {site.navigation.map((n) => (
                      <Link
                        key={n.href}
                        href={n.href}
                        onClick={() => setOpen(false)}
                      >
                        {n.label}
                      </Link>
                    ))}
                  </nav>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>
      </header>
    </>
  );
}
