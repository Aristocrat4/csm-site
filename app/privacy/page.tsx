import type { Metadata } from "next";
import { LegalShell } from "@/components/LegalShell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How this site handles the contact form, cookies, and analytics.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy" updated="20 June 2026">
      <p>
        This website is a personal portfolio for {site.name}, a Customer Success
        professional. It is intentionally simple and collects as little
        information as possible. This policy explains what is collected, why, and
        the choices you have.
      </p>

      <h2>Information collected</h2>
      <ul>
        <li>
          <strong>Contact form.</strong> If you use the contact form, the name,
          email address, and message you provide are sent to me by email so I can
          reply. They are not used for anything else.
        </li>
        <li>
          <strong>Analytics (only with consent).</strong> If you accept cookies,
          Google Analytics 4 collects standard, aggregated usage data (such as
          pages viewed, approximate region, and device type) to help measure how
          the site performs.
        </li>
        <li>
          <strong>Advertising (only with consent).</strong> If you arrived via a
          Google Ads campaign and accept cookies, a Google Ads tag may record
          whether a visit led to a contact or a booking (a “conversion”).
        </li>
      </ul>

      <h2>Cookies</h2>
      <p>
        No analytics or advertising cookies are set until you accept them via the
        cookie banner. If you decline, those scripts are not loaded. You can
        change your mind at any time by clearing this site&rsquo;s cookies in your
        browser, which will show the banner again. Strictly functional storage
        needed to remember your choice may be used regardless.
      </p>

      <h2>How information is used</h2>
      <ul>
        <li>To respond to messages you send through the contact form.</li>
        <li>
          To understand, in aggregate, how visitors use the site and how ad
          campaigns perform — only where consent has been given.
        </li>
      </ul>

      <h2>Service providers</h2>
      <p>
        A small number of trusted third parties help run this site. Each
        processes data under its own privacy terms:
      </p>
      <ul>
        <li>
          <strong>Web3Forms</strong> — delivers contact-form submissions to my
          inbox.
        </li>
        <li>
          <strong>Calendly</strong> — used if you choose to book a call.
        </li>
        <li>
          <strong>Google</strong> (Analytics &amp; Ads) — measurement, with your
          consent.
        </li>
        <li>
          <strong>Vercel</strong> — hosting and delivery of the website.
        </li>
      </ul>

      <h2>Data retention</h2>
      <p>
        Contact messages are kept in my email only as long as needed to follow up
        with you, then deleted. Analytics data is retained according to
        Google&rsquo;s standard settings.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on where you live (including the UK and EU under UK&nbsp;GDPR /
        GDPR), you may have the right to access, correct, or delete your personal
        data, and to withdraw consent. To exercise any of these, email{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>International transfers</h2>
      <p>
        The providers above may process data outside your country, including in
        the United States. They maintain their own safeguards for such transfers.
      </p>

      <h2>Children</h2>
      <p>This site is not directed at children and does not knowingly collect their data.</p>

      <h2>Changes</h2>
      <p>
        This policy may be updated from time to time. The date above reflects the
        latest version.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Email{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalShell>
  );
}
