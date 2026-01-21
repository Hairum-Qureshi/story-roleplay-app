export default function About() {
	return (
		<div className="min-h-screen bg-slate-950 text-white relative overflow-hidden flex flex-col">
			<div className="relative flex flex-col px-8 py-20 max-w-5xl mx-auto z-10 space-y-8">
				<h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
					About TaleWeaver
				</h1>
				<p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed">
					TaleWeaver is designed to make collaborative role-playing simple and
					efficient. Unlike traditional role-play sites that can be cluttered
					and overwhelming, TaleWeaver focuses on what matters most: connecting
					you with fellow storytellers quickly and easily.
				</p>
				<p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed">
					Our streamlined interface allows you to post your role-play ads with
					minimal effort. Just create your ad, specify your preferences, and
					wait for replies from interested players. No complicated setups,
					lengthy profiles, or unnecessary distractions—just pure role-playing
					fun.
				</p>
				<p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed">
					Join TaleWeaver today and experience a new way to craft stories
					together, one message at a time.
				</p>
				<p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed">
					We value your privacy. Please take a moment to review our{" "}
					<a
						href="/privacy-policy"
						className="text-sky-400 underline hover:text-sky-500"
					>
						Privacy Policy
					</a>{" "}
					to understand how we protect your information.
				</p>
				<p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed">
					By using TaleWeaver, you agree to our{" "}
					<a
						href="/terms-of-service"
						className="text-sky-400 underline hover:text-sky-500"
					>
						Terms of Service
					</a>
					. Please read them carefully to ensure a safe and enjoyable experience
					for all users.
				</p>
			</div>
		</div>
	);
}
