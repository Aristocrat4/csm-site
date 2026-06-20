"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/lib/site";
import { CalendlyButton } from "@/components/CalendlyButton";
import { btnPrimary } from "@/lib/ui";

const MENU_ID = "mobile-nav";

export function Header() {
  const [open, setOpen] = useState(false);

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-[1080px] items-center justify-between px-6 sm:px-8">
        <Link
          href="/"
          className="rounded-sm font-serif text-xl font-semibold tracking-tight text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        >
          Gala&nbsp;D<span className="text-accent">.</span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 md:flex"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={`/${item.href}`}
              className="rounded-full px-3 py-2 text-[0.95rem] text-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              {item.label}
            </Link>
          ))}
          <div className="ml-2">
            <CalendlyButton label="Book a call" />
          </div>
        </nav>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls={MENU_ID}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {open && (
        <nav
          id={MENU_ID}
          aria-label="Primary"
          className="overscroll-contain border-t border-border bg-paper px-6 pb-6 pt-2 md:hidden"
        >
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={`/${item.href}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-2 py-3 text-lg text-ink transition-colors hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3" onClick={() => setOpen(false)}>
            <CalendlyButton label="Book a call" className={`${btnPrimary} w-full`} />
          </div>
          <p className="mt-4 text-sm text-muted">
            Or email{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-accent underline underline-offset-4"
            >
              {site.email}
            </a>
          </p>
        </nav>
      )}
    </header>
  );
}
