import { Reveal } from "@/components/Reveal";
import { Kicker } from "@/components/Kicker";
import { ConvergingPaths } from "@/components/ConvergingPaths";
import { container } from "@/lib/ui";

type Entry = {
  years: string;
  phase: string;
  org: string;
  body: string;
};

const entries: Entry[] = [
  {
    years: "2020–2021",
    phase: "Sales",
    org: "Real-estate sales · DK Investment, Tbilisi",
    body: "Sole salesperson; a closed deal every month for a year; daily client relationships from first contact to close.",
  },
  {
    years: "2021–2024",
    phase: "Engineering",
    org: "CRMs, dashboards & internal business platforms",
    body: "Built the tools customer teams rely on — working with stakeholders to ship what users actually needed.",
  },
  {
    years: "2025",
    phase: "Customer Success",
    org: "Where the two paths meet",
    body: "Bringing relationship skill and product fluency together — the focus of this next chapter.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 py-20 sm:py-28">
      <div className={container}>
        <Reveal className="max-w-2xl">
          <Kicker>Experience</Kicker>
          <h2 className="mt-3 text-3xl sm:text-4xl">The path that led here</h2>
        </Reveal>

        <ol className="mt-12 border-l border-border pl-8 sm:pl-10">
          {entries.map((e, i) => (
            <Reveal as="li" key={e.years} delay={i * 90} className="relative pb-12 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute -left-[2.6rem] top-1.5 grid size-5 place-items-center rounded-full border border-border bg-paper sm:-left-[3.1rem]"
              >
                <span
                  className={`size-2 rounded-full ${
                    i === entries.length - 1 ? "bg-accent" : "bg-muted"
                  }`}
                />
              </span>
              <p className="text-sm font-semibold tabular-nums tracking-wide text-accent">
                {e.years}
              </p>
              <h3 className="mt-1 text-xl font-semibold">{e.phase}</h3>
              <p className="mt-0.5 text-sm font-medium text-ink/70">{e.org}</p>
              <p className="mt-2 max-w-xl text-muted">{e.body}</p>
            </Reveal>
          ))}
        </ol>

        {/* Signature: the converging-paths visual. */}
        <Reveal className="mt-6 overflow-hidden rounded-2xl border border-border bg-accent-soft/60 px-6 py-12 sm:px-10">
          <div className="flex flex-col items-center">
            <ConvergingPaths />
            <p className="mt-8 max-w-md text-center text-muted">
              Two paths, one role. Customer Success is exactly where sales
              instinct and engineering fluency converge.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
