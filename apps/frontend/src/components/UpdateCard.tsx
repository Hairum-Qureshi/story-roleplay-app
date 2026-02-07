export default function UpdateCard({
	heading,
	timestamp,
	description
}: {
	heading: string;
	timestamp: string;
	description: string;
}) {
	return (
		<div className="rounded-lg border border-slate-800 bg-slate-900/60 p-5 space-y-3">
			<div className="flex items-center justify-between">
				<span className="font-medium text-slate-200">{heading}</span>
				<span className="text-sm text-slate-500">{timestamp}</span>
			</div>
			<p className="text-slate-400 text-sm">{description}</p>
		</div>
	);
}
