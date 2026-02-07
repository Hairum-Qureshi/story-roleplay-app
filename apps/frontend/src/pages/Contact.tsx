import { useCurrentUser } from "../hooks/useCurrentUser";

export default function Contact() {
	const { data: currUser } = useCurrentUser();

	return (
		<div className="relative h-[calc(100vh-4rem)] bg-slate-950 overflow-hidden">
			{/* Subtle background glow */}
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
							<span className="text-sky-600">support@taleweaver.com</span>
						</div>

						<div className="border-t border-slate-800 pt-4 text-sm text-red-700">
							<p>
								Inappropriate or abusive messages will not receive a response
								and may result in an account ban.
							</p>
						</div>
					</div>

					{/* Right side: message composer */}
					<div className="relative">
						<div className="absolute inset-0 rounded-xl bg-gradient-to-b from-slate-900/60 to-slate-950/60" />

						<form className="relative p-8 space-y-6">
							{/* Sender context */}
							<div className="rounded-md border border-slate-800 bg-slate-900/60 px-4 py-3">
								<p className="text-xs uppercase tracking-wide text-slate-500">
									From
								</p>
								<p className="text-sm text-slate-200 flex items-center">
									{currUser?.firstName} {currUser?.lastName}
									<span className="text-slate-500 mx-2">
										{" "}
										({currUser?.email})
									</span>
								</p>
							</div>

							{/* Subject */}
							<div>
								<label className="block text-xs uppercase tracking-wide text-slate-500 mb-1">
									Subject (optional)
								</label>
								<input
									type="text"
									placeholder="Bug report, feedback, idea…"
									className="w-full bg-slate-900/50 border border-slate-800 rounded-md px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-900"
								/>
							</div>

							{/* Message */}
							<div>
								<label className="block text-sm text-slate-300 mb-2">
									Message
								</label>
								<textarea
									rows={6}
									placeholder="Write your message here..."
									className="w-full bg-slate-900/70 border border-slate-800 rounded-md px-4 py-3 text-slate-100 placeholder-slate-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-900"
								/>
							</div>

							{/* Submit */}
							<div className="pt-4 border-t border-slate-800 flex items-center justify-between">
								<p className="text-xs text-slate-500">
									Please keep messages respectful.
								</p>

								<button
									type="submit"
									className="rounded-md bg-blue-900/80 hover:bg-blue-900 px-6 py-2 text-slate-100 font-medium transition hover:cursor-pointer"
								>
									Send message
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
