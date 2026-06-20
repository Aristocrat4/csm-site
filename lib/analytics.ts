// Thin wrapper over gtag. gtag is only present after the visitor accepts
// cookies (see CookieConsent), so every call is a no-op until then.
import { site } from "./site";

type GtagWindow = Window & {
  gtag?: (...args: unknown[]) => void;
};

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  (window as GtagWindow).gtag?.("event", name, params);
}

/** Fires a GA4 event and, when configured, a Google Ads conversion. */
export function trackConversion(kind: "contact" | "booking") {
  trackEvent(kind === "contact" ? "generate_lead" : "schedule_call", { kind });

  if (
    site.adsConversionId &&
    site.adsConversionLabel &&
    typeof window !== "undefined"
  ) {
    (window as GtagWindow).gtag?.("event", "conversion", {
      send_to: `${site.adsConversionId}/${site.adsConversionLabel}`,
    });
  }
}
