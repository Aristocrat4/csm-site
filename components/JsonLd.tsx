import { site, keywords } from "@/lib/site";

/** ProfilePage + Person structured data. Visible name stays "Gala D." */
export function ProfileJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateModified: "2026-06-20",
    mainEntity: {
      "@type": "Person",
      name: site.name,
      jobTitle: site.role,
      email: `mailto:${site.email}`,
      url: site.url,
      knowsAbout: [...keywords],
      description:
        "Customer Success professional blending real sales results with hands-on SaaS/CRM engineering. Helping SaaS and tech companies onboard, retain, and grow their customers.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Tbilisi",
        addressCountry: "GE",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
