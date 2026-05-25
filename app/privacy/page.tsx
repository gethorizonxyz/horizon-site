import type { Metadata } from "next";
import Link from "next/link";
import { HorizonLogo } from "../components/HorizonLogo";

export const metadata: Metadata = {
  title: "Privacy Policy — Horizon",
  description: "How Horizon collects, uses, and protects your information.",
  robots: { index: false, follow: false },
};

const EFFECTIVE_DATE = "11 May 2026";
const LAST_UPDATED = "11 May 2026";

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
              This Privacy Policy explains how Horizon Technologies Inc.
              (&ldquo;Horizon&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;,
              or &ldquo;our&rdquo;), a Delaware corporation with offices at
              501 Folsom St, San Francisco, CA 94105, collects, uses,
              discloses, and safeguards your information when you visit our
              website at gethorizon.xyz (the &ldquo;Website&rdquo;), sign up
              for our waitlist, interact with our marketing on third-party
              platforms (including LinkedIn, X, and Google), or otherwise
              communicate with us.
            </p>
            <p className="mt-4">
              Please read this Privacy Policy carefully. By using our Website
              or providing your information to us, you confirm that you have
              read, understood, and consent to the practices described in this
              Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium tracking-tight text-slate-900">
              2. Information We Collect
            </h2>

            <h3 className="mt-6 text-lg font-medium tracking-tight text-slate-900">
              2.1 Information You Provide Directly
            </h3>
            <p className="mt-3">
              We collect information you provide when you sign up for our
              waitlist, fill out forms (including LinkedIn Lead Generation
              Forms), subscribe to communications, or contact us. This may
              include:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 marker:text-slate-400">
              <li>Full name</li>
              <li>Email address</li>
              <li>Company or organization name</li>
              <li>Job title or role</li>
              <li>Country of operation or residence</li>
              <li>
                Responses to qualifying questions (for example, business type
                or category)
              </li>
              <li>Any other information you choose to share with us</li>
            </ul>

            <h3 className="mt-8 text-lg font-medium tracking-tight text-slate-900">
              2.2 Information Collected Automatically
            </h3>
            <p className="mt-3">
              When you visit our Website, we automatically collect certain
              technical information, including:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 marker:text-slate-400">
              <li>IP address and approximate location</li>
              <li>Device type, operating system, and browser type</li>
              <li>Pages visited, referring URLs, and time spent on pages</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h3 className="mt-8 text-lg font-medium tracking-tight text-slate-900">
              2.3 Information From Third Parties
            </h3>
            <p className="mt-3">
              When you interact with our advertisements on third-party
              platforms such as LinkedIn, X (formerly Twitter), or Google,
              those platforms may share information with us, including profile
              information, engagement data, and aggregated audience insights,
              in accordance with their respective privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium tracking-tight text-slate-900">
              3. How We Use Your Information
            </h2>
            <p className="mt-4">We use the information we collect to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6 marker:text-slate-400">
              <li>Manage and respond to your waitlist signup or inquiry</li>
              <li>
                Send you product updates, news, and early access information
              </li>
              <li>Operate, maintain, and improve our Website and services</li>
              <li>Analyze website usage and marketing performance</li>
              <li>Personalize your experience and communications</li>
              <li>
                Detect, prevent, and address technical issues, fraud, or abuse
              </li>
              <li>Comply with applicable laws, regulations, and lawful requests</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-medium tracking-tight text-slate-900">
              4. Legal Basis for Processing (GDPR)
            </h2>
            <p className="mt-4">
              If you are located in the European Economic Area (EEA), United
              Kingdom, or Switzerland, our processing of your personal data is
              based on one or more of the following legal grounds:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 marker:text-slate-400">
              <li>
                <span className="font-medium text-slate-900">Consent</span>{" "}
                (Art. 6(1)(a) GDPR): for waitlist signups, marketing emails,
                and optional analytics or advertising cookies.
              </li>
              <li>
                <span className="font-medium text-slate-900">
                  Legitimate interest
                </span>{" "}
                (Art. 6(1)(f) GDPR): for website analytics, service
                improvement, security, and direct marketing of similar
                products to existing contacts.
              </li>
              <li>
                <span className="font-medium text-slate-900">
                  Legal obligation
                </span>{" "}
                (Art. 6(1)(c) GDPR): for compliance with tax, accounting, and
                other legal requirements.
              </li>
              <li>
                <span className="font-medium text-slate-900">
                  Contractual necessity
                </span>{" "}
                (Art. 6(1)(b) GDPR): for taking pre-contractual steps at your
                request, such as preparing for product access.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-medium tracking-tight text-slate-900">
              5. How We Share Your Information
            </h2>
            <p className="mt-4">
              We do not sell your personal information. We share information
              only as described below:
            </p>

            <h3 className="mt-6 text-lg font-medium tracking-tight text-slate-900">
              5.1 Service Providers
            </h3>
            <p className="mt-3">
              We use trusted third-party service providers to help us operate,
              including email service providers, hosting providers, customer
              relationship management tools, and analytics providers. These
              providers process data on our behalf under strict confidentiality
              and data processing agreements.
            </p>

            <h3 className="mt-6 text-lg font-medium tracking-tight text-slate-900">
              5.2 Advertising Platforms
            </h3>
            <p className="mt-3">
              We work with advertising platforms including LinkedIn, X, and
              Google Ads to deliver and measure our advertising campaigns.
              These platforms may receive limited information for the purposes
              of campaign measurement, attribution, and lookalike audience
              generation, subject to their own privacy policies.
            </p>

            <h3 className="mt-6 text-lg font-medium tracking-tight text-slate-900">
              5.3 Legal Requirements
            </h3>
            <p className="mt-3">
              We may disclose information when required by law, court order,
              or governmental request, or where necessary to protect our
              rights, property, or safety, or that of our users or the public.
            </p>

            <h3 className="mt-6 text-lg font-medium tracking-tight text-slate-900">
              5.4 Business Transfers
            </h3>
            <p className="mt-3">
              In the event of a merger, acquisition, financing, or sale of
              assets, your information may be transferred as part of the
              transaction. We will notify you of any change in ownership or
              use of your personal data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium tracking-tight text-slate-900">
              6. Data Retention
            </h2>
            <p className="mt-4">
              We retain your personal data only as long as necessary for the
              purposes set out in this Policy or as required by applicable
              law:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 marker:text-slate-400">
              <li>
                <span className="font-medium text-slate-900">
                  Waitlist data:
                </span>{" "}
                until product launches plus twenty-four (24) months thereafter,
                or until you unsubscribe, whichever is earlier.
              </li>
              <li>
                <span className="font-medium text-slate-900">
                  Marketing communications:
                </span>{" "}
                until you withdraw consent or unsubscribe.
              </li>
              <li>
                <span className="font-medium text-slate-900">
                  Website analytics:
                </span>{" "}
                up to twenty-six (26) months, in line with our analytics
                provider&apos;s default retention.
              </li>
              <li>
                <span className="font-medium text-slate-900">
                  Legal records:
                </span>{" "}
                for the period required by applicable tax, commercial, or
                other laws (typically six to ten years).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-medium tracking-tight text-slate-900">
              7. International Data Transfers
            </h2>
            <p className="mt-4">
              Some of our service providers and advertising platforms are
              located outside the European Economic Area, including in the
              United States. When we transfer personal data outside the EEA,
              we ensure appropriate safeguards are in place, such as the
              European Commission&apos;s Standard Contractual Clauses,
              adequacy decisions, or other legally recognized mechanisms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium tracking-tight text-slate-900">
              8. Your Rights Under GDPR
            </h2>
            <p className="mt-4">
              If you are located in the EEA, United Kingdom, or Switzerland,
              you have the following rights regarding your personal data:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 marker:text-slate-400">
              <li>
                <span className="font-medium text-slate-900">
                  Right of access
                </span>{" "}
                (Art. 15 GDPR): obtain confirmation of whether we process your
                data and request a copy.
              </li>
              <li>
                <span className="font-medium text-slate-900">
                  Right to rectification
                </span>{" "}
                (Art. 16 GDPR): correct inaccurate or incomplete data.
              </li>
              <li>
                <span className="font-medium text-slate-900">
                  Right to erasure
                </span>{" "}
                (Art. 17 GDPR): request deletion of your personal data.
              </li>
              <li>
                <span className="font-medium text-slate-900">
                  Right to restriction
                </span>{" "}
                (Art. 18 GDPR): request that we limit the processing of your
                data.
              </li>
              <li>
                <span className="font-medium text-slate-900">
                  Right to data portability
                </span>{" "}
                (Art. 20 GDPR): receive your data in a structured,
                machine-readable format.
              </li>
              <li>
                <span className="font-medium text-slate-900">
                  Right to object
                </span>{" "}
                (Art. 21 GDPR): object to processing based on legitimate
                interest or for direct marketing.
              </li>
              <li>
                <span className="font-medium text-slate-900">
                  Right to withdraw consent
                </span>{" "}
                (Art. 7 GDPR): withdraw consent at any time without affecting
                prior lawful processing.
              </li>
              <li>
                <span className="font-medium text-slate-900">
                  Right to lodge a complaint
                </span>{" "}
                (Art. 77 GDPR): file a complaint with a supervisory authority.
              </li>
            </ul>
            <p className="mt-4">
              To exercise any of these rights, please contact us at{" "}
              <a
                href="mailto:privacy@gethorizon.xyz"
                className="font-medium text-cobalt-deep underline decoration-cobalt-deep/40 underline-offset-4 transition-colors hover:decoration-cobalt-deep"
              >
                privacy@gethorizon.xyz
              </a>
              . We will respond within one month, subject to extensions
              permitted under applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium tracking-tight text-slate-900">
              9. Security
            </h2>
            <p className="mt-4">
              We implement appropriate technical and organizational measures
              to protect your personal data against unauthorized access,
              alteration, disclosure, or destruction. These measures include
              encryption of data in transit and at rest, access controls, and
              regular security reviews. However, no method of transmission
              over the Internet or electronic storage is one hundred percent
              secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium tracking-tight text-slate-900">
              10. Cookies and Similar Technologies
            </h2>
            <p className="mt-4">
              Our Website uses cookies and similar tracking technologies to
              function, analyze usage, and support marketing. We use the
              following categories:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 marker:text-slate-400">
              <li>
                <span className="font-medium text-slate-900">
                  Strictly necessary cookies:
                </span>{" "}
                required for the Website to function properly.
              </li>
              <li>
                <span className="font-medium text-slate-900">
                  Analytics cookies:
                </span>{" "}
                help us understand how visitors use the Website (for example,
                via Google Analytics or Plausible).
              </li>
              <li>
                <span className="font-medium text-slate-900">
                  Advertising cookies:
                </span>{" "}
                support measurement and remarketing across LinkedIn, X, and
                Google.
              </li>
            </ul>
            <p className="mt-4">
              You can manage cookie preferences via our cookie banner or your
              browser settings. Disabling certain cookies may affect Website
              functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium tracking-tight text-slate-900">
              11. Children&apos;s Privacy
            </h2>
            <p className="mt-4">
              Our Website and services are intended for users aged 16 and
              above. We do not knowingly collect personal information from
              children under 16. If we become aware that we have collected
              personal data from a child without parental consent, we will
              take steps to delete that information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium tracking-tight text-slate-900">
              12. Changes to This Privacy Policy
            </h2>
            <p className="mt-4">
              We may update this Privacy Policy from time to time. We will
              post the updated Policy on this page and update the &ldquo;Last
              Updated&rdquo; date. Material changes will be communicated to
              you by email or through a prominent notice on the Website. Your
              continued use of our services after the updated Policy becomes
              effective constitutes your acceptance of the changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium tracking-tight text-slate-900">
              13. Contact Us
            </h2>
            <p className="mt-4">
              If you have any questions, concerns, or requests regarding this
              Privacy Policy or our data practices, please contact us at{" "}
              <a
                href="mailto:privacy@gethorizon.xyz"
                className="font-medium text-cobalt-deep underline decoration-cobalt-deep/40 underline-offset-4 transition-colors hover:decoration-cobalt-deep"
              >
                privacy@gethorizon.xyz
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
              href="/terms"
              className="transition-colors hover:text-slate-900"
            >
              Terms
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
