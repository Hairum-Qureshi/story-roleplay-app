import { Link } from "react-router-dom";
import type { RolePlayAd } from "../interfaces";
import useRolePlayAds from "../hooks/useRolePlayAds";

export default function ProfileAdCard({ ad }: { ad: RolePlayAd }) {
	const { repostAd } = useRolePlayAds();

	return (
		<div
			key={ad._id}
			className="rounded-lg border border-slate-800 bg-slate-900/60 p-4"
		>
			<h3 className="text-lg font-medium text-slate-100">{ad.title}</h3>

			<h4 className="text-base mt-2 font-semibold text-slate-200">Premise</h4>
			<p className="mt-1 text-sm text-slate-400">{ad.premise}</p>

			<h4 className="text-base mt-2 font-semibold text-slate-200">
				Writing Expectations
			</h4>
			{ad.writingExpectations && ad.writingExpectations.length > 0 ? (
				<ul className="mt-1 grid gap-2 sm:grid-cols-2 text-slate-400">
					{ad.writingExpectations.map((expectation, i) => (
						<li key={i} className="flex items-start gap-2">
							<span className="flex items-center gap-2">
								<span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400" />
								<span>{expectation}</span>
							</span>
						</li>
					))}
				</ul>
			) : (
				<p className="mt-1 text-sm text-slate-400">
					No writing expectations provided.
				</p>
			)}

			<div className="mt-4 flex gap-3">
				{ad.canBeReposted ? (
					<button
						onClick={() => repostAd(ad._id)}
						className="rounded-md border border-slate-700 px-3 py-1 text-sm text-slate-200 hover:bg-slate-800 hover:text-sky-300 hover:cursor-pointer"
					>
						Repost
					</button>
				) : (
					<button className="rounded-md border border-slate-700 px-3 py-1 text-sm text-slate-500 bg-slate-800 cursor-not-allowed">
						Reposted
					</button>
				)}

				<Link to={`/role-play-ad/${ad._id}/edit`}>
					<button className="rounded-md border border-slate-700 px-3 py-1 text-sm text-slate-200 hover:bg-slate-800 hover:text-blue-300 hover:cursor-pointer">
						Edit
					</button>
				</Link>

				<button className="rounded-md border border-red-800 px-3 py-1 text-sm text-red-400 hover:bg-red-950 hover:cursor-pointer">
					Delete
				</button>
			</div>
		</div>
	);
}
