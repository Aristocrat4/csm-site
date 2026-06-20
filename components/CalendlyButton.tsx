"use client";

import { CalendarClock } from "lucide-react";
import { site } from "@/lib/site";
import { btnPrimary } from "@/lib/ui";
import { trackConversion } from "@/lib/analytics";

type Props = {
  label?: string;
  className?: string;
  showIcon?: boolean;
};

/**
 * Books a call via Calendly. Falls back to scrolling to the contact form
 * (with its email + form) when no Calendly URL is configured yet, so the
 * CTA always does something useful.
 */
export function CalendlyButton({
  label = "Book a call",
  className = btnPrimary,
  showIcon = true,
}: Props) {
  const url = site.calendlyUrl;
  const external = Boolean(url);
  const href = external ? url : "#contact";

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={className}
      data-cta="book-call"
      onClick={() => {
        if (external) trackConversion("booking");
      }}
    >
      {showIcon && <CalendarClock className="size-[1.05em]" aria-hidden="true" />}
      {label}
    </a>
  );
}
