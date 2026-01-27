import Ad from "../components/Ad";
import useRolePlayAds from "../hooks/useRolePlayAds";

export default function Advertisements() {
	const { roleplayAds } = useRolePlayAds();

	return (
		<div className="min-h-screen bg-slate-950 text-white flex justify-center py-8">
			<div className="w-full max-w-4xl px-4 flex flex-col gap-6">
				{/* Search Box */}
				<div className="bg-slate-950 p-4 rounded-md shadow-md border border-sky-700">
					<input
						type="text"
						placeholder="Search..."
						className="w-full p-3 border border-sky-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-900 text-white placeholder-slate-400 transition"
					/>
				</div>

				{/* Ads List */}
				<div className="flex flex-col gap-6">
					{roleplayAds && roleplayAds?.length > 0 ? (
						roleplayAds?.map(ad => <Ad key={ad._id} rolePlayAd={ad} />)
					) : (
						<p className="text-center text-slate-400">
							No advertisements found.
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
