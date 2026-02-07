import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<div className="relative flex h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-gradient-to-b from-black via-slate-950 to-black text-slate-200">
			{/* Vignette */}
			<div className="pointer-events-none absolute inset-0 bg-black/40" />

			{/* Subtle background glow */}
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-950/15 blur-3xl" />
				<div className="absolute left-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-indigo-950/15 blur-3xl" />
			</div>

			{/* Content */}
			<div className="relative z-10 max-w-xl px-6 text-center">
				<p className="mb-2 text-sm uppercase tracking-widest text-blue-500/80">
					Error 404
				</p>

				<h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
					This path doesn&apos;t exist
				</h1>

				<p className="mb-8 text-base leading-relaxed text-slate-400">
					You&apos;ve wandered off the map. The story ends here—for now. The
					page you&apos;re looking for was never written, or has faded into the
					dark.
				</p>

				<Link
					to="/"
					className="inline-flex items-center justify-center rounded-md border border-blue-900/70 bg-blue-950/40 px-6 py-3 text-sm font-medium text-blue-200 transition hover:bg-blue-900/60 hover:text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
				>
					Return to the story
				</Link>
			</div>
		</div>
	);
}
