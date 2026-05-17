"use client";

type Plan = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  featured?: boolean;
  ctaAction: "scroll-top" | "external";
};

const PLANS: Plan[] = [
  {
    name: "Starter",
    price: "0",
    period: "/forever",
    description: "For founders opening their first global business account.",
    features: [
      "Self-custody vault, your keys always",
      "Send and receive in 195+ countries",
      "Up to 3 team members",
      "Real-time treasury dashboard",
      "Invoicing and basic bookkeeping",
      "Yield on idle balance from day one",
      "AI CFO answers: balance, runway, cashflow",
    ],
    cta: "Get started",
    ctaAction: "scroll-top",
  },
  {
    name: "Business",
    price: "49",
    period: "/month",
    description: "For teams running payroll, contractors, and treasury.",
    features: [
      "Everything in Starter, plus:",
      "Virtual and physical cards for the team",
      "USD (ACH/wire), EUR IBAN, GBP accounts",
      "On/off-ramp between fiat and stablecoins",
      "More members and approval workflows",
      "Payroll and bulk payouts to global contractors",
      "Xero, QuickBooks, Stripe and 20+ integrations",
    ],
    cta: "Join the waitlist",
    featured: true,
    ctaAction: "scroll-top",
  },
  {
    name: "Scale",
    price: "99",
    period: "/month",
    description: "For businesses moving real volume.",
    features: [
      "Everything in Business, plus:",
      "AI CFO that executes payments and runs treasury",
      "Up to 25 AI agents with policy controls",
      "Advanced reporting and financial statements",
      "Higher transaction limits",
      "SSO, audit logs, custom permissions",
      "Priority support · 1-hour response",
    ],
    cta: "Join the waitlist",
    ctaAction: "scroll-top",
  },
];

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

function handleCtaClick() {
  const startY = window.scrollY;
  if (startY < 5) {
    window.dispatchEvent(new CustomEvent("horizon:highlight-waitlist"));
    return;
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
  // Distance-aware delay so the pulse fires after the smooth scroll lands.
  const delay = Math.max(350, Math.min(1500, startY * 0.4 + 250));
  window.setTimeout(() => {
    window.dispatchEvent(new CustomEvent("horizon:highlight-waitlist"));
  }, delay);
}

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative z-[3] overflow-hidden rounded-b-[2rem] bg-[#eef2f8] px-6 py-24 shadow-[0_24px_40px_-16px_rgba(15,23,42,0.14),0_8px_16px_-6px_rgba(15,23,42,0.06)] sm:py-32"
    >
<div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-medium tracking-[-0.025em] text-slate-900 sm:text-5xl md:text-6xl">
            Start free.{" "}
            <span className="italic">Scale on your horizon.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600 sm:text-xl">
            Three plans, no contracts. Move up when the venture moves up. Never
            before.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-3xl p-8 backdrop-blur-xl backdrop-saturate-150 ${
                plan.featured
                  ? "bg-white/70 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.2)] ring-1 ring-white/80"
                  : "bg-white/45 shadow-[0_8px_30px_rgba(15,23,42,0.06)] ring-1 ring-white/65"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-slate-900 px-4 py-1.5 text-xs font-medium text-white shadow-md">
                  Most chosen
                </span>
              )}

              <span className="text-2xl font-medium tracking-tight text-slate-900">
                {plan.name}
              </span>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-lg text-slate-500">$</span>
                <span className="text-6xl font-medium tracking-tight text-slate-900 sm:text-7xl">
                  {plan.price}
                </span>
                <span className="ml-1 text-base text-slate-500">
                  {plan.period}
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                {plan.description}
              </p>

              <hr className="my-7 border-slate-200" />

              <ul className="flex-1 space-y-3.5">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-slate-700"
                  >
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-cobalt" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={handleCtaClick}
                className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-colors ${
                  plan.featured
                    ? "bg-slate-900 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-1px_0_rgba(255,255,255,0.06),0_4px_14px_rgba(15,23,42,0.3)] hover:bg-slate-800"
                    : "bg-slate-100 text-slate-900 ring-1 ring-slate-200 hover:bg-slate-200"
                }`}
              >
                {plan.cta}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
