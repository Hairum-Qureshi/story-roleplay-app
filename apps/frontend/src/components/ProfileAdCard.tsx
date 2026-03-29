import { Link } from "react-router-dom";
import type { RolePlayAd } from "../interfaces";
import useRolePlayAds from "../hooks/useRolePlayAds";
import { useCurrentUser } from "../hooks/useCurrentUser";
import useRolePlayChat from "../hooks/useRolePlayChat";
import { FaHeart } from "react-icons/fa";

export default function ProfileAdCard({
	ad,
	showButton = false,
	showLikeButton = false
}: {
	ad: RolePlayAd;
	showButton?: boolean;
	showLikeButton?: boolean;
}) {
	const { repostAd, deleteAdMutate } = useRolePlayAds();
	const { data: currUser } = useCurrentUser();
	const { createConversation } = useRolePlayChat();
	const { unlikeMutate } = useRolePlayAds(ad?._id);

	return (
		<div
			key={ad._id}
			className="flex flex-col h-full rounded-lg border border-slate-800 bg-slate-900/60 p-4"
		>
			<h3 className="text-xl mb-2 font-medium text-slate-100">{ad.title}</h3>

			<h4 className="text-base mt-4 font-semibold text-slate-200">Premise</h4>
			<p className="mt-1 text-sm text-slate-400">{ad.premise}</p>

			<h4 className="text-base mt-4 font-semibold text-slate-200">
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

			{/* BUTTON SECTIONS */}
			{ad.author._id === currUser?._id ? (
				/* ADDED: mt-auto to push this div down */
				<div className="mt-auto pt-4 flex gap-3">
					{ad.canBeReposted ? (
						<button
							onClick={e => {
								e.stopPropagation();
								e.preventDefault();
								repostAd(ad._id);
							}}
							className="rounded-md border border-slate-700 px-3 py-1 text-sm text-slate-200 hover:bg-slate-800 hover:text-sky-300 hover:cursor-pointer"
						>
							Repost
						</button>
					) : (
						<button
							className="rounded-md border border-slate-700 px-3 py-1 text-sm text-slate-500 bg-slate-800 cursor-not-allowed"
							onClick={e => {
								e.stopPropagation();
								e.preventDefault();
							}}
						>
							Reposted
						</button>
					)}

					<Link to={`/role-play-ad/${ad._id}/edit`}>
						<button className="rounded-md border border-slate-700 px-3 py-1 text-sm text-slate-200 hover:bg-slate-800 hover:text-blue-300 hover:cursor-pointer">
							Edit
						</button>
					</Link>

					<button
						className="rounded-md border border-red-800 px-3 py-1 text-sm text-red-400 hover:bg-red-950 hover:cursor-pointer"
						onClick={e => {
							e.stopPropagation();
							e.preventDefault();
							confirm("Are you sure you want to delete this ad?") &&
								deleteAdMutate({ adID: ad._id });
						}}
					>
						Delete
					</button>
					{showLikeButton && (
						<button
							className="rounded-md border bg-red-600 border-red-800 px-3 py-1 text-sm text-white hover:bg-red-950 hover:cursor-pointer"
							onClick={() => unlikeMutate({ adID: ad._id })}
						>
							<FaHeart />
						</button>
					)}
				</div>
			) : (
				showButton && (
					/* ADDED: mt-auto to push this div down */
					<div className="mt-auto pt-4 flex gap-3 items-center">
						<button
							className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500 transition hover:cursor-pointer"
							onClick={() => createConversation(ad._id)}
						>
							Respond to Ad
						</button>
						{showLikeButton && (
							<button
								className="inline-flex items-center justify-center rounded-lg bg-red-600 px-5 py-2 text-lg font-semibold text-white hover:bg-red-500 transition hover:cursor-pointer"
								onClick={() => unlikeMutate({ adID: ad._id })}
							>
								<FaHeart />
							</button>
						)}
					</div>
				)
			)}
		</div>
	);
}
