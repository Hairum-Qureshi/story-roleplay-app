export default function PlannedFeaturesCard({
	subheading,
	description
}: {
	subheading: string;
	description: string;
}) {
	return (
		<li className="rounded-lg border border-slate-800 bg-slate-900/40 p-4">
			<h3 className="text-slate-300 text-base font-medium">{subheading}</h3>
			<p className="text-sm text-slate-400">{description}</p>
		</li>
	);
}
