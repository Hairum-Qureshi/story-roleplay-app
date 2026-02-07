import { useCurrentUser } from "../hooks/useCurrentUser";

export default function Contact() {
	const { data: currUser } = useCurrentUser();
	// TODO - will need to update contact in terms and privacy policy page as well

	return (
		<div className="relative h-[calc(100vh-4rem)] bg-slate-950 overflow-hidden">
			{/* subtle background glow */}
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-900/20 blur-3xl" />
				<div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-indigo-900/20 blur-3xl" />
			</div>

			<div className="relative z-10 h-full flex items-center justify-center px-6">
				<div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12">
					{/* Left side: context */}
					<div className="flex flex-col justify-center">
						<h1 className="text-3xl font-semibold text-slate-100">
							Get in touch
						</h1>

						<p className="mt-4 text-slate-400 leading-relaxed">
							This project is still evolving. If something feels off, breaks
							immersion, or you have an idea that would make role-play better, I
							want to hear it.
						</p>
						<div className="mt-8 border-t border-slate-800 py-4 text-sm text-slate-400">
							Email:{" "}
							<span className="text-purple-600">support@taleweaver.com</span>
						</div>
						<div className=" border-t border-slate-800 text-sm text-red-700">
							<p className="pt-4">
								Please note that any inappropriate or abusive messages will not
								receive a response and your account will be banned.
							</p>
						</div>
					</div>

					{/* Right side: form (lightly framed, not boxed) */}
					<div className="relative">
						<div className="absolute inset-0 rounded-xl bg-gradient-to-b from-slate-900/60 to-slate-950/60" />

						<form className="relative p-8 space-y-5">
							<div>
								<label className="block text-sm text-slate-300 mb-1">
									Name
								</label>
								<input
									type="text"
									value={`${currUser?.firstName} ${currUser?.lastName}` || ""}
									disabled={true}
									className="w-full bg-slate-900/70 border border-slate-800 rounded-md px-3 py-2 text-slate-100 focus:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-900"
								/>
							</div>

							<div>
								<label className="block text-sm text-slate-300 mb-1">
									Email
								</label>
								<input
									type="email"
									value={currUser?.email || ""}
									disabled={true}
									className="w-full bg-slate-900/70 border border-slate-800 rounded-md px-3 py-2 text-slate-100 hover:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-900"
								/>
							</div>

							<div>
								<label className="block text-sm text-slate-300 mb-1">
									Message
								</label>
								<textarea
									rows={4}
									className="w-full bg-slate-900/70 border border-slate-800 rounded-md px-3 py-2 text-slate-100 resize-none focus:outline-none focus:ring-2 focus:ring-blue-900"
								/>
							</div>

							<button
								type="submit"
								className="mt-2 w-full rounded-md bg-blue-900/80 hover:bg-blue-900 text-slate-100 py-2 font-medium transition"
							>
								Send message
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
