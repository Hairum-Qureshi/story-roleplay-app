import PlannedFeaturesCard from "../components/PlannedFeaturesCard";
import UpdateCard from "../components/UpdateCard";
import planned from ".././utils/planned.json";
import updates from ".././utils/updates.json";
import type { PlannedFeature, Update } from "../interfaces";

export default function UpdatesAndChangelog() {
	const plannedFeatures: PlannedFeature[] = planned;
	const updatesToShow: Update[] = updates;

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

					{updatesToShow.length > 0 ? (
						<ul className="space-y-3">
							{updatesToShow.map(update => (
								<UpdateCard
									key={update.id}
									heading={update.heading}
									timestamp={update.timestamp}
									description={update.description}
								/>
							))}
						</ul>
					) : (
						<p className="text-slate-400">No updates available.</p>
					)}
				</section>

				{/* Planned Features */}
				<section className="space-y-4">
					<h2 className="text-xl font-medium text-slate-100">
						Planned Features
					</h2>

					<ul className="space-y-3">
						{plannedFeatures.map(feature => (
							<PlannedFeaturesCard
								key={feature.id}
								subheading={feature.subheading}
								description={feature.description}
							/>
						))}
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
