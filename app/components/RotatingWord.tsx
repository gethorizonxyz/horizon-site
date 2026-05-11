"use client";

import { useEffect, useState } from "react";

const WORDS = [
  "self-custody",
  "borderless",
  "agent-native",
  "multi-local",
] as const;

const HOLD_MS = 2400;
const TRANSITION_MS = 700;
const EASING = "cubic-bezier(0.32, 0.72, 0, 1)";

const GRADIENT =
  "bg-[linear-gradient(180deg,#ffffff_0%,#ffffff_45%,rgba(255,255,255,0.55)_100%)] bg-clip-text text-transparent";

/**
 * Drops the next word in from above. Each word has one of three states:
 *   - active:   centered, fully visible
 *   - exiting:  sliding down out the bottom, fading to 0 opacity
 *   - waiting:  parked above, opacity 0
 *
 * Opacity is the primary "this is hidden" signal — Chrome's compositing
 * pipeline can leak transform-animated children past `overflow:hidden`,
 * `mask-image`, and `clip-path` in some configurations, but opacity 0
 * still hides the leak. Opacity transitions faster (300 ms) than the
 * translate (700 ms) so leaked content is invisible by the time it would
 * be revealed.
 *
 * The box width is reserved by an invisible inline-grid that stacks every
 * word in row 1 / col 1 — so the box never resizes between words.
 */
export function RotatingWord() {
  const [active, setActive] = useState(0);
  const [exiting, setExiting] = useState<number | null>(null);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((curr) => {
        setExiting(curr);
        window.setTimeout(() => setExiting(null), TRANSITION_MS);
        return (curr + 1) % WORDS.length;
      });
    }, HOLD_MS);
    return () => window.clearInterval(id);
  }, []);

  // Defensive: if a stale (HMR-leftover) interval set `active` to an index
  // beyond the current WORDS length, wrap it back into range so we still
  // render a visible word instead of an empty slot.
  const activeIdx = ((active % WORDS.length) + WORDS.length) % WORDS.length;
  const exitingIdx =
    exiting === null ? null : ((exiting % WORDS.length) + WORDS.length) % WORDS.length;

  return (
    <>
      <span className="sr-only">{WORDS.join(", ")}</span>
      <span
        aria-hidden="true"
        className="relative mx-1 inline-block overflow-hidden rounded-2xl border border-white/25 bg-white/[0.06] px-[0.25em]"
        style={{
          height: "1.1em",
          lineHeight: 1,
          verticalAlign: "-0.22em",
        }}
      >
        {/* Inner wrapper carries the fade-mask so only the text content
            fades at the bottom — the outer span's border + bg stay solid. */}
        <span
          className="relative block h-full"
          style={{
            WebkitMaskImage:
              "linear-gradient(180deg, #000 0%, #000 78%, rgba(0,0,0,0) 100%)",
            maskImage:
              "linear-gradient(180deg, #000 0%, #000 78%, rgba(0,0,0,0) 100%)",
            isolation: "isolate",
          }}
        >
          {/* Sizer: stack every word invisibly so box width = max(word widths) */}
          <span
            className="invisible inline-grid h-full"
            aria-hidden="true"
          >
            {WORDS.map((w) => (
              <span
                key={w}
                className="col-start-1 row-start-1 flex h-full items-center whitespace-nowrap"
              >
                {w}
              </span>
            ))}
          </span>
          {WORDS.map((word, i) => {
            const isActive = i === activeIdx;
            const isExiting = i === exitingIdx;
            const y = isActive ? "0%" : isExiting ? "100%" : "-100%";
            const opacity = isActive ? 1 : 0;
            return (
              <span
                key={word}
                style={{
                  transform: `translateY(${y})`,
                  opacity,
                  transition: `transform ${TRANSITION_MS}ms ${EASING}, opacity 300ms ease-out`,
                }}
                className={`absolute inset-x-0 top-0 bottom-[0.12em] flex items-center justify-center whitespace-nowrap ${GRADIENT}`}
              >
                {word}
              </span>
            );
          })}
        </span>
      </span>
    </>
  );
}
