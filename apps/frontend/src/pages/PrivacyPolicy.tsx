export default function PrivacyPolicy() {
	return (
		<div className="min-h-screen bg-slate-950 text-white relative overflow-hidden flex flex-col">
			<div className="relative flex flex-col px-8 py-20 max-w-5xl mx-auto z-10 space-y-10">
				<div>
					<h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
						Privacy Policy
					</h1>
					<p className="text-slate-400 text-base mt-4 font-light leading-relaxed">
						Last updated: 1/24/2026
					</p>
				</div>
				<p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed">
					At TaleWeaver, your privacy is important to us. This policy explains
					how we collect, use, store, and protect the information you provide
					when using our platform.
				</p>

				<section className="space-y-6">
					<h2 className="text-2xl font-semibold text-white">
						Information We Collect
					</h2>
					<p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed">
						We collect information you provide directly, including:
					</p>
					<ul className="list-disc list-inside text-slate-400 text-lg md:text-xl font-light leading-relaxed">
						<li>
							Account information obtained through Google sign-in, including
							your name, email, and profile picture.
						</li>
						<li>
							Character bios, which may include your character’s name,
							appearance, personality traits, backstory, and age.
						</li>
						<li>
							Role-play ads, capturing details like preferred perspective,
							premise, content notes, and writing expectations.
						</li>
						<li>
							Conversations and messages, including chat history with other
							users and participants in role-play sessions.
						</li>
					</ul>
					<p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed">
						We may also collect technical information automatically, such as IP
						addresses, browser type, and usage data, to maintain and improve
						platform performance.
					</p>
				</section>

				<section className="space-y-6">
					<h2 className="text-2xl font-semibold text-white">
						How We Use Your Information
					</h2>
					<p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed">
						Your data is used to provide and maintain our platform, facilitate
						role-play interactions, and enable communication with other users.
						For example:
					</p>
					<ul className="list-disc list-inside text-slate-400 text-lg md:text-xl font-light leading-relaxed">
						<li>Managing conversations, messages, and chat history.</li>
						<li>
							Displaying your character bios and role-play ads to other users.
						</li>
						<li>
							Allowing you to create, edit, or end role-play sessions safely.
						</li>
						<li>
							Improving user experience based on technical and usage data.
						</li>
					</ul>
					<p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed">
						We do not sell or share your personal data with third parties for
						marketing purposes.
					</p>
				</section>

				<section className="space-y-6">
					<h2 className="text-2xl font-semibold text-white">Data Security</h2>
					<p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed">
						We take reasonable technical and administrative steps to protect
						your information from unauthorized access or disclosure. However, no
						system is completely secure, and we cannot guarantee the absolute
						security of your data.
					</p>
				</section>

				<section className="space-y-6">
					<h2 className="text-2xl font-semibold text-white">Your Choices</h2>
					<p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed">
						Since accounts are created via Google sign-in, changes to your
						Google account may automatically update your TaleWeaver account. You
						can also:
					</p>
					<ul className="list-disc list-inside text-slate-400 text-lg md:text-xl font-light leading-relaxed">
						<li>
							Update your character bios and role-play ads directly in the
							platform.
						</li>
						<li>Delete conversations or end role-play sessions permanently.</li>
						<li>Delete your account</li>
					</ul>
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
