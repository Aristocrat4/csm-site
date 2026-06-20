"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { site } from "@/lib/site";

function embedSrc(id: string, host: "youtube" | "vimeo") {
  return host === "vimeo"
    ? `https://player.vimeo.com/video/${id}?autoplay=1&title=0&byline=0&portrait=0`
    : `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
}

function posterSrc(id: string, host: "youtube" | "vimeo") {
  // Only YouTube exposes a predictable thumbnail URL; Vimeo needs an API call,
  // so we fall back to the branded gradient poster there.
  return host === "youtube"
    ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
    : "";
}

export function VideoFacade() {
  const [playing, setPlaying] = useState(false);
  const { videoId: id, videoHost: host } = site;
  const poster = id ? posterSrc(id, host) : "";

  const frame =
    "relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-ink shadow-card";

  // No video yet → neutral branded placeholder.
  if (!id) {
    return (
      <>
        {host === "youtube" && (
          <link rel="preconnect" href="https://www.youtube-nocookie.com" />
        )}
        <div className={frame}>
          <div className="absolute inset-0 bg-gradient-to-br from-ink to-accent-hover" />
          <div className="absolute inset-0 grid place-items-center px-6 text-center">
            <div>
              <span
                aria-hidden="true"
                className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-white/10 ring-1 ring-white/20"
              >
                <Play className="size-6 translate-x-0.5 text-white" />
              </span>
              <p className="font-serif text-lg font-medium text-white">
                Intro video — coming soon
              </p>
              <p className="mt-1 text-sm text-white/70">
                A 60-second hello is on the way.
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (playing) {
    return (
      <div className={frame}>
        <iframe
          src={embedSrc(id, host)}
          title="Gala D. — 60-second introduction"
          className="absolute inset-0 size-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <>
      <link
        rel="preconnect"
        href={
          host === "vimeo"
            ? "https://player.vimeo.com"
            : "https://www.youtube-nocookie.com"
        }
      />
      <div className={frame}>
        {poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={poster}
            alt=""
            width={1280}
            height={720}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-ink to-accent-hover" />
        )}
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label="Play introduction video"
          className="group absolute inset-0 grid place-items-center bg-ink/25 transition-colors hover:bg-ink/15 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent focus-visible:ring-inset"
        >
          <span className="grid size-16 place-items-center rounded-full bg-white/95 shadow-lg ring-1 ring-black/5 transition-transform duration-200 group-hover:scale-105 group-active:scale-95">
            <Play
              className="size-7 translate-x-0.5 fill-accent text-accent"
              aria-hidden="true"
            />
          </span>
        </button>
      </div>
    </>
  );
}
