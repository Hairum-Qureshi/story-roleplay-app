export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex max-w-6xl flex-col px-6 py-16 md:px-8 lg:px-10">
        <div className="mb-8 p-8">
          <div className="mb-5 inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-300">
            Terms & conditions
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-sm font-medium uppercase tracking-[0.24em] text-slate-400">
            Last updated: August 5, 2026
          </p>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Welcome to TaleWeaver. By accessing or using our platform, you agree
            to comply with these Terms of Service and all applicable laws and
            community standards.
          </p>
        </div>

        <div className="space-y-5">
          <section className="p-7">
            <h2 className="text-2xl font-semibold text-white">Eligibility</h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              You must be at least 18 years old to use TaleWeaver. By creating
              an account or using the service, you represent and warrant that
              you are 18 or older and legally able to enter into this agreement.
            </p>
          </section>

          <section className="p-7">
            <h2 className="text-2xl font-semibold text-white">
              Account Responsibility
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              You are responsible for maintaining the confidentiality of your
              account and for all activity that occurs under your account.
              Accounts are created and authenticated through Google or Discord
              sign-in, and you agree to notify us immediately of any
              unauthorized access or use.
            </p>
          </section>

          <section className="p-7">
            <h2 className="text-2xl font-semibold text-white">User Content</h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              You are responsible for all content you submit, publish, share, or
              store on the platform, including character bios, role-play ads,
              messages, and conversation history. You may not post content that
              is illegal, exploitative, harmful, threatening, or otherwise
              prohibited by these terms or our community guidelines. We reserve
              the right to remove or restrict content that violates these rules.
            </p>
          </section>

          <section className="p-7">
            <h2 className="text-2xl font-semibold text-white">
              Prohibited Conduct
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              You agree not to engage in conduct that harms, exploits, harasses,
              or threatens others. This includes doxxing, sharing personal
              information, stalking, coercion, impersonation, fraud, spam,
              unauthorized scraping, or any attempt to bypass platform safety
              measures. Violations may result in warnings, content removal,
              temporary restrictions, or permanent account termination.
            </p>
          </section>

          <section className="p-7">
            <h2 className="text-2xl font-semibold text-white">
              Adult-Only Content
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              TaleWeaver is intended for adult users only. Any content involving
              adult themes, sexual content, or explicit material must be
              created, shared, and consumed responsibly and in accordance with
              these terms, our community guidelines, and applicable law.
            </p>
          </section>

          <section className="p-7">
            <h2 className="text-2xl font-semibold text-white">
              Privacy and Data Handling
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              We collect and process information necessary to operate the
              service, including account details, profile content, messages, and
              technical usage data. Our handling of that information is
              described in our{" "}
              <a
                href="/privacy-policy"
                className="font-semibold text-indigo-300 transition hover:text-indigo-200"
              >
                Privacy Policy
              </a>
              . We take reasonable measures to protect user data, although no
              internet-based service can guarantee complete security.
            </p>
          </section>

          <section className="p-7">
            <h2 className="text-2xl font-semibold text-white">
              Limitation of Liability
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              TaleWeaver is provided "as is" without warranties of any kind. We
              do not guarantee uninterrupted access, error-free operation, or
              the accuracy of user-generated content. We are not liable for
              damages arising from your use of the platform except where
              prohibited by law.
            </p>
          </section>

          <section className="p-7">
            <h2 className="text-2xl font-semibold text-white">
              Modifications to Terms
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              We may update these Terms of Service from time to time. Continued
              use of the platform after changes are posted constitutes
              acceptance of the updated terms.
            </p>
          </section>

          <section className="p-7">
            <h2 className="text-2xl font-semibold text-white">Contact Us</h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              If you have questions about these Terms of Service, please visit
              our{" "}
              <a
                href="/contact"
                className="font-semibold text-indigo-300 transition hover:text-indigo-200"
              >
                contact page
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
