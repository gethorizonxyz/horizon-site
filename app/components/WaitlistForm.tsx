"use client";

import { useActionState, useEffect, useState } from "react";
import { joinWaitlist, type WaitlistResult } from "../actions/waitlist";

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js" | "set",
      target: string,
      params?: Record<string, unknown>,
    ) => void;
  }
}

/**
 * Attribution source: read from `?ref=<slug>` on entry and persist in
 * localStorage for 30 days. A user who clicks an X-ad today and signs
 * up next week still attributes correctly. Slug is URL-safe lowercase
 * alphanumeric/`-`, max 60 chars. Server re-validates.
 */
const REF_STORAGE_KEY = "horizon.waitlist.ref.v1";
const REF_TTL_MS = 30 * 24 * 60 * 60 * 1000;
const REF_PATTERN = /^[a-z0-9][a-z0-9-]{0,59}$/;
type StoredRef = { value: string; expiresAt: number };

function readStoredRef(): string | null {
  try {
    const raw = window.localStorage.getItem(REF_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredRef;
    if (typeof parsed?.value !== "string") return null;
    if (typeof parsed?.expiresAt !== "number") return null;
    if (Date.now() > parsed.expiresAt) {
      window.localStorage.removeItem(REF_STORAGE_KEY);
      return null;
    }
    return parsed.value;
  } catch {
    return null;
  }
}

function writeStoredRef(value: string) {
  try {
    const payload: StoredRef = {
      value,
      expiresAt: Date.now() + REF_TTL_MS,
    };
    window.localStorage.setItem(REF_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* private mode / storage disabled — harmless */
  }
}

export function WaitlistForm() {
  const [pulse, setPulse] = useState(false);
  const [attributionSource, setAttributionSource] = useState<string>("");
  const [state, action, pending] = useActionState<
    WaitlistResult | null,
    FormData
  >(joinWaitlist, null);

  // Resolve attribution on mount: URL `?ref=` wins (and gets stored),
  // otherwise fall back to a previously stored ref. Empty string =
  // server falls back to "landing".
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlRef = (params.get("ref") ?? "").trim().toLowerCase();
      if (urlRef && REF_PATTERN.test(urlRef)) {
        writeStoredRef(urlRef);
        setAttributionSource(urlRef);
        return;
      }
      const stored = readStoredRef();
      if (stored) setAttributionSource(stored);
    } catch {
      /* SSR / no window — harmless */
    }
  }, []);

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

  useEffect(() => {
    if (state?.ok) {
      window.gtag?.("event", "conversion", {
        send_to: "AW-18149483837/ZgqrCNes3KkcEL3KrM5D",
        value: 1.0,
        currency: "USD",
      });
    }
  }, [state]);

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
        {/* Attribution slug, set from ?ref= or stored ref. Server
            re-validates; empty string falls back to "landing". */}
        <input type="hidden" name="source" value={attributionSource} />
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
