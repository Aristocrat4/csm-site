import type { Metadata } from "next";
import Link from "next/link";
import { Home } from "lucide-react";
import { btnPrimary, container } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div
      className={`${container} flex min-h-[60vh] flex-col items-center justify-center py-24 text-center`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        Error 404
      </p>
      <h1 className="mt-4 text-4xl sm:text-5xl">This page wandered off</h1>
      <p className="mt-4 max-w-md text-muted">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
        Let&rsquo;s get you back on track.
      </p>
      <Link href="/" className={`${btnPrimary} mt-8`}>
        <Home className="size-[1.05em]" aria-hidden="true" />
        Back to home
      </Link>
    </div>
  );
}
