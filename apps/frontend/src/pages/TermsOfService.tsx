export default function TermsOfService() {
	return (
		<div className="min-h-screen bg-slate-950 text-white relative overflow-hidden flex flex-col">
			<div className="relative flex flex-col px-8 py-20 max-w-5xl mx-auto z-10 space-y-10">
				<div>
					<h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
						Terms of Service
					</h1>
					<p className="text-slate-400 text-base mt-4 font-light leading-relaxed">
						Last updated: 1/21/2026
					</p>
				</div>

				<p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed">
					Welcome to TaleWeaver. By accessing or using our platform, you agree
					to comply with and be bound by the following Terms of Service.
				</p>

				<section className="space-y-6">
					<h2 className="text-2xl font-semibold text-white">
						Account Responsibility
					</h2>
					<p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed">
						Users are responsible for maintaining the confidentiality of their
						accounts and passwords. You agree to notify us immediately of any
						unauthorized use of your account.
					</p>
				</section>

				<section className="space-y-6">
					<h2 className="text-2xl font-semibold text-white">Content Rules</h2>
					<p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed">
						You are responsible for the content you post. Content must comply
						with our community guidelines and applicable laws. We reserve the
						right to remove content that violates these rules.
					</p>
				</section>

				<section className="space-y-6">
					<h2 className="text-2xl font-semibold text-white">
						Prohibited Activities
					</h2>
					<p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed">
						Users may not engage in spamming, harassment, hacking, or any
						illegal activities on the platform. Violation of these terms may
						result in suspension or termination of your account.
					</p>
				</section>

				<section className="space-y-6">
					<h2 className="text-2xl font-semibold text-white">
						Limitation of Liability
					</h2>
					<p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed">
						TaleWeaver is provided "as is" without warranties of any kind. We
						are not liable for any damages arising from your use of the
						platform.
					</p>
				</section>

				<section className="space-y-6">
					<h2 className="text-2xl font-semibold text-white">
						Modifications to Terms
					</h2>
					<p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed">
						We may update these Terms of Service from time to time. Users are
						encouraged to review them periodically. Continued use of the
						platform constitutes acceptance of any changes.
					</p>
				</section>

				<section className="space-y-6">
					<h2 className="text-2xl font-semibold text-white">Contact Us</h2>
					<p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed">
						If you have questions about these Terms of Service, please contact
						us at{" "}
						<a
							href="mailto:support@taleweaver.com"
							className="text-indigo-500 hover:underline"
						>
							support@taleweaver.com
						</a>
						.
					</p>
				</section>
			</div>
		</div>
	);
}
