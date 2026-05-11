"use client";

import { useEffect, useState } from "react";

export function WaitlistForm() {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    let timeout: number | undefined;
    const handler = () => {
      setPulse(true);
      window.clearTimeout(timeout);
      timeout = window.setTimeout(() => setPulse(false), 1250);
    };
    window.addEventListener("horizon:highlight-waitlist", handler);
    return () => {
      window.removeEventListener("horizon:highlight-waitlist", handler);
      window.clearTimeout(timeout);
    };
  }, []);

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className={`mx-auto mt-10 flex w-full max-w-md items-center rounded-2xl border border-white/40 bg-white/15 p-1.5 shadow-[0_8px_30px_rgba(15,23,42,0.15)] backdrop-blur-md transition-colors focus-within:border-white/60 focus-within:bg-white/25 ${
        pulse ? "wl-pulse" : ""
      }`}
    >
      <input
        type="email"
        required
        placeholder="you@email.com"
        aria-label="Email address"
        className="min-w-0 flex-1 bg-transparent px-4 py-2 text-base text-white placeholder:text-white/70 outline-none"
      />
      <button
        type="submit"
        className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium whitespace-nowrap text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-1px_0_rgba(255,255,255,0.06),0_4px_14px_rgba(15,23,42,0.3)] transition-colors hover:bg-slate-800"
      >
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 8a6 6 0 0 1 12 0c0 5 2 6 2 8H4c0-2 2-3 2-8" />
          <path d="M10 19a2 2 0 0 0 4 0" />
        </svg>
        Join Waitlist
      </button>
    </form>
  );
}
