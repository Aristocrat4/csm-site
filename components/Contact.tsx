import { Mail, MapPin, Download } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Kicker } from "@/components/Kicker";
import { ContactForm } from "@/components/ContactForm";
import { CalendlyButton } from "@/components/CalendlyButton";
import { container, btnSecondary, btnGhost } from "@/lib/ui";
import { site, mailtoHref } from "@/lib/site";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 py-20 sm:py-28">
      <div className={container}>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Kicker>Contact</Kicker>
            <h2 className="mt-3 text-3xl sm:text-4xl">Let&rsquo;s talk</h2>
            <p className="mt-4 max-w-md text-lg text-muted">
              If you&rsquo;re hiring a Customer Success Manager who genuinely
              understands both your customers and your product, I&rsquo;d love to
              hear from you.
            </p>

            <div className="mt-8 rounded-2xl border border-border bg-surface p-6 shadow-card">
              <p className="text-sm font-medium text-ink">Prefer a quick chat?</p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <CalendlyButton label="Book a 15-min call" />
                <a href={mailtoHref} className={btnSecondary}>
                  <Mail className="size-[1.05em]" aria-hidden="true" />
                  Email me
                </a>
                <a href={site.cvPath} download className={btnGhost}>
                  <Download className="size-[1.05em]" aria-hidden="true" />
                  Download CV
                </a>
              </div>
              <p className="mt-5 flex items-center gap-2 text-sm text-muted">
                <MapPin className="size-4 shrink-0" aria-hidden="true" />
                {site.location} · Remote ({site.timezone})
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
