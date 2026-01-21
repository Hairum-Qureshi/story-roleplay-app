export default function PrivacyPolicy() {
	return (
		<div className="min-h-screen bg-slate-950 text-white relative overflow-hidden flex flex-col">
			<div className="relative flex flex-col px-8 py-20 max-w-5xl mx-auto z-10 space-y-10">
				<div>
					<h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
						Privacy Policy
					</h1>
					<p className="text-slate-400 text-base mt-4 font-light leading-relaxed">
						Last updated: 1/21/2026
					</p>
				</div>
				<p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed">
					At TaleWeaver, your privacy is important to us. This policy explains
					how we collect, use, and protect your information when you use our
					platform.
				</p>

				<section className="space-y-6">
					<h2 className="text-2xl font-semibold text-white">
						Information We Collect
					</h2>
					<p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed">
						We collect information that you provide directly, such as account
						details, role-play ads, and messages. We may also collect technical
						data like IP addresses and browser information to improve your
						experience.
					</p>
				</section>

				<section className="space-y-6">
					<h2 className="text-2xl font-semibold text-white">
						How We Use Your Information
					</h2>
					<p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed">
						Your data is used to provide and maintain the platform, respond to
						your inquiries, and improve our services. We do not sell or share
						your personal data with third parties for marketing purposes.
					</p>
				</section>

				<section className="space-y-6">
					<h2 className="text-2xl font-semibold text-white">Data Security</h2>
					<p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed">
						We take reasonable measures to protect your information from
						unauthorized access, alteration, or disclosure. However, no method
						of transmission over the Internet or electronic storage is
						completely secure.
					</p>
				</section>

				<section className="space-y-6">
					<h2 className="text-2xl font-semibold text-white">Your Choices</h2>
					<p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed">
						You can update your account information, opt-out of certain
						communications, or request deletion of your data by contacting us
						through the platform.
					</p>
				</section>

				<section className="space-y-6">
					<h2 className="text-2xl font-semibold text-white">Contact Us</h2>
					<p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed">
						If you have questions about this Privacy Policy or how your
						information is handled, please reach out to us at{" "}
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
