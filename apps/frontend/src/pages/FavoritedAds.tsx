interface RPAd {
	id: number;
	title: string;
	description: string;
	initial: string; // For avatar placeholder
}

const placeholderFavorites: RPAd[] = [
	{
		id: 1,
		title: "Space Pirates RP",
		description:
			"Join a crew of space pirates and explore the galaxy together. Adventure, betrayal, and treasure await.",
		initial: "S"
	},
	{
		id: 2,
		title: "Fantasy Kingdom RP",
		description:
			"Step into a magical kingdom full of dragons, intrigue, and heroic quests. Shape your destiny!",
		initial: "F"
	}
];

export default function FavoritedAds() {
	const favorites = placeholderFavorites; // replace with user favorites from state/api

	return (
		<div className="min-h-screen bg-slate-950 text-slate-100">
			<div className="max-w-5xl mx-auto px-6 py-12">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold tracking-tight">
						Favorited Role-Playing Ads
					</h1>
					<p className="text-sm text-slate-400 mt-1">
						Ads you’ve saved from the feed appear here.
					</p>
				</div>

				{/* Empty State */}
				{favorites.length === 0 ? (
					<div className="rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur">
						<div className="flex flex-col items-center justify-center py-24 text-center">
							<div className="mb-4 rounded-full bg-slate-800 px-4 py-2 text-xs text-slate-400">
								No favorites yet
							</div>
							<p className="text-slate-300 font-medium text-lg">
								You haven’t favorited any RP ads
							</p>
							<p className="text-sm text-slate-500 mt-2 max-w-xs">
								Favorite ads from the feed to see them here for easy access.
							</p>
						</div>
					</div>
				) : (
					<div className="grid gap-6 md:grid-cols-2">
						{favorites.map(ad => (
							<div
								key={ad.id}
								className="flex items-start gap-4 p-4 bg-slate-900/70 rounded-xl border border-slate-800 hover:bg-slate-900/90 transition cursor-pointer"
							>
								<div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
									{ad.initial}
								</div>
								<div className="flex-1">
									<h2 className="font-semibold text-lg">{ad.title}</h2>
									<p className="text-sm text-slate-400 mt-1">
										{ad.description}
									</p>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
