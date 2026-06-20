// Central site configuration. Public-facing values + env-driven integrations.
// All integration values are optional: the UI degrades gracefully when unset
// so the site builds and runs before the owner provides keys/URLs.

function env(value: string | undefined): string {
  return (value ?? "").trim();
}

export const site = {
  /** Public display name — full name lives on the CV only (discretion). */
  name: "Gala D.",
  /** Full legal name — formal document (CV) only. */
  fullName: "Galaktioni Danelia",
  role: "Customer Success Manager",
  email: "galadanelia1@gmail.com",
  location: "Tbilisi, Georgia",
  timezone: "GMT+4",

  /** Canonical site URL — override with NEXT_PUBLIC_SITE_URL once the domain is attached. */
  url: env(process.env.NEXT_PUBLIC_SITE_URL) || "https://gala-d.vercel.app",

  /** Integrations (owner-provided; see .env.example). */
  calendlyUrl: env(process.env.NEXT_PUBLIC_CALENDLY_URL),
  web3formsKey: env(process.env.NEXT_PUBLIC_WEB3FORMS_KEY),
  videoId: env(process.env.NEXT_PUBLIC_VIDEO_ID),
  videoHost: (env(process.env.NEXT_PUBLIC_VIDEO_HOST) || "youtube") as
    | "youtube"
    | "vimeo",
  gaId: env(process.env.NEXT_PUBLIC_GA_ID),
  /** Google Ads: e.g. AW-XXXXXXXXXX and the conversion label after the slash. */
  adsConversionId: env(process.env.NEXT_PUBLIC_ADS_CONVERSION_ID),
  adsConversionLabel: env(process.env.NEXT_PUBLIC_ADS_CONVERSION_LABEL),

  cvPath: "/Gala-D-CSM-CV.pdf",
  ogImage: "/opengraph-image",
} as const;

export const nav = [
  { href: "#about", label: "About" },
  { href: "#strengths", label: "Strengths" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
] as const;

/** Keyword set woven into copy + structured data for ad relevance. */
export const keywords = [
  "Customer Success Manager",
  "Customer Success",
  "customer onboarding",
  "customer retention",
  "SaaS customer success",
  "account management",
  "client relationship management",
  "CRM",
] as const;

export const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent(
  "Customer Success Manager role",
)}`;
