import { Reveal } from "@/components/Reveal";
import { VideoFacade } from "@/components/VideoFacade";
import { Kicker } from "@/components/Kicker";
import { container } from "@/lib/ui";

export function VideoSection() {
  return (
    <section id="video" className="scroll-mt-20 py-16 sm:py-20">
      <div className={container}>
        <Reveal className="mx-auto max-w-2xl text-center">
          <Kicker>Meet me in 60 seconds</Kicker>
          <h2 className="mt-3 text-3xl sm:text-4xl">A quick hello</h2>
        </Reveal>
        <Reveal className="mx-auto mt-8 max-w-3xl">
          <VideoFacade />
          <p className="mt-3 text-center text-sm text-muted">
            A quick hello&nbsp;— who I am and why Customer Success.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
