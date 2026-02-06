export default function CharacterBios() {
	const characterBios = [
		{
			id: "char-1",
			name: "Aeris Vale",
			summary:
				"A former court mage turned fugitive after refusing to serve a tyrannical empire.",
			genre: "Fantasy"
		},
		{
			id: "char-2",
			name: "Nyx Calder",
			summary:
				"A private investigator navigating a cyberpunk city ruled by corporations and secrets.",
			genre: "Sci-Fi"
		}
	];

	return (
		<div className="min-h-screen bg-slate-950 p-6">
			<section className="space-y-4 mx-20 mt-10">
				<h2 className="text-3xl font-bold mb-7 text-slate-200">
					Your Characters
				</h2>
				<div className="grid gap-4 sm:grid-cols-2">
					{characterBios.map(char => (
						<div
							key={char.id}
							className="rounded-lg border border-slate-800 bg-slate-900/60 p-4"
						>
							<h3 className="text-lg font-medium text-slate-100">
								{char.name}
							</h3>

							<p className="mt-1 text-sm text-slate-400 line-clamp-4">
								{char.summary}
							</p>

							<div className="mt-3 text-xs text-blue-400">{char.genre}</div>
							<div className="flex w-full space-x-2 justify-end">
								<button className="rounded-md border border-slate-700 px-3 py-1 text-sm text-slate-200 hover:bg-slate-800 hover:text-blue-300 hover:cursor-pointer">
									Edit
								</button>
								<button className="rounded-md border border-red-800 px-3 py-1 text-sm text-red-400 hover:bg-red-950 hover:cursor-pointer">
									Delete
								</button>
							</div>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
