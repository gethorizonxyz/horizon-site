"use server";

/**
 * Marketing-site waitlist submission. Posts to the Horizon API's
 * public `POST /api/waitlist` endpoint (single source of truth — the
 * in-app /waitlist page lands in the same DB via tRPC). Previously
 * this wrote directly to a Supabase table; we migrated to the API so
 * attribution (ads-x, ads-reddit, discord, …) is captured consistently
 * across both entry points.
 *
 * The `source` form-field is the attribution slug from the client.
 * The server validates it against a URL-safe pattern; garbage falls
 * back to "landing" on the API side.
 */
export type WaitlistResult =
  | { ok: true }
  | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEFAULT_API_URL = "https://api-7f3c2e.gethorizon.xyz";

export async function joinWaitlist(
  _prev: WaitlistResult | null,
  formData: FormData,
): Promise<WaitlistResult> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  if (!email || !EMAIL_RE.test(email)) {
    return { ok: false, error: "Please enter a valid email." };
  }

  // Attribution slug from the form's hidden field (set by WaitlistForm
  // from `?ref=` or 30-day localStorage). Server validates + falls back
  // to "landing" if missing/invalid.
  const source = String(formData.get("source") ?? "").trim();

  const apiBase = process.env.HORIZON_API_URL ?? DEFAULT_API_URL;
  // The Horizon API mounts the public HTTP routes under a security-
  // through-obscurity gateway prefix in prod. Override with
  // HORIZON_API_WAITLIST_PATH if the path ever moves.
  const path = process.env.HORIZON_API_WAITLIST_PATH ?? "/api/waitlist";

  try {
    const res = await fetch(`${apiBase}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        ...(source ? { source } : {}),
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      // 429 = rate limited (per-IP, per-hour); surface a kinder message
      if (res.status === 429) {
        return {
          ok: false,
          error: "Too many signups from your network. Try again in an hour.",
        };
      }
      return { ok: false, error: "Could not join waitlist. Try again." };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "Could not reach the server. Try again." };
  }
}
