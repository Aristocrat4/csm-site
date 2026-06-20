import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { container } from "@/lib/ui";

export function LegalShell({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`${container} py-16 sm:py-20`}>
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-full text-sm text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back home
        </Link>
        <h1 className="mt-6 text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-muted">Last updated: {updated}</p>
        <div className="legal mt-8">{children}</div>
        <p className="mt-12 border-t border-border pt-6 text-sm text-muted">
          This page is provided for transparency and general information only —
          it is not legal advice.
        </p>
      </div>
    </div>
  );
}
