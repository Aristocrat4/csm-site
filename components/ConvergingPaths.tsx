"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The page's one signature device: two thin lines — Sales and Engineering —
 * flow in and merge into a single line at Customer Success. Draws on when
 * scrolled into view; renders fully drawn (static) under reduced-motion or
 * without JS, via the html.js + no-preference gate in globals.css.
 */
export function ConvergingPaths() {
  const ref = useRef<SVGSVGElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setDrawn(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setDrawn(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 680 240"
      role="img"
      aria-label="Two paths — Sales and Engineering — converging into one at Customer Success."
      className={`h-auto w-full max-w-2xl ${drawn ? "cp-drawn" : ""}`}
    >
      {/* Incoming lines */}
      <path
        className="cp-line"
        pathLength={1}
        d="M132 66 C 250 66, 285 120, 384 120"
        fill="none"
        stroke="var(--color-muted)"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <path
        className="cp-line"
        pathLength={1}
        d="M132 174 C 250 174, 285 120, 384 120"
        fill="none"
        stroke="var(--color-muted)"
        strokeWidth={2}
        strokeLinecap="round"
      />
      {/* Merged line */}
      <path
        className="cp-line"
        pathLength={1}
        style={{ transitionDelay: "0.35s" }}
        d="M384 120 L 588 120"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth={2.75}
        strokeLinecap="round"
      />

      {/* Start nodes */}
      <circle cx={132} cy={66} r={4} fill="var(--color-paper)" stroke="var(--color-muted)" strokeWidth={2} />
      <circle cx={132} cy={174} r={4} fill="var(--color-paper)" stroke="var(--color-muted)" strokeWidth={2} />

      {/* Destination node */}
      <g className="cp-node">
        <circle cx={588} cy={120} r={13} fill="var(--color-accent)" fillOpacity={0.15} />
        <circle cx={588} cy={120} r={6.5} fill="var(--color-accent)" />
      </g>

      {/* Labels */}
      <text x={20} y={62} fill="var(--color-muted)" fontSize={13} fontWeight={600} letterSpacing="0.12em">
        SALES
      </text>
      <text x={20} y={178} fill="var(--color-muted)" fontSize={13} fontWeight={600} letterSpacing="0.12em">
        ENGINEERING
      </text>
      <text
        className="cp-node"
        x={588}
        y={96}
        fill="var(--color-accent)"
        fontSize={13}
        fontWeight={700}
        letterSpacing="0.1em"
        textAnchor="middle"
      >
        CUSTOMER SUCCESS
      </text>
    </svg>
  );
}
