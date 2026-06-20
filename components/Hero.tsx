import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import { Play, Download } from "lucide-react";
import { CalendlyButton } from "@/components/CalendlyButton";
import { btnSecondary, btnGhost, container } from "@/lib/ui";
import { site } from "@/lib/site";

const trust = [
  "1.5 years in sales",
  "a closed deal every month for a year",
  "years building CRMs & SaaS platforms",
  "technical + people-first",
];

function Portrait() {
  const hasHeadshot = existsSync(join(process.cwd(), "public", "headshot.jpg"));

  return (
    <div className="relative mx-auto w-full max-w-[420px] lg:mx-0 lg:ml-auto">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-accent-soft shadow-card">
        {hasHeadshot ? (
          <Image
            src="/headshot.jpg"
            alt="Gala, smiling — Customer Success Manager"
            fill
            priority
            sizes="(max-width: 1024px) 80vw, 420px"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-accent-soft to-[#d8e6df]">
            <div className="text-center">
              <span className="font-serif text-7xl font-semibold text-accent">
                GD
              </span>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted">
                Headshot here
              </p>
            </div>
          </div>
        )}
      </div>
      {/* Quiet accent detail behind the portrait. */}
      <div
        aria-hidden="true"
        className="absolute -bottom-3 -right-3 -z-10 hidden size-24 rounded-2xl bg-accent/10 lg:block"
      />
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-14 pb-16 sm:pt-20 sm:pb-24">
      <div className={container}>
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              {site.role}
            </p>
            <h1 className="mt-4 text-[2.5rem] leading-[1.08] sm:text-5xl lg:text-[3.5rem]">
              Sales results, technical depth&nbsp;— ready for Customer Success.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted">
              I&rsquo;m Gala. For years I closed deals month after month, then
              built the SaaS and CRM tools customer teams rely on. Now I&rsquo;m
              bringing both to Customer Success&nbsp;— helping SaaS and tech
              companies turn new customers into loyal, long-term ones.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <CalendlyButton label="Book a 15-min call" />
              <a href="#video" className={btnSecondary}>
                <Play className="size-[1.05em]" aria-hidden="true" />
                Watch my 60-sec intro
              </a>
              <a href={site.cvPath} download className={btnGhost}>
                <Download className="size-[1.05em]" aria-hidden="true" />
                Download CV
              </a>
            </div>

            <ul className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
              {trust.map((item, i) => (
                <li key={item} className="flex items-center gap-3">
                  {i > 0 && (
                    <span aria-hidden="true" className="text-border">
                      ·
                    </span>
                  )}
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <Portrait />
        </div>
      </div>
    </section>
  );
}
