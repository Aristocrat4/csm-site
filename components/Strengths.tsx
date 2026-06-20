import { Handshake, Code2, Waypoints, Gauge, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Kicker } from "@/components/Kicker";
import { container } from "@/lib/ui";

type Strength = {
  icon: LucideIcon;
  title: string;
  body: React.ReactNode;
};

const strengths: Strength[] = [
  {
    icon: Handshake,
    title: "Relationship-driven",
    body: (
      <>
        Sales taught me to earn trust and keep it. I don&rsquo;t just
        close&nbsp;— I follow through until customers are actually happy.
      </>
    ),
  },
  {
    icon: Code2,
    title: "Technically fluent",
    body: (
      <>
        I built the CRM and SaaS tools support teams use. When your product
        breaks, I can understand why and explain it in plain language.
      </>
    ),
  },
  {
    icon: Waypoints,
    title: "A bridge to product",
    body: (
      <>
        Sitting between customers and engineering is natural for me&nbsp;— I
        speak both languages and translate cleanly.
      </>
    ),
  },
  {
    icon: Gauge,
    title: "Reliable, fast-learning",
    body: (
      <>
        Consistency was my edge in sales (a deal every month). I bring the same
        to learning your product and your customers.
      </>
    ),
  },
];

export function Strengths() {
  return (
    <section id="strengths" className="scroll-mt-20 py-20 sm:py-28">
      <div className={container}>
        <Reveal className="max-w-2xl">
          <Kicker>What I bring</Kicker>
          <h2 className="mt-3 text-3xl sm:text-4xl">
            Strengths that carry into Customer Success
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2">
          {strengths.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal as="li" key={s.title} delay={i * 80}>
                <div className="h-full rounded-2xl border border-border bg-surface p-7 shadow-card transition-colors hover:border-accent/40">
                  <span className="grid size-11 place-items-center rounded-xl bg-accent-soft text-accent">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-muted">{s.body}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
