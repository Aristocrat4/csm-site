// Shared button/link styles. Centralized so focus, hover, and touch behavior
// stay consistent and Web-Interface-Guidelines-compliant everywhere.

export const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 " +
  "text-[0.95rem] font-medium leading-none whitespace-nowrap " +
  "transition-[background-color,border-color,color,box-shadow] duration-200 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-paper " +
  "disabled:cursor-not-allowed disabled:opacity-60";

export const btnPrimary =
  `${btnBase} bg-accent text-white shadow-sm hover:bg-accent-hover active:bg-accent-hover`;

export const btnSecondary =
  `${btnBase} border border-border bg-surface text-ink hover:border-accent hover:text-accent`;

export const btnGhost = `${btnBase} text-ink hover:bg-accent-soft`;

// Inverse variants for use on the dark (ink) band.
export const btnOnDark =
  `${btnBase} bg-paper text-ink hover:bg-white focus-visible:ring-offset-ink`;

/** Standard page container. */
export const container = "mx-auto w-full max-w-[1080px] px-6 sm:px-8";
