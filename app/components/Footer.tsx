"use client";

import { HorizonLogo } from "./HorizonLogo";

function triggerWaitlistPulse() {
  const startY = window.scrollY;
  if (startY < 5) {
    window.dispatchEvent(new CustomEvent("horizon:highlight-waitlist"));
    return;
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
  const delay = Math.max(350, Math.min(1500, startY * 0.4 + 250));
  window.setTimeout(() => {
    window.dispatchEvent(new CustomEvent("horizon:highlight-waitlist"));
  }, delay);
}

export function Footer() {
  return (
    <footer
      id="waitlist"
      className="relative overflow-hidden bg-white text-slate-900"
    >
<div className="relative mx-auto max-w-7xl px-6 pt-20 pb-8 sm:pt-24">
        {/* Big CTA card — sky photo lightly darkened, no color tint */}
        <div
          className="relative overflow-hidden rounded-3xl p-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_30px_60px_-20px_rgba(15,23,42,0.25)] sm:p-14 lg:p-16"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(31,59,214,0.16) 0%, rgba(58,94,240,0.10) 100%), url('/sky.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "multiply",
          }}
        >
          <h3 className="max-w-3xl text-4xl leading-[1.1] font-medium tracking-tight text-white [text-shadow:0_3px_8px_rgba(15,23,42,0.4)] sm:text-5xl md:text-6xl">
            Ready to take control of your business finances with Horizon?
          </h3>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={triggerWaitlistPulse}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-1px_0_rgba(255,255,255,0.06),0_4px_14px_rgba(0,0,0,0.35)] transition-colors hover:bg-slate-900"
            >
              Join waitlist
              <svg
                viewBox="0 0 16 16"
                width="14"
                height="14"
                aria-hidden="true"
              >
                <path
                  d="M3 8h9M8 3.5L12.5 8 8 12.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <a
              href="#product"
              className="inline-flex items-center gap-2 rounded-xl bg-white/95 px-5 py-3 text-sm font-medium text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_4px_14px_rgba(15,23,42,0.18)] transition-colors hover:bg-white"
            >
              Take a tour
            </a>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-white/15 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl"
          />
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-5 border-t border-slate-200 pt-8 md:flex-row md:items-center md:justify-between md:gap-4">
          <div className="flex items-center gap-2.5 text-sm text-slate-500">
            <HorizonLogo className="h-5 w-5 text-slate-700" />
            <span>© 2026 Horizon, Inc.</span>
          </div>
          {/* Legal links hidden until pages exist — re-enable when ready.
          <div className="flex flex-wrap gap-6 text-sm text-slate-500">
            <a href="#" className="transition-colors hover:text-slate-900">
              Terms of service
            </a>
            <a href="#" className="transition-colors hover:text-slate-900">
              Privacy policy
            </a>
            <a href="#" className="transition-colors hover:text-slate-900">
              Legal
            </a>
          </div>
          */}
        </div>
      </div>

      {/* Big wordmark — sits flush to the bottom edge, no whitespace below */}
      <div
        aria-hidden="true"
        className="mx-auto block max-w-7xl px-6 select-none"
      >
        <svg
          viewBox="0 0 1232 316"
          width="100%"
          preserveAspectRatio="xMidYMid meet"
          className="block"
          style={{ height: "auto", aspectRatio: "1232 / 316", display: "block" }}
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="sky-pattern"
              patternUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1232"
              height="316"
            >
              <image
                href="/sky.jpg"
                x="0"
                y="-200"
                width="1232"
                height="900"
                preserveAspectRatio="xMidYMid slice"
              />
            </pattern>
          </defs>
          <text
            x="0"
            y="316"
            fontSize="425"
            fontWeight="500"
            fontFamily='"Helvetica Now Display", "Helvetica Neue", Helvetica, Arial, sans-serif'
            letterSpacing="-0.05em"
            textLength="1232"
            lengthAdjust="spacing"
            fill="url(#sky-pattern)"
          >
            horizon
          </text>
        </svg>
      </div>
    </footer>
  );
}
