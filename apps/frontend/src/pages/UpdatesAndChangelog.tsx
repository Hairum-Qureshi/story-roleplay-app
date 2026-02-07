import PlannedFeaturesCard from "../components/PlannedFeaturesCard";
import UpdateCard from "../components/UpdateCard";

export default function UpdatesAndChangelog() {
	return (
		<div className="min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-200 px-6 py-10">
			<div className="mx-auto max-w-4xl space-y-10">
				{/* Header */}
				<header className="space-y-2">
					<h1 className="text-3xl font-semibold tracking-tight text-slate-100">
						Updates & Changelog
					</h1>
					<p className="text-slate-400">
						New features, improvements, and what we’re working on next.
					</p>
				</header>

				{/* Latest Updates */}
				<section className="space-y-4">
					<h2 className="text-xl font-medium text-slate-100">Latest Updates</h2>

					<UpdateCard
						heading="New character creation interface"
						timestamp="Oct 5, 2026"
						description="A redesigned character creation flow with more customization options and a streamlined user experience."
					/>
					<UpdateCard
						heading="Improved message generation stability"
						timestamp="Sep 18, 2026"
						description="Reduced generation interruptions during longer role-play sessions and improved recovery when responses fail."
					/>
				</section>

				{/* Planned Features */}
				<section className="space-y-4">
					<h2 className="text-xl font-medium text-slate-100">
						Planned Features
					</h2>

					<ul className="space-y-3">
						<PlannedFeaturesCard
							subheading="Mobile app release"
							description="A native mobile app for iOS and Android, optimized for on-the-go role-playing."
						/>

						<PlannedFeaturesCard
							subheading="Conversation organization tools"
							description="Folders, pinning, and easier navigation for larger role-play libraries."
						/>
					</ul>
				</section>

				{/* Known Issues */}
				<section className="space-y-4">
					<h2 className="text-xl font-medium text-slate-100">Known Issues</h2>

					<div className="rounded-lg border border-slate-800 bg-slate-900/50 p-5 space-y-3">
						<p className="text-sm text-slate-400">
							Some issues are tracked privately for security and stability
							reasons. Below are user-facing problems we’re actively working on.
						</p>

						<ul className="list-disc list-inside space-y-2 text-sm text-slate-400">
							<li>
								Occasional delays when generating responses during peak usage
							</li>
							<li>Rare cases where chat history may take longer to load</li>
							<li>Minor visual glitches on very small screen sizes</li>
						</ul>
					</div>
				</section>
			</div>
		</div>
	);
}
