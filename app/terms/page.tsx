import type { Metadata } from "next";
import { LegalShell } from "@/components/LegalShell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms that apply to this personal portfolio website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalShell title="Terms of Use" updated="20 June 2026">
      <p>
        Welcome. This website is a personal portfolio for {site.name}. By using
        it, you agree to these straightforward terms.
      </p>

      <h2>Purpose</h2>
      <p>
        The site exists to introduce my background and experience and to make it
        easy to get in touch about Customer Success roles. The content is for
        general information.
      </p>

      <h2>Content &amp; accuracy</h2>
      <p>
        I aim to keep everything accurate and current, but the site is provided
        “as is,” without warranties of any kind. Details may change without
        notice.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The text, design, and graphics here are mine unless stated otherwise.
        Please don&rsquo;t reproduce them for commercial use without permission.
        You&rsquo;re welcome to view the site and contact me about opportunities.
      </p>

      <h2>External links &amp; services</h2>
      <p>
        The site links to third-party services (for example, a scheduling tool).
        I&rsquo;m not responsible for the content or practices of those services;
        their own terms apply.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the extent permitted by law, I am not liable for any loss arising from
        your use of, or inability to use, this website.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Email{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalShell>
  );
}
