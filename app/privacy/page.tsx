import type { Metadata } from "next";
import Link from "next/link";
import { HorizonLogo } from "../components/HorizonLogo";

export const metadata: Metadata = {
  title: "Privacy Policy — Horizon",
  description: "How Horizon collects, uses, and protects your information.",
  robots: { index: false, follow: false },
};

const LAST_UPDATED = "May 11, 2026";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      {/* Top bar — minimal, just a way back home */}
      <header className="border-b border-slate-200">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-slate-900 transition-opacity hover:opacity-80"
          >
            <HorizonLogo className="h-7 w-7" />
            <span className="text-lg font-semibold tracking-tight">
              Horizon
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
          >
            ← Back to home
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
        <p className="text-sm font-medium tracking-wide text-slate-500 uppercase">
          Legal
        </p>
        <h1 className="mt-3 text-5xl font-medium tracking-[-0.025em] text-slate-900 sm:text-6xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-slate-500">
          Last updated: {LAST_UPDATED}
        </p>

        <div className="mt-12 space-y-12 text-base leading-relaxed text-slate-700">
          {/* PLACEHOLDER COPY — replace with final policy text */}
          <section>
            <h2 className="text-2xl font-medium tracking-tight text-slate-900">
              1. Introduction
            </h2>
            <p className="mt-4">
              [Placeholder] Horizon, Inc. (&ldquo;Horizon&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or
              &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy
              Policy explains how we collect, use, disclose, and safeguard
              information about you when you visit our website or use our
              services. Final wording to be inserted.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium tracking-tight text-slate-900">
              2. Information we collect
            </h2>
            <p className="mt-4">
              [Placeholder] We may collect information you provide directly to
              us, such as your name, email address, and any other details you
              choose to share. We also automatically collect certain technical
              information when you visit our website (such as IP address,
              browser type, and pages viewed).
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-slate-400">
              <li>Account and contact information you submit.</li>
              <li>Usage and device data collected automatically.</li>
              <li>
                Cookies and similar tracking technologies, including analytics
                and advertising identifiers.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-medium tracking-tight text-slate-900">
              3. How we use information
            </h2>
            <p className="mt-4">
              [Placeholder] We use the information we collect to operate,
              maintain, and improve our services; to communicate with you about
              product updates and offers; to comply with legal obligations; and
              to protect the rights, property, or safety of Horizon, our users,
              and others.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium tracking-tight text-slate-900">
              4. Sharing of information
            </h2>
            <p className="mt-4">
              [Placeholder] We do not sell your personal information. We may
              share information with service providers who perform services on
              our behalf, with regulators or other parties when required by
              law, or in connection with a merger, acquisition, or sale of
              assets.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium tracking-tight text-slate-900">
              5. Cookies and analytics
            </h2>
            <p className="mt-4">
              [Placeholder] Our website uses cookies and similar technologies
              to operate, secure, and improve the site, and to measure the
              effectiveness of our marketing. You can control cookies through
              your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium tracking-tight text-slate-900">
              6. Data retention
            </h2>
            <p className="mt-4">
              [Placeholder] We retain personal information for as long as
              necessary to fulfill the purposes outlined in this Privacy
              Policy, unless a longer retention period is required or permitted
              by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium tracking-tight text-slate-900">
              7. Your rights
            </h2>
            <p className="mt-4">
              [Placeholder] Depending on your location, you may have the right
              to access, correct, delete, or restrict the use of your personal
              information, as well as the right to data portability and to
              object to certain processing. To exercise these rights, contact
              us at the address below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium tracking-tight text-slate-900">
              8. International transfers
            </h2>
            <p className="mt-4">
              [Placeholder] Your information may be transferred to and
              processed in countries other than your own. We take appropriate
              safeguards to ensure your information remains protected in
              accordance with this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium tracking-tight text-slate-900">
              9. Children&apos;s privacy
            </h2>
            <p className="mt-4">
              [Placeholder] Horizon is not directed to children under the age
              of 13 (or the equivalent minimum age in the relevant
              jurisdiction). We do not knowingly collect personal information
              from children.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium tracking-tight text-slate-900">
              10. Changes to this policy
            </h2>
            <p className="mt-4">
              [Placeholder] We may update this Privacy Policy from time to
              time. We will notify you of any material changes by posting the
              new Privacy Policy on this page and updating the &ldquo;Last
              updated&rdquo; date above.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium tracking-tight text-slate-900">
              11. Contact us
            </h2>
            <p className="mt-4">
              [Placeholder] If you have any questions about this Privacy
              Policy or our privacy practices, please contact us at{" "}
              <a
                href="mailto:privacy@gethorizon.xyz"
                className="font-medium text-cobalt-deep underline decoration-cobalt-deep/40 underline-offset-4 transition-colors hover:decoration-cobalt-deep"
              >
                privacy@gethorizon.xyz
              </a>
              .
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-slate-200">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-6 text-sm text-slate-500">
          <span>© 2026 Horizon, Inc.</span>
          <Link
            href="/"
            className="font-medium transition-colors hover:text-slate-900"
          >
            Horizon
          </Link>
        </div>
      </footer>
    </div>
  );
}
