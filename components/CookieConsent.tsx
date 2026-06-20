"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { site } from "@/lib/site";

const STORAGE_KEY = "cookie-consent";
type Consent = "accepted" | "declined";

// Any configured gtag id (GA4 G-… and/or Google Ads AW-…) enables tracking.
const tagIds = [site.gaId, site.adsConversionId].filter(Boolean);

/** Loads gtag (GA4 and/or Google Ads) — only mounted after consent. */
function Analytics() {
  return (
    <>
      <Script
        id="ga-src"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${tagIds[0]}`}
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          ${tagIds.map((id) => `gtag('config', '${id}');`).join("\n          ")}
        `}
      </Script>
    </>
  );
}

export function CookieConsent() {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "accepted" || stored === "declined") setConsent(stored);
    } catch {
      /* storage blocked — treat as undecided */
    }
    setReady(true);
  }, []);

  // No analytics/ads tag configured → nothing collected, no banner needed.
  if (tagIds.length === 0) return null;

  function choose(value: Consent) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setConsent(value);
  }

  return (
    <>
      {consent === "accepted" && <Analytics />}

      {ready && consent === null && (
        <div
          role="region"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-50 px-4 pt-4"
          style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
        >
          <div className="mx-auto flex max-w-[1080px] flex-col gap-4 rounded-2xl border border-border bg-surface p-5 shadow-lg sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">
              This site uses cookies only to measure traffic and ad performance.
              Nothing loads until you choose.{" "}
              <Link
                href="/privacy"
                className="text-accent underline underline-offset-2"
              >
                Privacy Policy
              </Link>
              .
            </p>
            <div className="flex shrink-0 gap-3">
              <button
                type="button"
                onClick={() => choose("declined")}
                className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => choose("accepted")}
                className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
