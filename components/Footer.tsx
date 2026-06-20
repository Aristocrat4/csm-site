import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-paper">
      <div className="mx-auto flex w-full max-w-[1080px] flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <Link
            href="/"
            className="rounded-sm font-serif text-lg font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
          >
            Gala&nbsp;D<span className="text-accent">.</span>
          </Link>
          <p className="mt-1 text-sm text-muted">
            <a
              href={`mailto:${site.email}`}
              className="underline-offset-4 hover:text-accent hover:underline"
            >
              {site.email}
            </a>
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm text-muted sm:items-end">
          <nav aria-label="Legal" className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="underline-offset-4 hover:text-accent hover:underline"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="underline-offset-4 hover:text-accent hover:underline"
            >
              Terms
            </Link>
          </nav>
          <p>© {year} {site.name}</p>
        </div>
      </div>
    </footer>
  );
}
