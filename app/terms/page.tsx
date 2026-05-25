import type { Metadata } from "next";
import Link from "next/link";
import { HorizonLogo } from "../components/HorizonLogo";

export const metadata: Metadata = {
  title: "Terms of Service — Horizon",
  description:
    "The terms that govern your use of the Horizon website and waitlist.",
  robots: { index: false, follow: false },
};

const EFFECTIVE_DATE = "20 May 2026";
const LAST_UPDATED = "20 May 2026";

export default function TermsOfServicePage() {
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
          Terms of Service
        </h1>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-500">
          <span>
            <span className="font-medium text-slate-700">Effective Date:</span>{" "}
            {EFFECTIVE_DATE}
          </span>
          <span>
            <span className="font-medium text-slate-700">Last Updated:</span>{" "}
            {LAST_UPDATED}
          </span>
        </div>

        <div className="mt-12 space-y-12 text-base leading-relaxed text-slate-700">
          <section>
            <h2 className="text-2xl font-medium tracking-tight text-slate-900">
              1. Introduction
            </h2>
            <p className="mt-4">
              These Terms of Service (the &ldquo;Terms&rdquo;) govern your
              access to and use of the website at gethorizon.xyz, the related
              waitlist signup, and any other services we make available to you
              prior to general availability of the Horizon product (together,
              the &ldquo;Services&rdquo;). The Services are operated by
              Horizon Technologies Inc., a Delaware corporation with offices
              at 501 Folsom St, San Francisco, CA 94105 (&ldquo;Horizon&rdquo;,
              &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;).
            </p>
            <p className="mt-4">
              By accessing or using the Services, you agree to be bound by
              these Terms and by our{" "}
              <Link
                href="/privacy"
                className="font-medium text-cobalt-deep underline decoration-cobalt-deep/40 underline-offset-4 transition-colors hover:decoration-cobalt-deep"
              >
                Privacy Policy
              </Link>
              , which is incorporated by reference. If you do not agree, you
              must not use the Services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium tracking-tight text-slate-900">
              2. The Services
            </h2>
            <p className="mt-4">
              The Services described on this Website are currently in
              pre-launch and are limited to: (a) marketing information about
              the Horizon product; (b) an email waitlist that lets you
              indicate interest in receiving future access; and (c) related
              communications. These Terms do not grant you access to a
              financial account, a payment service, custody of assets, or any
              other regulated service. The full Horizon product will be
              governed by a separate, product-specific agreement at the time
              it is offered to you.
            </p>
            <p className="mt-4">
              Nothing on the Website constitutes an offer to sell, a
              solicitation to buy, or a recommendation regarding any security,
              digital asset, or financial product.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium tracking-tight text-slate-900">
              3. Eligibility
            </h2>
            <p className="mt-4">
              You may use the Services only if you are at least 18 years old,
              can form a legally binding contract under applicable law, and
              are not barred from using the Services under the laws of any
              jurisdiction that applies to you. By using the Services, you
              represent and warrant that you meet these requirements.
            </p>
            <p className="mt-4">
              You may not use the Services if you are located in, ordinarily
              resident in, or organized under the laws of a country or region
              subject to comprehensive sanctions administered by the US
              Department of the Treasury&apos;s Office of Foreign Assets
              Control (OFAC), the EU, the United Kingdom, or the United
              Nations, or if you are listed on any sanctions, denied parties,
              or restricted parties list maintained by those authorities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium tracking-tight text-slate-900">
              4. Waitlist and Communications
            </h2>
            <p className="mt-4">
              When you submit the waitlist form, you provide us with your
              email address and may optionally provide additional information
              about you or your business. Submission does not create an
              account, does not entitle you to access the Horizon product, and
              does not obligate us to invite you. We may invite waitlist
              members in any order, on any timeline, or not at all.
            </p>
            <p className="mt-4">
              By joining the waitlist you agree to receive transactional
              communications from us regarding your signup and any future
              invitation. You may unsubscribe from marketing communications at
              any time using the link in those messages.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium tracking-tight text-slate-900">
              5. Acceptable Use
            </h2>
            <p className="mt-4">When using the Services you agree not to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6 marker:text-slate-400">
              <li>
                Submit false, misleading, or fraudulent information, including
                another person&apos;s email address without their permission.
              </li>
              <li>
                Use automated systems (bots, scrapers, spiders) to access the
                Website at a rate or in a manner that adversely affects its
                availability, except for well-behaved search-engine crawlers.
              </li>
              <li>
                Reverse-engineer, decompile, copy, frame, or attempt to
                extract source code, design, or proprietary information from
                the Website.
              </li>
              <li>
                Probe, scan, or test the vulnerability of the Website or
                attempt to bypass any access control, authentication, or
                rate-limiting mechanism.
              </li>
              <li>
                Use the Services to violate any applicable law, regulation,
                court order, or third-party right, including intellectual
                property, privacy, or data-protection rights.
              </li>
              <li>
                Distribute malware, viruses, ransomware, or other harmful
                code, or use the Services to facilitate any unlawful
                activity, including money laundering, terrorist financing,
                sanctions evasion, or fraud.
              </li>
            </ul>
            <p className="mt-4">
              We may suspend or terminate your access to the Services at any
              time, without notice, for any conduct that we reasonably believe
              violates these Terms or harms us, our users, or any third
              party.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium tracking-tight text-slate-900">
              6. Intellectual Property
            </h2>
            <p className="mt-4">
              The Website and all content on it (other than user-submitted
              content) are owned by Horizon Technologies Inc. or its licensors
              and are protected by intellectual-property and other laws. The
              names &ldquo;Horizon&rdquo;, the Horizon logo, and any related
              names, logos, product and service names, designs, and slogans
              are trademarks of Horizon Technologies Inc. or its affiliates.
              You may not use any of these without our prior written
              permission.
            </p>
            <p className="mt-4">
              Subject to your compliance with these Terms, we grant you a
              limited, non-exclusive, non-transferable, revocable license to
              access and use the Website for your personal, non-commercial
              evaluation of our Services. All other rights are reserved.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium tracking-tight text-slate-900">
              7. Third-Party Services and Links
            </h2>
            <p className="mt-4">
              The Website may contain links to or integrations with
              third-party websites, products, or services that we do not
              operate or control (for example, links to social platforms,
              partner logos, or analytics services). Your use of those
              third-party services is governed by their own terms and
              policies, and we are not responsible for them.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium tracking-tight text-slate-900">
              8. Disclaimers
            </h2>
            <p className="mt-4">
              The Services are provided on an &ldquo;as is&rdquo; and
              &ldquo;as available&rdquo; basis, without warranty of any
              kind, whether express, implied, statutory, or otherwise. To
              the maximum extent permitted by applicable law, we disclaim
              all warranties, including any implied warranties of
              merchantability, fitness for a particular purpose,
              non-infringement, and any warranty arising out of course of
              dealing or usage of trade.
            </p>
            <p className="mt-4">
              We do not warrant that the Services will be uninterrupted,
              error-free, secure, or free of viruses or other harmful
              components, that defects will be corrected, or that the
              information made available is accurate, complete, or current.
              You use the Services at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium tracking-tight text-slate-900">
              9. Limitation of Liability
            </h2>
            <p className="mt-4">
              To the maximum extent permitted by applicable law, in no event
              will Horizon Technologies Inc., its affiliates, officers,
              directors, employees, agents, or licensors be liable for any
              indirect, incidental, special, consequential, exemplary, or
              punitive damages, including but not limited to loss of profits,
              loss of data, loss of goodwill, business interruption, or any
              other intangible loss, arising out of or in connection with
              these Terms or your use of the Services, whether based in
              contract, tort, statute, or any other legal theory, and whether
              or not we have been advised of the possibility of such damages.
            </p>
            <p className="mt-4">
              Our total aggregate liability arising out of or in connection
              with these Terms or the Services will not exceed one hundred
              US dollars (US$100). Some jurisdictions do not allow the
              limitation or exclusion of certain damages, so the limits
              above may not apply to you to the extent prohibited by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium tracking-tight text-slate-900">
              10. Indemnification
            </h2>
            <p className="mt-4">
              You agree to defend, indemnify, and hold harmless Horizon
              Technologies Inc. and its affiliates, officers, directors,
              employees, and agents from and against any and all claims,
              damages, obligations, losses, liabilities, costs, and expenses
              (including reasonable attorneys&apos; fees) arising out of or
              connected with: (a) your access to or use of the Services; (b)
              your violation of these Terms; or (c) your violation of any
              third-party right, including any intellectual-property,
              privacy, or contractual right.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium tracking-tight text-slate-900">
              11. Termination
            </h2>
            <p className="mt-4">
              We may suspend or terminate your access to the Services at any
              time, with or without notice or cause. You may stop using the
              Services at any time. Sections that by their nature should
              survive termination will survive, including sections on
              Intellectual Property, Disclaimers, Limitation of Liability,
              Indemnification, Governing Law and Dispute Resolution, and
              Miscellaneous.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium tracking-tight text-slate-900">
              12. Governing Law and Dispute Resolution
            </h2>
            <p className="mt-4">
              These Terms and your use of the Services are governed by the
              laws of the State of California, without regard to its
              conflict-of-laws principles. The United Nations Convention on
              Contracts for the International Sale of Goods does not apply.
            </p>
            <p className="mt-4">
              Subject to the next paragraph, you and Horizon Technologies
              Inc. agree that any dispute, claim, or controversy arising out
              of or relating to these Terms or the Services will be brought
              exclusively in the state or federal courts located in San
              Francisco County, California, and you and we consent to the
              personal jurisdiction of those courts.
            </p>
            <p className="mt-4">
              If you are located in the European Economic Area, the United
              Kingdom, or another jurisdiction whose mandatory consumer
              protection laws apply to you, nothing in this section deprives
              you of the protection afforded by those mandatory laws,
              including your right to bring proceedings in your country of
              residence.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium tracking-tight text-slate-900">
              13. Changes to These Terms
            </h2>
            <p className="mt-4">
              We may update these Terms from time to time. We will post the
              updated Terms on this page and update the &ldquo;Last
              Updated&rdquo; date. Material changes will be communicated to
              you by email or through a prominent notice on the Website. Your
              continued use of the Services after the updated Terms become
              effective constitutes your acceptance of the changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium tracking-tight text-slate-900">
              14. Miscellaneous
            </h2>
            <p className="mt-4">
              These Terms, together with our Privacy Policy, constitute the
              entire agreement between you and Horizon Technologies Inc.
              regarding the Services and supersede any prior agreements. If
              any provision of these Terms is held to be invalid or
              unenforceable, the remaining provisions will remain in full
              force and effect. Our failure to enforce any right or provision
              of these Terms will not be deemed a waiver of that right or
              provision. You may not assign or transfer these Terms without
              our prior written consent; we may assign these Terms at any
              time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium tracking-tight text-slate-900">
              15. Contact
            </h2>
            <p className="mt-4">
              For questions about these Terms, contact us at{" "}
              <a
                href="mailto:legal@gethorizon.xyz"
                className="font-medium text-cobalt-deep underline decoration-cobalt-deep/40 underline-offset-4 transition-colors hover:decoration-cobalt-deep"
              >
                legal@gethorizon.xyz
              </a>{" "}
              or by mail at the address below.
            </p>
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50/60 px-5 py-4 text-sm text-slate-700">
              <div className="font-medium text-slate-900">
                Horizon Technologies Inc.
              </div>
              <div>501 Folsom St</div>
              <div>San Francisco, CA 94105</div>
              <div>United States</div>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-slate-200">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-6 py-6 text-sm text-slate-500">
          <span>© 2026 Horizon Technologies Inc.</span>
          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="transition-colors hover:text-slate-900"
            >
              Privacy
            </Link>
            <Link
              href="/"
              className="font-medium transition-colors hover:text-slate-900"
            >
              Home
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
