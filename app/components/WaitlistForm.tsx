"use client";

import { useActionState, useEffect, useState } from "react";
import { joinWaitlist, type WaitlistResult } from "../actions/waitlist";

export function WaitlistForm() {
  const [pulse, setPulse] = useState(false);
  const [state, action, pending] = useActionState<
    WaitlistResult | null,
    FormData
  >(joinWaitlist, null);

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

  if (state?.ok) {
    return (
      <div className="mx-auto mt-10 flex w-full max-w-md items-center justify-center gap-3 rounded-2xl border border-white/40 bg-white/15 px-5 py-4 text-base text-white shadow-[0_8px_30px_rgba(15,23,42,0.15)] backdrop-blur-md">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-white/25 ring-1 ring-white/40">
          <svg
            viewBox="0 0 16 16"
            width="14"
            height="14"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 8l3.5 3.5L13 5" />
          </svg>
        </span>
        <span>You&apos;re on the list. We&apos;ll be in touch.</span>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 w-full max-w-md">
      <form
        action={action}
        className={`flex w-full items-center rounded-2xl border border-white/40 bg-white/15 p-1.5 shadow-[0_8px_30px_rgba(15,23,42,0.15)] backdrop-blur-md transition-colors focus-within:border-white/60 focus-within:bg-white/25 ${
          pulse ? "wl-pulse" : ""
        }`}
      >
        <input
          name="email"
          type="email"
          required
          disabled={pending}
          placeholder="you@email.com"
          aria-label="Email address"
          className="min-w-0 flex-1 bg-transparent px-4 py-2 text-base text-white placeholder:text-white/70 outline-none disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium whitespace-nowrap text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-1px_0_rgba(255,255,255,0.06),0_4px_14px_rgba(15,23,42,0.3)] transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {pending ? (
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              aria-hidden="true"
              className="animate-spin"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M12 3a9 9 0 1 0 9 9" />
            </svg>
          ) : (
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
          )}
          {pending ? "Joining…" : "Join Waitlist"}
        </button>
      </form>
      {state && !state.ok && (
        <p
          role="alert"
          className="mt-2 text-center text-sm font-medium text-white drop-shadow-[0_1px_2px_rgba(15,23,42,0.5)]"
        >
          {state.error}
        </p>
      )}
    </div>
  );
}
