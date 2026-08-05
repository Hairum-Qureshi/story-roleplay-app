export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex max-w-6xl flex-col px-6 py-16 md:px-8 lg:px-10">
        <div className="mb-8 p-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm font-medium uppercase text-slate-400">
            Last updated: August 5, 2026
          </p>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            This Privacy Policy explains how TaleWeaver collects, uses, stores,
            and protects personal information when you use our platform.
            TaleWeaver is a community platform for creating, discovering, and
            interacting with role-play advertisements, character profiles, and
            related content.
          </p>
        </div>

        <div className="space-y-5">
          <section className="p-7">
            <h2 className="text-2xl font-semibold text-white">
              Information We Collect
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              We collect information that is necessary to provide, operate, and
              improve the service. This may include:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-lg leading-8 text-slate-300">
              <li>
                Account information you provide or authorize through Google or
                Discord sign-in, including your name, email address, profile
                picture, and authentication-related details.
              </li>
              <li>
                Profile and content you create, such as character bios,
                role-play ads, writing preferences, content notes, and other
                descriptive information shared on the platform.
              </li>
              <li>
                Messages, conversations, notifications, and interaction data
                generated while using the app, including chat history and
                communications with other users.
              </li>
            </ul>
          </section>

          <section className="p-7">
            <h2 className="text-2xl font-semibold text-white">
              How We Use Your Information
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              We use your information to provide and improve the platform,
              including to:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-lg leading-8 text-slate-300">
              <li>
                Create and manage your account and authentication session.
              </li>
              <li>
                Display your profile content, ads, and messages to the relevant
                users.
              </li>
              <li>
                Support messaging, inbox activity, role-play discovery, and
                community interaction.
              </li>
              <li>
                Protect the platform from fraud, abuse, or unauthorized access.
              </li>
              <li>
                Analyze usage patterns to improve reliability, performance, and
                user experience.
              </li>
            </ul>
          </section>

          <section className="p-7">
            <h2 className="text-2xl font-semibold text-white">
              How We Share Information
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              TaleWeaver does not sell your personal data for marketing
              purposes. We may share information only as reasonably necessary to
              operate the service, including with:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-lg leading-8 text-slate-300">
              <li>
                Authentication providers such as Google and Discord when you
                sign in.
              </li>
              <li>
                Hosting, storage, or infrastructure providers that support app
                functionality.
              </li>
              <li>
                Legal or regulatory authorities when required by law or to
                protect rights and safety.
              </li>
            </ul>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              Content you voluntarily share publicly or with other users, such
              as role-play ads or profile information, may be visible to other
              users of the platform as part of the service.
            </p>
          </section>

          <section className="p-7">
            <h2 className="text-2xl font-semibold text-white">Data Security</h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              We take reasonable administrative, technical, and organizational
              measures to protect your information from unauthorized access,
              loss, misuse, or disclosure. However, no internet-based service
              can guarantee absolute security, and you should also take
              appropriate steps to protect your account credentials.
            </p>
          </section>

          <section className="p-7">
            <h2 className="text-2xl font-semibold text-white">
              Retention and Your Choices
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              We retain your information for as long as your account remains
              active or as needed to fulfill the purposes described in this
              policy, comply with legal obligations, resolve disputes, and
              enforce agreements. You may update or remove content you have
              created, and you may request account deletion where available
              through the platform or by contacting us directly.
            </p>
          </section>

          <section className="p-7">
            <h2 className="text-2xl font-semibold text-white">
              Children’s Privacy
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              TaleWeaver is not intended for children under the age of 13. We do
              not knowingly collect personal information from children under 13.
              If you believe we have collected such information unintentionally,
              please contact us so we can delete it.
            </p>
          </section>

          <section className="p-7">
            <h2 className="text-2xl font-semibold text-white">Contact Us</h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              If you have questions about this Privacy Policy, your information,
              or your rights under this policy, please visit our{" "}
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
