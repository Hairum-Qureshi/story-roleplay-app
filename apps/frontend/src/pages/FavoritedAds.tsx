import { useEffect } from "react";
import ProfileAdCard from "../components/ProfileAdCard";
import useRolePlayAds from "../hooks/useRolePlayAds";
import type { RolePlayAd } from "../interfaces";

export default function FavoritedAds() {
	const { likedRolePlayAds } = useRolePlayAds();

	useEffect(() => window.scrollTo(0, 0), []);

	return (
		<div className="min-h-screen bg-slate-950 text-slate-100 p-6">
			<div className="space-y-4 mx-20 mt-10">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold tracking-tight">
						Favorited Role-Playing Ads
					</h1>
					<p className="text-sm text-slate-400 mt-1">
						Ads you've saved from the feed appear here.
					</p>
				</div>

				{/* Empty State */}
				{!likedRolePlayAds?.length ? (
					<div className="flex flex-col items-center justify-center py-24 w-full text-center">
						<div className="mb-4 rounded-full bg-slate-800 px-4 py-2 text-xs text-slate-400">
							No favorites yet
						</div>
						<p className="text-slate-300 font-medium text-lg">
							You haven't favorited any RP ads
						</p>
						<p className="text-sm text-slate-500 mt-2 max-w-xs">
							Favorite ads from the feed to see them here for easy access.
						</p>
					</div>
				) : (
					<div className="grid gap-6 md:grid-cols-2">
						{likedRolePlayAds?.map((ad: RolePlayAd) => (
							<ProfileAdCard key={ad._id} ad={ad} showButton showLikeButton />
						))}
					</div>
				)}
			</div>
		</div>
	);
}
