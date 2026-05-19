"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { HorizonLogo } from "./HorizonLogo";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "product", label: "Product" },
  { id: "pricing", label: "Pricing" },
  { id: "waitlist", label: "Waitlist" },
] as const;

type SectionId = (typeof NAV_ITEMS)[number]["id"];

export default function Navbar() {
  const [active, setActive] = useState<SectionId>("home");
  // Glass pill background appears as soon as you scroll a bit past the very top.
  const [scrolled, setScrolled] = useState(false);
  // Brand / logo / Login darken only when the hero is mostly behind us.
  const [pastHero, setPastHero] = useState(false);
  const linkRefs = useRef<Partial<Record<SectionId, HTMLAnchorElement | null>>>({});
  const [indicator, setIndicator] = useState({ x: 0, w: 0, ready: false });

  // Track active item geometry → drives the sliding white pill
  useLayoutEffect(() => {
    const el = linkRefs.current[active];
    if (!el) return;
    const update = () =>
      setIndicator({ x: el.offsetLeft, w: el.offsetWidth, ready: true });
    update();
    // Re-measure on viewport changes (font-loaded shifts widths slightly)
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [active]);

  useEffect(() => {
    const compute = () => {
      // The active section is whichever section's top has crossed ~35% of the viewport.
      const probe = window.scrollY + window.innerHeight * 0.35;
      let current: SectionId = "home";
      for (const { id } of NAV_ITEMS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= probe) current = id as SectionId;
      }
      setActive(current);
      setScrolled(window.scrollY > 20);

      const productEl = document.getElementById("product");
      const heroThreshold = productEl
        ? productEl.offsetTop - 120
        : window.innerHeight * 0.85;
      setPastHero(window.scrollY > heroThreshold);
    };
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: SectionId) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-50 px-6 pt-7">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between">
        {/* Brand */}
        <a
          href="#home"
          onClick={(e) => handleClick(e, "home")}
          className={`relative flex items-center gap-2.5 transition-colors ${
            pastHero ? "text-slate-900" : "text-white"
          }`}
        >
          {/* Glass backing — fades in on scroll, like the center pill */}
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute -inset-y-2 -inset-x-3 rounded-2xl border border-white/50 bg-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_8px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl backdrop-saturate-150 transition-opacity duration-300 ${
              scrolled ? "opacity-100" : "opacity-0"
            }`}
          />
          <HorizonLogo
            className={`relative h-11 w-11 transition-[filter] ${
              pastHero ? "" : "drop-shadow-[0_2px_6px_rgba(15,23,42,0.4)]"
            }`}
          />
          <span
            className={`relative text-xl font-semibold tracking-tight ${
              pastHero ? "" : "[text-shadow:0_2px_4px_rgba(15,23,42,0.35)]"
            }`}
          >
            Horizon
          </span>
        </a>

        {/* Center pill — content always visible; glass background fades in on scroll */}
        <nav
          aria-label="Primary"
          className="absolute left-1/2 hidden -translate-x-1/2 p-2 xl:block"
        >
          {/* Glass background layer — opacity transitions for a clean fade */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 rounded-2xl border border-white/50 bg-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_8px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl backdrop-saturate-150 transition-opacity duration-300 ${
              scrolled ? "opacity-100" : "opacity-0"
            }`}
          />
          <ul className="relative flex items-center">
            {/* Sliding white indicator with dot — text labels stay static, only this slides */}
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute inset-y-0 rounded-xl bg-gradient-to-b from-white to-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_1px_2px_rgba(15,23,42,0.06),0_2px_8px_rgba(15,23,42,0.05)] transition-[transform,width,opacity] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                indicator.ready ? "opacity-100" : "opacity-0"
              }`}
              style={{
                transform: `translateX(${indicator.x}px)`,
                width: `${indicator.w}px`,
              }}
            >
              <span className="absolute top-1/2 left-3 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-slate-900" />
            </span>

            {NAV_ITEMS.map(({ id, label }) => {
              const isActive = active === id;
              return (
                <li key={id}>
                  <a
                    ref={(el) => {
                      linkRefs.current[id] = el;
                    }}
                    href={`#${id}`}
                    onClick={(e) => handleClick(e, id)}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative z-10 flex items-center rounded-xl py-2.5 pr-4 pl-8 text-base font-normal tracking-tight transition-colors ${
                      isActive
                        ? "text-slate-900"
                        : scrolled
                          ? "text-slate-700 hover:text-slate-900"
                          : "text-white drop-shadow-sm hover:text-white"
                    }`}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-4">
          {/* Mobile: icon-only login (the text link is hidden < sm) */}
          <a
            href="https://dashboard.gethorizon.xyz/login"
            aria-label="Log in"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-xl transition-colors sm:hidden ${
              pastHero
                ? "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                : "text-white [filter:drop-shadow(0_2px_4px_rgba(15,23,42,0.35))] hover:opacity-80"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <path d="M10 17l5-5-5-5" />
              <path d="M15 12H3" />
            </svg>
          </a>
          <a
            href="https://dashboard.gethorizon.xyz/login"
            className={`hidden text-base font-medium transition-colors sm:inline ${
              pastHero
                ? "text-slate-700 hover:text-slate-900"
                : "text-white [text-shadow:0_2px_4px_rgba(15,23,42,0.35)] hover:opacity-80"
            }`}
          >
            Log In
          </a>
          <a
            href="https://calendly.com/business-cashly/horizon-access"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-base font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-1px_0_rgba(255,255,255,0.06),0_4px_14px_rgba(15,23,42,0.3)] transition-colors hover:bg-slate-800"
          >
            Book a demo
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
              <path
                d="M3 8h9M8 3.5L12.5 8 8 12.5"
                stroke="currentColor"
                strokeWidth="1.6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
