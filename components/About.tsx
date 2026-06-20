import { Reveal } from "@/components/Reveal";
import { container } from "@/lib/ui";

export function About() {
  return (
    <section id="about" className="scroll-mt-20 bg-ink py-20 text-paper sm:py-28">
      <div className={container}>
        <Reveal className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-light">
            Why Customer Success
          </p>
          <h2 className="mt-3 text-3xl text-paper sm:text-4xl">
            Why Customer Success&nbsp;— and why me
          </h2>

          <div className="mt-8 space-y-6 text-lg text-paper/75">
            <p>
              I didn&rsquo;t start in tech. I started in sales&nbsp;— as the only
              salesperson at a Tbilisi real-estate firm, where I closed at least
              one deal every single month for a year. That taught me the real
              work begins after &ldquo;yes&rdquo;: staying with people until
              they&rsquo;re genuinely happy.
            </p>
            <p>
              Then I moved into software engineering and spent years building the
              CRMs, dashboards, and internal platforms that businesses run
              on&nbsp;— the exact tools customer success and support teams live in
              every day.
            </p>
            <p>
              Customer Success is where those two halves meet. It rewards someone
              who can build real trust with customers{" "}
              <span className="text-paper">and</span> actually understand the
              product behind their problems. I&rsquo;m early in this chapter, and
              I&rsquo;m honest about that&nbsp;— but I&rsquo;d back myself on the
              two things that matter most:{" "}
              <span className="font-medium text-paper">
                I keep relationships, and I understand the technology.
              </span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
