import { HorizonLogo } from "./HorizonLogo";
import { TiltCard } from "./TiltCard";

const GLASS =
  "relative flex flex-col overflow-hidden rounded-3xl bg-white/30 p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_8px_30px_rgba(31,59,214,0.08)] ring-1 ring-white/55 backdrop-blur-2xl backdrop-saturate-150 transition-[background-color] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:bg-white/45";

const PANEL =
  "rounded-2xl bg-white shadow-[0_28px_56px_-16px_rgba(15,23,42,0.35),0_8px_20px_-6px_rgba(15,23,42,0.18)] ring-1 ring-slate-200/70";

const PANEL_DARK =
  "rounded-2xl bg-slate-800/95 shadow-[0_28px_56px_-16px_rgba(0,0,0,0.55),0_8px_20px_-6px_rgba(0,0,0,0.35)] ring-1 ring-white/10";

type FlagId = "us" | "eu" | "gb" | "ng" | "usdc" | "eurc";

type Account = {
  flagId: FlagId;
  currency: string;
  rail: string;
  number: string;
};

const ACCOUNTS: Account[] = [
  {
    flagId: "us",
    currency: "USD",
    rail: "ACH · Wire",
    number: "0123 4567 8901",
  },
  {
    flagId: "eu",
    currency: "EUR",
    rail: "SEPA IBAN",
    number: "DE89 ···· 0130",
  },
  {
    flagId: "gb",
    currency: "GBP",
    rail: "Sort Code",
    number: "12-34-56 · 0011",
  },
  {
    flagId: "ng",
    currency: "NGN",
    rail: "NUBAN",
    number: "0123 4567 89",
  },
];

const FLAG_SVGS: Record<FlagId, React.ReactElement> = {
  us: (
    <svg
      viewBox="0 0 30 20"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <rect width="30" height="20" fill="white" />
      {[0, 3.08, 6.15, 9.23, 12.31, 15.38].map((y, i) => (
        <rect key={i} y={y} width="30" height="1.54" fill="#B22234" />
      ))}
      <rect width="12" height="10.77" fill="#3C3B6E" />
      <g fill="white">
        {[2, 4, 6, 8, 10].flatMap((x) =>
          [1.5, 3.5, 5.5, 7.5, 9.5].map((y) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="0.5" />
          )),
        )}
      </g>
    </svg>
  ),
  eu: (
    <svg
      viewBox="0 0 30 20"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <rect width="30" height="20" fill="#003399" />
      <g fill="#FFCC00">
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
          const cx = 15 + Math.cos(a) * 6;
          const cy = 10 + Math.sin(a) * 4.5;
          return <circle key={i} cx={cx} cy={cy} r="0.8" />;
        })}
      </g>
    </svg>
  ),
  gb: (
    <svg
      viewBox="0 0 30 20"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <rect width="30" height="20" fill="#012169" />
      <path
        d="M0,0 L30,20 M30,0 L0,20"
        stroke="white"
        strokeWidth="3.5"
      />
      <path
        d="M0,0 L30,20 M30,0 L0,20"
        stroke="#C8102E"
        strokeWidth="1.4"
      />
      <path d="M15,0 V20 M0,10 H30" stroke="white" strokeWidth="5" />
      <path d="M15,0 V20 M0,10 H30" stroke="#C8102E" strokeWidth="2.5" />
    </svg>
  ),
  ng: (
    <svg
      viewBox="0 0 30 20"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <rect width="10" height="20" fill="#008751" />
      <rect x="10" width="10" height="20" fill="white" />
      <rect x="20" width="10" height="20" fill="#008751" />
    </svg>
  ),
  usdc: (
    <svg viewBox="0 0 24 24" className="h-full w-full" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#2775CA" />
      <circle cx="12" cy="12" r="9.5" fill="none" stroke="white" strokeWidth="0.8" />
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        fill="white"
        fontFamily="Helvetica, Arial, sans-serif"
      >
        $
      </text>
    </svg>
  ),
  eurc: (
    <svg viewBox="0 0 24 24" className="h-full w-full" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#1F3BD6" />
      <circle cx="12" cy="12" r="9.5" fill="none" stroke="white" strokeWidth="0.8" />
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        fill="white"
        fontFamily="Helvetica, Arial, sans-serif"
      >
        €
      </text>
    </svg>
  ),
};

function Flag({ id }: { id: FlagId }) {
  return (
    <span className="inline-block h-5 w-5 shrink-0 overflow-hidden rounded-full ring-1 ring-slate-200/60 bg-white">
      {FLAG_SVGS[id]}
    </span>
  );
}

// Orthographic dot pattern for the Payments globe.
// Generated once at module level — uniform lat/lon grid projected onto a
// sphere, back hemisphere culled, opacity & radius scale with depth so the
// sphere reads as round.
const GLOBE_DOTS: Array<{ x: number; y: number; r: number; o: number }> = (() => {
  const R = 90;
  const CX = 165;
  const CY = 165;
  const VIEW_LAT = 18; // tilt forward a touch
  const VIEW_LON = -25; // rotate to show Atlantic-Europe-Africa
  const out: Array<{ x: number; y: number; r: number; o: number }> = [];
  const latStep = 5;
  for (let lat = -85; lat <= 85; lat += latStep) {
    // Adjust longitude step so dot density is roughly uniform across the sphere
    const lonStep = Math.max(5, Math.round(5 / Math.max(0.18, Math.cos((lat * Math.PI) / 180))));
    for (let lon = -180; lon < 180; lon += lonStep) {
      const phi = (lat * Math.PI) / 180;
      const theta = ((lon - VIEW_LON) * Math.PI) / 180;
      const x0 = Math.cos(phi) * Math.sin(theta);
      const y0 = Math.sin(phi);
      const z0 = Math.cos(phi) * Math.cos(theta);
      const v = (VIEW_LAT * Math.PI) / 180;
      const y1 = y0 * Math.cos(v) - z0 * Math.sin(v);
      const z1 = y0 * Math.sin(v) + z0 * Math.cos(v);
      if (z1 < 0.05) continue;
      out.push({
        x: CX + x0 * R,
        y: CY - y1 * R,
        r: 0.65 + z1 * 0.7,
        o: 0.2 + z1 * 0.55,
      });
    }
  }
  return out;
})();

const CHAIN_ICONS = {
  tron: (
    <svg viewBox="0 0 32 32" className="h-full w-full" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#EF0027" />
      <path
        d="M7.5 10.5 L24 13.5 L18.5 23.5 Z"
        fill="none"
        stroke="white"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 10.5 L18.5 23.5"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M24 13.5 L18.5 23.5"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="7.5" cy="10.5" r="1.2" fill="white" />
      <circle cx="24" cy="13.5" r="1.2" fill="white" />
      <circle cx="18.5" cy="23.5" r="1.2" fill="white" />
    </svg>
  ),
  eth: (
    <svg viewBox="0 0 32 32" className="h-full w-full" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#627EEA" />
      <g transform="translate(8 5)">
        <path d="M8 0 L0 13 L8 17 Z" fill="white" fillOpacity="0.6" />
        <path d="M8 0 L16 13 L8 17 Z" fill="white" />
        <path d="M8 18 L0 14 L8 24 Z" fill="white" fillOpacity="0.6" />
        <path d="M8 18 L16 14 L8 24 Z" fill="white" />
        <path d="M8 8 L16 13 L8 17 Z" fill="white" fillOpacity="0.25" />
        <path d="M0 13 L8 17 L8 8 Z" fill="white" fillOpacity="0.55" />
      </g>
    </svg>
  ),
  sol: (
    <svg viewBox="0 0 32 32" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="sol-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9945FF" />
          <stop offset="0.45" stopColor="#03E1FF" />
          <stop offset="0.9" stopColor="#14F195" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="16" fill="#0F172A" />
      <g transform="translate(6 8)">
        <path d="M0 2 L3 0 H20 L17 2 Z" fill="url(#sol-grad)" />
        <path d="M0 9 L3 7 H20 L17 9 Z" fill="url(#sol-grad)" />
        <path d="M0 16 L3 14 H20 L17 16 Z" fill="url(#sol-grad)" />
      </g>
    </svg>
  ),
  base: (
    <svg viewBox="0 0 32 32" className="h-full w-full" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#0052FF" />
      <path
        d="M16 7 a9 9 0 1 1 -8.94 10 H16 V7 Z"
        fill="white"
      />
    </svg>
  ),
} as const;

export function ProductSection() {
  return (
    <section
      id="product"
      className="relative z-[5] overflow-hidden rounded-b-[2rem] bg-[#eef2f8] px-6 py-24 shadow-[0_24px_40px_-16px_rgba(15,23,42,0.14),0_8px_16px_-6px_rgba(15,23,42,0.06)] sm:py-32"
    >
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-5xl font-medium tracking-[-0.03em] text-slate-900 sm:text-6xl md:text-7xl">
            Everything you need to run finance.
          </h2>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-4 md:auto-rows-[340px] md:grid-cols-12">
          {/* Row 1 — Accounts (col-6, cobalt-pale) — receive into local rails, balance settles in USDC */}
          <TiltCard className="relative flex flex-col overflow-hidden rounded-3xl bg-cobalt-pale p-10 shadow-sm md:flex-row md:col-span-6">
            <div className="relative z-10 md:max-w-[42%]">
              <h3 className="text-5xl font-medium tracking-[-0.025em] text-slate-900">
                Accounts
              </h3>
              <p className="mt-3 text-xl font-medium tracking-tight text-slate-900">
                One balance.
              </p>
              <p className="mt-0.5 text-xl font-medium tracking-tight text-slate-500">
                Every currency.
              </p>
            </div>
            {/* More currencies (not shown on the dashboard) — clean list at
                bottom-left of the card on desktop; flows after the title on
                mobile. */}
            <div className="z-10 mt-6 md:absolute md:bottom-7 md:left-10 md:mt-0 md:max-w-[32%]">
              <div className="text-[10px] font-semibold tracking-[0.16em] text-slate-400 uppercase">
                Also supported
              </div>
              <div className="mt-2 text-sm leading-relaxed font-medium text-slate-500">
                JPY · CAD · AUD · CHF{" "}
                <span className="text-slate-400">& more</span>
              </div>
            </div>
            <div
              className="pointer-events-none absolute right-[-5rem] bottom-[-2rem] w-[26rem] origin-bottom-right scale-[0.6] md:scale-100"
              style={{
                transform:
                  "perspective(900px) rotateY(-14deg) rotateX(8deg) rotate(-2deg)",
                transformStyle: "preserve-3d",
              }}
            >
              <div className={PANEL}>
                {/* Header — balance with cents */}
                <div className="border-b border-slate-100 px-4 py-3.5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[10px] font-medium text-slate-400">
                        Available balance
                      </div>
                      <div className="mt-0.5 flex items-baseline tracking-tight text-slate-900">
                        <span className="text-2xl font-medium">$2,847,500</span>
                        <span className="text-base font-medium text-slate-400">
                          .42
                        </span>
                      </div>
                    </div>
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-cobalt-pale">
                      <span className="h-1.5 w-1.5 rounded-full bg-cobalt" />
                    </span>
                  </div>
                  {/* Send / Receive buttons */}
                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-slate-900 py-2 text-[11px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
                    >
                      <svg
                        viewBox="0 0 14 14"
                        className="h-3 w-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M3 11 L11 3 M11 3 L11 9 M11 3 L5 3" />
                      </svg>
                      Send
                    </button>
                    <button
                      type="button"
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-slate-100 py-2 text-[11px] font-medium text-slate-900 ring-1 ring-slate-200"
                    >
                      <svg
                        viewBox="0 0 14 14"
                        className="h-3 w-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M11 3 L3 11 M3 11 L3 5 M3 11 L9 11" />
                      </svg>
                      Receive
                    </button>
                  </div>
                </div>
                {/* Account rows — just rails to receive in */}
                <div className="px-4 pt-3 pb-1">
                  <div className="mb-2 flex items-center justify-between text-[9px] font-medium tracking-wide text-slate-400 uppercase">
                    <span>Receive into</span>
                    <span className="text-slate-300">Auto-converts to USDC</span>
                  </div>
                  <div className="space-y-2.5 text-[11px]">
                    {ACCOUNTS.map((acc) => (
                      <div
                        key={acc.currency}
                        className="flex items-center gap-2.5"
                      >
                        <Flag id={acc.flagId} />
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-semibold text-slate-900">
                            {acc.currency}
                          </span>
                          <span className="text-[9px] font-medium tracking-wide text-slate-400">
                            {acc.rail}
                          </span>
                        </div>
                        <span className="ml-auto font-mono text-[10px] text-slate-500">
                          {acc.number}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Footer — more rails coming */}
                <div className="mt-2 flex items-center justify-between border-t border-slate-100 px-4 py-2.5 text-[10px]">
                  <span className="text-slate-500">
                    + 6 more rails coming
                  </span>
                  <span className="font-medium text-cobalt-deep">
                    Open account →
                  </span>
                </div>
              </div>
            </div>
          </TiltCard>

          {/* Row 1 — Payments (col-6, glass) — fiat + chains */}
          <TiltCard className={`${GLASS} md:col-span-6`}>
            <div className="relative z-10">
              <h3 className="text-5xl font-medium tracking-[-0.025em] text-slate-900">
                Payments
              </h3>
              <p className="mt-3 text-xl font-medium tracking-tight text-slate-900">
                Any rail.
              </p>
              <p className="mt-0.5 text-xl font-medium tracking-tight text-slate-500">
                Any chain.
              </p>
            </div>
            {/* More rails (not shown on the globe) — clean list at
                bottom-left of the card on desktop; flows after the title on
                mobile. */}
            <div className="z-10 mt-6 md:absolute md:bottom-7 md:left-8 md:mt-0 md:max-w-[36%]">
              <div className="text-[10px] font-semibold tracking-[0.16em] text-slate-400 uppercase">
                Also supported
              </div>
              <div className="mt-2 text-sm leading-relaxed font-medium text-slate-500">
                US ACH, EU IBAN{" "}
                <span className="text-slate-400">& more</span>
              </div>
            </div>
            <div
              className="pointer-events-none absolute right-[-6rem] bottom-[-2rem] w-[39rem] origin-bottom-right scale-[0.4] md:right-[-14rem] md:bottom-[-14rem] md:scale-100"
              style={{
                transform:
                  "perspective(900px) rotateY(-8deg) rotateX(5deg) rotate(1deg)",
                transformStyle: "preserve-3d",
              }}
            >
              <div className="relative w-full">
                <svg
                  viewBox="0 0 330 330"
                  className="w-full"
                  aria-hidden="true"
                >
                  <defs>
                    <radialGradient
                      id="globe-sphere"
                      cx="0.4"
                      cy="0.35"
                      r="0.8"
                    >
                      <stop offset="0" stopColor="#1E293B" />
                      <stop offset="0.55" stopColor="#0F172A" />
                      <stop offset="1" stopColor="#020617" />
                    </radialGradient>
                    <radialGradient
                      id="globe-glow"
                      cx="0.5"
                      cy="0.5"
                      r="0.55"
                    >
                      <stop offset="0" stopColor="#3A5EF0" stopOpacity="0.35" />
                      <stop offset="1" stopColor="#3A5EF0" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient
                      id="globe-rim"
                      cx="0.5"
                      cy="0.5"
                      r="0.5"
                    >
                      <stop offset="0.85" stopColor="white" stopOpacity="0" />
                      <stop offset="0.97" stopColor="#A8B8F5" stopOpacity="0.4" />
                      <stop offset="1" stopColor="#A8B8F5" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Sphere base */}
                  <circle cx="165" cy="165" r="90" fill="url(#globe-sphere)" />
                  {/* Subtle highlight */}
                  <ellipse
                    cx="138"
                    cy="138"
                    rx="36"
                    ry="22"
                    fill="white"
                    fillOpacity="0.04"
                  />

                  {/* World dot pattern */}
                  <g fill="#A8B8F5">
                    {GLOBE_DOTS.map((d, i) => (
                      <circle
                        key={i}
                        cx={d.x}
                        cy={d.y}
                        r={d.r}
                        fillOpacity={d.o}
                      />
                    ))}
                  </g>

                  {/* Rim highlight */}
                  <circle cx="165" cy="165" r="90" fill="url(#globe-rim)" />

                  {/* Hub pulse markers — one per currency, spread evenly
                      around the visible sphere. Labels are positioned next
                      to each hub but live in HTML (below). */}
                  {[
                    { x: 165, y: 88 }, // EUR hub  (top)
                    { x: 108, y: 112 }, // USD hub  (top-left)
                    { x: 195, y: 105 }, // USDC hub
                    { x: 86, y: 168 }, // GBP hub  (left)
                    { x: 195, y: 165 }, // EURC hub
                    { x: 155, y: 188 }, // NGN hub  (lower)
                  ].map((p, i) => (
                    <g key={i}>
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r="9"
                        fill="#5572F4"
                        opacity="0.25"
                      />
                      <circle cx={p.x} cy={p.y} r="3.4" fill="white" />
                      <circle cx={p.x} cy={p.y} r="1.4" fill="#1F3BD6" />
                    </g>
                  ))}

                  {/* Transaction arcs — 3 distinct pair-arcs. Each hub
                      is in exactly one pair, so arcs read as connections
                      between two points (never chained). The diagonals
                      cross each other near the globe center. */}
                  {[
                    { from: { x: 108, y: 112 }, to: { x: 195, y: 165 }, lift: -18 }, // USD ↔ EURC (diagonal)
                    { from: { x: 195, y: 105 }, to: { x: 86, y: 168 }, lift: -18 },  // USDC ↔ GBP (counter-diagonal)
                    { from: { x: 165, y: 88 }, to: { x: 155, y: 188 }, lift: 22 },   // EUR ↔ NGN (near-vertical)
                  ].map((r, i) => {
                    const cx = 165;
                    const cy = 165;
                    const mid = {
                      x: (r.from.x + r.to.x) / 2,
                      y: (r.from.y + r.to.y) / 2,
                    };
                    const dx = mid.x - cx;
                    const dy = mid.y - cy;
                    const dist = Math.max(0.001, Math.sqrt(dx * dx + dy * dy));
                    const cp = {
                      x: mid.x + (dx / dist) * r.lift,
                      y: mid.y + (dy / dist) * r.lift,
                    };
                    const path = `M ${r.from.x} ${r.from.y} Q ${cp.x} ${cp.y} ${r.to.x} ${r.to.y}`;
                    const gradId = `arc-grad-${i}`;
                    return (
                      <g key={`arc-${i}`}>
                        <defs>
                          <linearGradient
                            id={gradId}
                            gradientUnits="userSpaceOnUse"
                            x1={r.from.x}
                            y1={r.from.y}
                            x2={r.to.x}
                            y2={r.to.y}
                          >
                            <stop offset="0" stopColor="white" stopOpacity="0.95" />
                            <stop offset="0.5" stopColor="#A8B8F5" stopOpacity="0.85" />
                            <stop offset="1" stopColor="white" stopOpacity="0.95" />
                          </linearGradient>
                        </defs>
                        {/* Glow underlay */}
                        <path
                          d={path}
                          fill="none"
                          stroke="#5572F4"
                          strokeOpacity="0.30"
                          strokeWidth="3.8"
                          strokeLinecap="round"
                        />
                        {/* Main line */}
                        <path
                          d={path}
                          fill="none"
                          stroke={`url(#${gradId})`}
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* Label badges hugging the sphere edge — each just
                    outside its hub so the currencies sit right at the
                    globe rather than floating away from it. */}
                {/* EUR · IBAN — just above top hub */}
                <div
                  className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full bg-white px-2 py-1 shadow-[0_8px_20px_-6px_rgba(15,23,42,0.3)] ring-1 ring-slate-200/70"
                  style={{ top: `${(60 / 330) * 100}%`, left: `${(165 / 330) * 100}%` }}
                >
                  <span className="inline-block h-3.5 w-3.5 overflow-hidden rounded-full ring-1 ring-slate-200/60">
                    {FLAG_SVGS.eu}
                  </span>
                  <span className="text-[9px] font-semibold text-slate-900">EUR</span>
                  <span className="text-[8px] font-medium text-slate-400">IBAN</span>
                </div>
                {/* USD · ACH — just outside top-left hub */}
                <div
                  className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full bg-white px-2 py-1 shadow-[0_8px_20px_-6px_rgba(15,23,42,0.3)] ring-1 ring-slate-200/70"
                  style={{ top: `${(86 / 330) * 100}%`, left: `${(78 / 330) * 100}%` }}
                >
                  <span className="inline-block h-3.5 w-3.5 overflow-hidden rounded-full ring-1 ring-slate-200/60">
                    {FLAG_SVGS.us}
                  </span>
                  <span className="text-[9px] font-semibold text-slate-900">USD</span>
                  <span className="text-[8px] font-medium text-slate-400">ACH</span>
                </div>
                {/* USDC — just outside top-right hub */}
                <div
                  className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full bg-white px-2 py-1 shadow-[0_8px_20px_-6px_rgba(15,23,42,0.3)] ring-1 ring-slate-200/70"
                  style={{ top: `${(85 / 330) * 100}%`, left: `${(180 / 330) * 100}%` }}
                >
                  <span className="inline-block h-3.5 w-3.5 overflow-hidden rounded-full">
                    {FLAG_SVGS.usdc}
                  </span>
                  <span className="text-[9px] font-semibold text-slate-900">USDC</span>
                </div>
                {/* GBP · Sort — just left of the left hub */}
                <div
                  className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full bg-white px-2 py-1 shadow-[0_8px_20px_-6px_rgba(15,23,42,0.3)] ring-1 ring-slate-200/70"
                  style={{ top: `${(168 / 330) * 100}%`, left: `${(56 / 330) * 100}%` }}
                >
                  <span className="inline-block h-3.5 w-3.5 overflow-hidden rounded-full ring-1 ring-slate-200/60">
                    {FLAG_SVGS.gb}
                  </span>
                  <span className="text-[9px] font-semibold text-slate-900">GBP</span>
                  <span className="text-[8px] font-medium text-slate-400">Sort</span>
                </div>
                {/* EURC — just outside the right hub */}
                <div
                  className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full bg-white px-2 py-1 shadow-[0_8px_20px_-6px_rgba(15,23,42,0.3)] ring-1 ring-slate-200/70"
                  style={{ top: `${(178 / 330) * 100}%`, left: `${(180 / 330) * 100}%` }}
                >
                  <span className="inline-block h-3.5 w-3.5 overflow-hidden rounded-full">
                    {FLAG_SVGS.eurc}
                  </span>
                  <span className="text-[9px] font-semibold text-slate-900">EURC</span>
                </div>
                {/* NGN · NUBAN — placed inside visible region; sits left
                    of its hub so the constellation doesn't clip. */}
                <div
                  className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full bg-white px-2 py-1 shadow-[0_8px_20px_-6px_rgba(15,23,42,0.3)] ring-1 ring-slate-200/70"
                  style={{ top: `${(180 / 330) * 100}%`, left: `${(130 / 330) * 100}%` }}
                >
                  <span className="inline-block h-3.5 w-3.5 overflow-hidden rounded-full ring-1 ring-slate-200/60">
                    {FLAG_SVGS.ng}
                  </span>
                  <span className="text-[9px] font-semibold text-slate-900">NGN</span>
                  <span className="text-[8px] font-medium text-slate-400">NUBAN</span>
                </div>
              </div>
            </div>
          </TiltCard>

          {/* Row 2 — Cards (col-4, glass) with iPhone Apple Pay — light mode */}
          <TiltCard className={`${GLASS} md:col-span-4`}>
            <div className="relative z-10 md:max-w-[55%]">
              <h3 className="text-5xl font-medium tracking-[-0.025em] text-slate-900">
                Cards
              </h3>
              <p className="mt-3 text-xl font-medium tracking-tight text-slate-900">
                Corporate cards.
              </p>
              <p className="mt-0.5 text-xl font-medium tracking-tight text-slate-500">
                Tap to pay.
              </p>
            </div>
            <div
              className="pointer-events-none absolute right-[-0.5rem] bottom-[-7rem] w-[11rem] origin-bottom-right scale-[0.7] md:scale-100"
            >
              {/* Phone frame — titanium-like bezel */}
              <div
                className="relative aspect-[1/2.06] w-full rounded-[2rem] p-[4px]"
                style={{
                  background:
                    "linear-gradient(135deg, #6B6B70 0%, #2B2B2E 22%, #1A1A1C 50%, #2B2B2E 78%, #6B6B70 100%)",
                  boxShadow:
                    "0 40px 80px -16px rgba(0,0,0,0.7), 0 16px 32px -8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.6)",
                }}
              >
                {/* Side buttons — subtle silhouettes */}
                <div
                  aria-hidden="true"
                  className="absolute top-[14%] -left-[2px] h-[4%] w-[2px] rounded-l-sm"
                  style={{ background: "linear-gradient(180deg, #3A3A3C, #1A1A1C)" }}
                />
                <div
                  aria-hidden="true"
                  className="absolute top-[22%] -left-[2px] h-[7%] w-[2px] rounded-l-sm"
                  style={{ background: "linear-gradient(180deg, #3A3A3C, #1A1A1C)" }}
                />
                <div
                  aria-hidden="true"
                  className="absolute top-[30%] -left-[2px] h-[7%] w-[2px] rounded-l-sm"
                  style={{ background: "linear-gradient(180deg, #3A3A3C, #1A1A1C)" }}
                />
                <div
                  aria-hidden="true"
                  className="absolute top-[24%] -right-[2px] h-[12%] w-[2px] rounded-r-sm"
                  style={{ background: "linear-gradient(180deg, #3A3A3C, #1A1A1C)" }}
                />
                <div className="relative h-full w-full overflow-hidden rounded-[1.7rem] bg-gradient-to-b from-white to-slate-50 ring-1 ring-black/30">
                  {/* Dynamic Island */}
                  <div className="absolute top-2 left-1/2 z-10 flex h-4 w-12 -translate-x-1/2 items-center justify-end rounded-full bg-black pr-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-700 ring-1 ring-slate-800" />
                  </div>
                  {/* Status bar */}
                  <div className="flex items-center justify-between px-3.5 pt-2.5 text-[8px] font-semibold text-slate-900">
                    <span>9:41</span>
                    <div className="flex items-center gap-1 text-slate-900">
                      {/* Signal */}
                      <svg
                        viewBox="0 0 16 10"
                        className="h-2 w-2.5"
                        aria-hidden="true"
                      >
                        <rect x="0" y="6" width="2" height="4" rx="0.3" fill="currentColor" />
                        <rect x="4" y="4" width="2" height="6" rx="0.3" fill="currentColor" />
                        <rect x="8" y="2" width="2" height="8" rx="0.3" fill="currentColor" />
                        <rect x="12" y="0" width="2" height="10" rx="0.3" fill="currentColor" />
                      </svg>
                      {/* Wifi */}
                      <svg
                        viewBox="0 0 12 9"
                        className="h-2 w-2.5"
                        aria-hidden="true"
                      >
                        <path
                          d="M6 8.2c0.5 0 0.9-0.4 0.9-0.9s-0.4-0.9-0.9-0.9-0.9 0.4-0.9 0.9 0.4 0.9 0.9 0.9zM6 4.8c0.9 0 1.7 0.3 2.3 0.9l1-1c-0.9-0.9-2-1.4-3.3-1.4s-2.4 0.5-3.3 1.4l1 1c0.6-0.6 1.4-0.9 2.3-0.9zM6 1.5c1.9 0 3.6 0.7 4.9 2L12 2.4C10.4 0.9 8.3 0 6 0S1.6 0.9 0 2.4l1.1 1.1c1.3-1.3 3-2 4.9-2z"
                          fill="currentColor"
                        />
                      </svg>
                      {/* Battery */}
                      <svg
                        viewBox="0 0 18 8"
                        className="h-2 w-3.5"
                        aria-hidden="true"
                      >
                        <rect
                          x="0.5"
                          y="0.5"
                          width="15"
                          height="7"
                          rx="1.4"
                          fill="none"
                          stroke="currentColor"
                          strokeOpacity="0.4"
                        />
                        <rect x="2" y="2" width="11" height="4" rx="0.5" fill="currentColor" />
                        <rect x="16.2" y="3" width="1.4" height="2" rx="0.4" fill="currentColor" fillOpacity="0.4" />
                      </svg>
                    </div>
                  </div>
                  {/* Apple Pay header */}
                  <div className="mt-5 text-center">
                    <div className="text-[9px] font-medium text-slate-500">
                      Apple Pay
                    </div>
                  </div>
                  {/* Card — lighter blue */}
                  <div className="mt-4 px-2.5">
                    <div className="aspect-[1.586/1] rounded-lg bg-gradient-to-br from-[#A8B8F5] via-[#5572F4] to-cobalt p-2.5 shadow-[0_10px_20px_-6px_rgba(85,114,244,0.55),inset_0_1px_0_rgba(255,255,255,0.35)] ring-1 ring-white/20">
                      <div className="flex h-full flex-col justify-between">
                        <div className="flex items-start justify-between">
                          <HorizonLogo className="h-3 w-3 text-white" />
                          <span className="text-[6px] font-medium tracking-[0.18em] text-white/80 uppercase">
                            Business
                          </span>
                        </div>
                        <div className="flex items-end justify-between">
                          <span className="font-mono text-[7px] tracking-wider text-white">
                            •••• 4928
                          </span>
                          <svg
                            viewBox="0 0 36 22"
                            className="h-2.5 w-4"
                            aria-hidden="true"
                          >
                            <circle cx="13" cy="11" r="10" fill="#EB001B" />
                            <circle cx="23" cy="11" r="10" fill="#F79E1B" />
                            <path
                              d="M18 4a10 10 0 0 1 0 14 10 10 0 0 1 0-14Z"
                              fill="#FF5F00"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Phone tap-near-reader indicator */}
                  <div className="mt-6 flex flex-col items-center">
                    <div className="grid h-8 w-8 place-items-center rounded-full ring-[1.5px] ring-cobalt">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4 text-cobalt"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <rect x="7" y="3" width="10" height="18" rx="2" />
                        <path d="M11 18h2" />
                      </svg>
                    </div>
                    <div className="mt-1.5 text-[8px] font-medium text-slate-700">
                      Hold Near Reader
                    </div>
                  </div>
                  {/* Home indicator */}
                  <div className="absolute bottom-1.5 left-1/2 h-0.5 w-10 -translate-x-1/2 rounded-full bg-slate-900/40" />
                </div>
              </div>
            </div>
          </TiltCard>

          {/* Row 2 — center: HORIZON brand tile (logo + wordmark) */}
          <TiltCard
            className="relative flex flex-col items-center justify-center overflow-hidden rounded-3xl p-6 text-white shadow-[0_10px_40px_rgba(31,59,214,0.18)] md:col-span-4"
            maxTilt={5}
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(31,59,214,0.14) 0%, rgba(58,94,240,0.10) 100%), url('/sky.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundBlendMode: "multiply",
            }}
          >
            <div className="relative grid h-24 w-24 place-items-center rounded-[28px] bg-gradient-to-br from-[#5572F4] via-cobalt to-cobalt-deep text-white shadow-[0_18px_36px_-8px_rgba(31,59,214,0.6),inset_0_2px_0_rgba(255,255,255,0.35),inset_0_-2px_0_rgba(0,0,0,0.15)]">
              <HorizonLogo className="h-14 w-14" />
            </div>

            <div className="mt-5 flex flex-col items-center text-center">
              <span className="text-3xl font-medium tracking-tight [text-shadow:0_2px_4px_rgba(15,23,42,0.4)]">
                Horizon
              </span>
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-white/15 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-20 -left-20 h-48 w-48 rounded-full bg-white/10 blur-3xl"
            />
          </TiltCard>

          {/* Row 2 — AI CFO (content moved here) */}
          <TiltCard className={`${GLASS} md:col-span-4`}>
            <div className="relative z-10 pt-1">
              <h3 className="text-5xl font-medium tracking-[-0.025em] text-slate-900">
                AI CFO
              </h3>
              <p className="mt-3 text-xl font-medium tracking-tight text-slate-900">
                Ask anything.
              </p>
            </div>
            {/* Dashboard widget — full inner width on desktop, scaled-down
                bottom-right thumbnail on mobile. */}
            <div className="pointer-events-none absolute right-2 bottom-2 w-[12rem] origin-bottom-right scale-[0.6] md:right-8 md:left-8 md:bottom-6 md:w-auto md:scale-100">
              {/* User question bubble */}
              <div className="flex justify-end">
                <div className="rounded-2xl rounded-tr-md bg-cobalt-pale px-3 py-1.5 text-xs font-medium text-slate-900 shadow-[0_2px_8px_-2px_rgba(15,23,42,0.1)]">
                  What&apos;s our runway?
                </div>
              </div>
              {/* AI response content — directly on the glass card */}
              <div className="mt-2">
                <div className="flex items-center gap-1.5">
                  <span className="relative grid h-4 w-4 place-items-center rounded-full bg-gradient-to-br from-[#5572F4] to-cobalt-deep">
                    <svg
                      viewBox="0 0 12 12"
                      className="h-2.5 w-2.5"
                      aria-hidden="true"
                    >
                      <path
                        d="M6 1l1.4 3.2L10.5 5.5 7.4 6.8 6 10 4.6 6.8 1.5 5.5 4.6 4.2z"
                        fill="white"
                      />
                    </svg>
                  </span>
                  <span className="text-[11px] font-medium text-slate-700">
                    Horizon
                  </span>
                  <span className="ml-auto text-[10px] text-slate-400">
                    Synced 2m ago
                  </span>
                </div>
                <div className="mt-1.5 flex items-baseline gap-1.5 tracking-tight text-slate-900">
                  <span className="text-2xl font-medium">14.2</span>
                  <span className="text-xs font-medium text-slate-500">
                    months runway
                  </span>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2.5">
                  <div className="rounded-lg bg-white/50 px-3 py-1.5 ring-1 ring-white/70">
                    <div className="text-[9px] font-medium tracking-wide text-slate-500 uppercase">
                      Cash
                    </div>
                    <div className="mt-0.5 text-xs font-medium text-slate-900">
                      $2.84M
                    </div>
                  </div>
                  <div className="rounded-lg bg-slate-900/[0.04] px-3 py-1.5 ring-1 ring-slate-300/40">
                    <div className="text-[9px] font-medium tracking-wide text-slate-500 uppercase">
                      Monthly burn
                    </div>
                    <div className="mt-0.5 text-xs font-medium text-slate-900">
                      $185k
                    </div>
                  </div>
                </div>
                <svg
                  viewBox="0 0 200 28"
                  className="mt-1.5 h-5 w-full"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient
                      id="aicfo-fill"
                      x1="0"
                      x2="0"
                      y1="0"
                      y2="1"
                    >
                      <stop offset="0" stopColor="#1F3BD6" stopOpacity="0.3" />
                      <stop offset="1" stopColor="#1F3BD6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,24 L40,21 L80,17 L120,13 L160,8 L200,4 L200,28 L0,28 Z"
                    fill="url(#aicfo-fill)"
                  />
                  <path
                    d="M0,24 L40,21 L80,17 L120,13 L160,8 L200,4"
                    fill="none"
                    stroke="#1F3BD6"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-md bg-cobalt-pale/80 px-2 py-1 ring-1 ring-cobalt/15">
                  <svg
                    viewBox="0 0 12 12"
                    className="h-2.5 w-2.5 text-cobalt-deep"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M2 6l3 3 5-6" />
                  </svg>
                  <span className="text-[10px] font-medium text-cobalt-deep">
                    Saved $4.2k from last rebalance
                  </span>
                </div>
              </div>
            </div>
          </TiltCard>

          {/* Row 3 — Treasury (col-3, glass) — exponential yield graph */}
          <TiltCard className={`${GLASS} md:col-span-3`}>
            <div className="relative z-10">
              <h3 className="text-3xl font-medium tracking-[-0.025em] text-slate-900">
                Treasury
              </h3>
              <p className="mt-2 text-base font-medium tracking-tight text-slate-900">
                Idle,{" "}
                <span className="text-slate-500">earning.</span>
              </p>
            </div>
            <div className="relative mt-auto flex flex-col">
              <div className="flex items-end justify-between">
                <div>
                  <div className="flex items-baseline gap-1 text-cobalt-deep">
                    <span className="text-6xl font-medium tracking-[-0.04em]">
                      5.2
                    </span>
                    <span className="text-xl font-medium">%</span>
                  </div>
                  <span className="text-xs font-medium text-slate-500">
                    APY · 12-mo rolling
                  </span>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-cobalt-pale px-2 py-1">
                  <svg
                    viewBox="0 0 12 12"
                    className="h-2.5 w-2.5 text-cobalt-deep"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M2 9l4-5 2 3 2-2" />
                    <path d="M7 4h3v3" />
                  </svg>
                  <span className="text-[10px] font-medium text-cobalt-deep">
                    +1.7%
                  </span>
                </div>
              </div>
              <svg
                viewBox="0 0 240 70"
                className="mt-3 h-16 w-full"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient
                    id="treasury-trend"
                    x1="0"
                    x2="0"
                    y1="0"
                    y2="1"
                  >
                    <stop offset="0" stopColor="#1F3BD6" stopOpacity="0.32" />
                    <stop offset="1" stopColor="#1F3BD6" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient
                    id="treasury-line"
                    x1="0"
                    x2="1"
                    y1="0"
                    y2="0"
                  >
                    <stop offset="0" stopColor="#5572F4" />
                    <stop offset="1" stopColor="#1F3BD6" />
                  </linearGradient>
                </defs>
                {/* gridlines */}
                <line
                  x1="0"
                  x2="240"
                  y1="20"
                  y2="20"
                  stroke="#E2E8F0"
                  strokeWidth="0.5"
                  strokeDasharray="2 3"
                />
                <line
                  x1="0"
                  x2="240"
                  y1="45"
                  y2="45"
                  stroke="#E2E8F0"
                  strokeWidth="0.5"
                  strokeDasharray="2 3"
                />
                {/* area fill */}
                <path
                  d="M 0,62 C 60,62 120,58 180,42 C 210,28 228,14 240,2 L 240,70 L 0,70 Z"
                  fill="url(#treasury-trend)"
                />
                {/* main exponential line — keeps rising at the end */}
                <path
                  d="M 0,62 C 60,62 120,58 180,42 C 210,28 228,14 240,2"
                  fill="none"
                  stroke="url(#treasury-line)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* end-point dot with glow */}
                <circle cx="238" cy="3" r="6" fill="#1F3BD6" fillOpacity="0.18" />
                <circle
                  cx="238"
                  cy="3"
                  r="3"
                  fill="white"
                  stroke="#1F3BD6"
                  strokeWidth="2"
                />
              </svg>
              <div className="mt-1 flex items-center justify-between text-[9px] font-medium text-slate-400">
                <span>Jan</span>
                <span>Apr</span>
                <span>Jul</span>
                <span>Oct</span>
                <span className="text-cobalt-deep">Now</span>
              </div>
            </div>
          </TiltCard>

          {/* Row 3 — Management — free-floating logos & team avatars */}
          <TiltCard className={`${GLASS} md:col-span-5`}>
            <div className="relative z-10 md:max-w-[42%]">
              <h3 className="text-5xl font-medium tracking-[-0.025em] text-slate-900">
                Management
              </h3>
              <p className="mt-3 text-xl font-medium tracking-tight text-slate-900">
                Books, bills, team.{" "}
                <span className="text-slate-500">Connected.</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Books and bills, wired into your stack.
              </p>
            </div>
            {/* Free-floating constellation: brand icon-marks + team people.
                Constrained to the right ~52% of the card (text uses the left
                ~42%, with a safety gap of 6%) so pills never overlap the
                headline or description. Hidden on mobile (% positions don't
                survive narrow viewports). */}
            <div className="pointer-events-none absolute inset-0 hidden md:block">
              {/* Brand icon-marks — square tiles for icon-marks, wider tile
                  for the Stripe wordmark. */}
              {[
                {
                  pos: "top-[10%] right-[8%]",
                  rotate: "-4deg",
                  alt: "Xero",
                  src: "/logos/xero.svg",
                  wordmark: false,
                },
                {
                  pos: "top-[14%] right-[26%]",
                  rotate: "3deg",
                  alt: "QuickBooks",
                  src: "/logos/quickbooks-icon.svg",
                  wordmark: false,
                },
                {
                  pos: "top-[38%] right-[10%]",
                  rotate: "2deg",
                  alt: "Stripe",
                  src: "/logos/stripe.svg",
                  wordmark: true,
                },
                {
                  pos: "top-[36%] right-[34%]",
                  rotate: "-3deg",
                  alt: "PayPal",
                  src: "/logos/paypal.svg",
                  wordmark: false,
                },
              ].map((item, i) =>
                item.wordmark ? (
                  <div
                    key={`logo-${i}`}
                    className={`absolute ${item.pos} flex h-11 items-center justify-center overflow-hidden rounded-xl bg-white px-3.5 shadow-[0_10px_24px_-8px_rgba(15,23,42,0.3),0_2px_4px_-2px_rgba(15,23,42,0.1)] ring-1 ring-slate-200/70`}
                    style={{ transform: `rotate(${item.rotate})` }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="h-5 w-auto"
                    />
                  </div>
                ) : (
                  <div
                    key={`logo-${i}`}
                    className={`absolute ${item.pos} grid h-11 w-11 place-items-center overflow-hidden rounded-xl bg-white shadow-[0_10px_24px_-8px_rgba(15,23,42,0.3),0_2px_4px_-2px_rgba(15,23,42,0.1)] ring-1 ring-slate-200/70`}
                    style={{ transform: `rotate(${item.rotate})` }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="h-8 w-8 object-contain"
                    />
                  </div>
                ),
              )}
              {/* People pills — avatar + name, clustered tight below the
                  integration logos. */}
              {[
                {
                  pos: "top-[58%] right-[5%]",
                  rotate: "3deg",
                  label: "Mike R.",
                  src: "https://randomuser.me/api/portraits/men/32.jpg",
                },
                {
                  pos: "top-[56%] right-[28%]",
                  rotate: "-4deg",
                  label: "Sarah K.",
                  src: "https://randomuser.me/api/portraits/women/44.jpg",
                },
                {
                  pos: "top-[78%] right-[16%]",
                  rotate: "-1deg",
                  label: "Lisa T.",
                  src: "https://randomuser.me/api/portraits/women/68.jpg",
                },
              ].map((item, i) => (
                <div
                  key={`person-${i}`}
                  className={`absolute ${item.pos} flex items-center gap-2 rounded-full bg-white py-1.5 pr-3.5 pl-1.5 shadow-[0_10px_24px_-8px_rgba(15,23,42,0.3),0_2px_4px_-2px_rgba(15,23,42,0.1)] ring-1 ring-slate-200/70`}
                  style={{ transform: `rotate(${item.rotate})` }}
                >
                  <span className="grid h-7 w-7 place-items-center overflow-hidden rounded-full ring-1 ring-slate-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.src}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </span>
                  <span className="text-xs font-medium text-slate-900">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </TiltCard>

          {/* Row 3 — Agents (col-4, slate-900) dark card with rich agent panel */}
          <TiltCard
            className="relative flex flex-col overflow-hidden rounded-3xl bg-slate-900 p-8 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] md:col-span-4"
            maxTilt={3}
          >
            <div className="relative z-10 md:max-w-[55%]">
              <h3 className="text-4xl font-medium tracking-[-0.025em]">
                Agents
              </h3>
              <p className="mt-3 text-lg font-medium tracking-tight text-white">
                Banking for
              </p>
              <p className="mt-0.5 text-lg font-medium tracking-tight text-white/60">
                &amp; with AI.
              </p>
            </div>
            <div
              className="pointer-events-none absolute right-[-0.5rem] bottom-[-1.5rem] w-[14rem] origin-bottom-right scale-[0.7] md:scale-100"
              style={{
                transform:
                  "perspective(800px) rotateY(-8deg) rotateX(6deg) rotate(2deg)",
                transformStyle: "preserve-3d",
              }}
            >
              <div className={`${PANEL_DARK} p-3.5`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="relative grid h-5 w-5 place-items-center rounded-full bg-gradient-to-br from-cobalt-soft to-cobalt">
                      <svg
                        viewBox="0 0 12 12"
                        className="h-3 w-3 text-slate-900"
                        aria-hidden="true"
                      >
                        <path
                          d="M6 1l1.4 3.2L10.5 5.5 7.4 6.8 6 10 4.6 6.8 1.5 5.5 4.6 4.2z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                    <div>
                      <div className="text-[11px] font-medium text-white leading-none">
                        Vendor Bot
                      </div>
                      <div className="text-[8px] text-slate-400 mt-0.5">
                        Auto-pay vendors
                      </div>
                    </div>
                  </div>
                  <span className="rounded-full bg-cobalt-soft/15 px-1.5 py-0.5 text-[8px] font-medium tracking-wide text-cobalt-soft">
                    Active
                  </span>
                </div>
                <div className="mt-3 border-t border-white/10 pt-2.5">
                  <div className="flex items-center justify-between text-[9px] text-slate-400">
                    <span>Monthly limit</span>
                    <span className="font-mono text-slate-300">$50,000</span>
                  </div>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="text-xl font-medium tracking-tight text-white">
                      $12,420
                    </span>
                    <span className="text-[9px] text-slate-500">
                      .50 spent
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cobalt-soft to-cobalt"
                      style={{ width: "24%" }}
                    />
                  </div>
                </div>
                <div className="mt-3 space-y-1.5 border-t border-white/10 pt-2.5 text-[10px]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="h-1 w-1 rounded-full bg-cobalt-soft" />
                      <span className="text-slate-400">AWS</span>
                    </div>
                    <span className="font-mono text-white">$4,200</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="h-1 w-1 rounded-full bg-cobalt-soft" />
                      <span className="text-slate-400">Twilio</span>
                    </div>
                    <span className="font-mono text-white">$890</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="h-1 w-1 rounded-full bg-cobalt-soft" />
                      <span className="text-slate-400">OpenAI</span>
                    </div>
                    <span className="font-mono text-white">$320</span>
                  </div>
                </div>
                <div className="mt-2 border-t border-white/10 pt-1.5 text-[9px] text-slate-500">
                  Policy · Auto-approve under $5k
                </div>
              </div>
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-12 -bottom-12 h-44 w-44 rounded-full bg-cobalt/30 blur-2xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-0 right-0 h-28 w-28 rounded-full bg-cobalt-soft/15 blur-2xl"
            />
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
