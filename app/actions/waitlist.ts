"use server";

export type WaitlistResult =
  | { ok: true }
  | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return { ok: false, error: "Server not configured." };
  }

  const res = await fetch(`${url}/rest/v1/waitlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: key,
      Authorization: `Bearer ${key}`,
      // Requires a unique constraint on `email` — see README.
      Prefer: "resolution=ignore-duplicates,return=minimal",
    },
    body: JSON.stringify({ email }),
    cache: "no-store",
  });

  if (!res.ok) {
    return { ok: false, error: "Could not join waitlist. Try again." };
  }

  return { ok: true };
}
