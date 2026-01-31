import { useCurrentUser } from "../hooks/useCurrentUser";
import useUser from "../hooks/useUser";
import type { CharacterBio, RolePlayAd } from "../interfaces";

export default function Profile() {
	// after a day, your ad is removed from the main feed, however, it's still displayed on your profile page and there will be a button on each of your ads to 'repost' it so it'll appear again in the main feed (that way, you won't have to re-create the ad from scratch)

	const { data: currUserData } = useCurrentUser();
	const { deleteProfile } = useUser();

	return (
		<div className="min-h-screen bg-slate-950 text-slate-100 px-6 py-10">
			<div className="mx-auto max-w-5xl space-y-10">
				{/* USER INFO */}
				<section className="flex items-center gap-6 rounded-lg border border-slate-800 bg-slate-900/60 p-6">
					<img
						src={currUserData?.profilePicture}
						alt="User avatar"
						className="h-24 w-24 rounded-full border border-slate-700 object-cover"
						referrerPolicy="no-referrer"
					/>

					<div className="space-y-1">
						<h1 className="text-2xl font-semibold text-slate-100">
							@{currUserData?.username}
						</h1>
						<h1 className="text-xl font-semibold text-slate-400">
							{currUserData?.firstName} {currUserData?.lastName}
						</h1>

						<p className="text-sm text-slate-400">{currUserData?.email}</p>

						<p className="text-xs italic text-slate-500">
							Your email and full name are only visible to you
						</p>
					</div>
				</section>
				<section className="space-y-4">
					<h2 className="text-xl font-semibold text-slate-200">
						Your Role-play Ads
					</h2>

					<div className="space-y-4">
						{currUserData?.rolePlayAds?.length === 0 ? (
							<p className="text-base text-sky-400 text-center">
								You currently have no active role-play ads
							</p>
						) : (
							currUserData?.rolePlayAds?.map((ad: RolePlayAd) => (
								<div
									key={ad._id}
									className="rounded-lg border border-slate-800 bg-slate-900/60 p-4"
								>
									<h3 className="text-lg font-medium text-slate-100">
										{ad.title}
									</h3>

									<p className="mt-1 text-sm text-slate-400">
										{"No description provided."}
									</p>

									<div className="mt-4 flex gap-3">
										<button className="rounded-md border border-slate-700 px-3 py-1 text-sm text-slate-200 hover:bg-slate-800 hover:text-blue-300 hover:cursor-pointer">
											Repost
										</button>

										<button className="rounded-md border border-slate-700 px-3 py-1 text-sm text-slate-200 hover:bg-slate-800 hover:text-blue-300 hover:cursor-pointer">
											Edit
										</button>

										<button className="rounded-md border border-red-800 px-3 py-1 text-sm text-red-400 hover:bg-red-950 hover:cursor-pointer">
											Delete
										</button>
									</div>
								</div>
							))
						)}
					</div>
				</section>
				<section className="space-y-4">
					<h2 className="text-xl font-semibold text-slate-200">
						Your Characters
					</h2>
					<div
						className={`${currUserData?.characterBios?.length !== 0 ? "grid gap-4 sm:grid-cols-2" : "w-full"}`}
					>
						{currUserData?.characterBios?.length === 0 ? (
							<p className="text-base text-sky-400 text-center">
								You currently have no character bios
							</p>
						) : (
							currUserData?.characterBios?.map((char: CharacterBio) => (
								<div
									key={char._id}
									className="rounded-lg border border-slate-800 bg-slate-900/60 p-4"
								>
									<h3 className="text-lg font-medium text-slate-100">
										{char.name}
									</h3>

									<p className="mt-1 text-sm text-slate-400 line-clamp-4">
										{char?.summary || "No summary provided."}
									</p>

									<div className="mt-3 text-xs text-blue-400">
										{char?.genre || "No genre provided."}
									</div>
									<div className="flex w-full space-x-2 justify-end">
										<button className="rounded-md border border-slate-700 px-3 py-1 text-sm text-slate-200 hover:bg-slate-800 hover:text-blue-300 hover:cursor-pointer">
											Edit
										</button>
										<button className="rounded-md border border-red-800 px-3 py-1 text-sm text-red-400 hover:bg-red-950 hover:cursor-pointer">
											Delete
										</button>
									</div>
								</div>
							))
						)}
					</div>
				</section>
				<section className="space-y-4">
					<h2 className="text-xl font-semibold text-slate-200">
						Account Deletion
					</h2>
					<p className="text-sm text-slate-400">
						Deleting your account will remove all your data from our servers,
						including your role-play ads and character bios. This action is
						irreversible. Please ensure you have downloaded any role-plays you
						want to keep.
					</p>
					<button
						className="rounded-md border border-red-800 bg-red-700/20 px-4 py-2 text-sm text-red-400 hover:bg-red-950 hover:cursor-pointer"
						onClick={deleteProfile}
					>
						Delete Account
					</button>
				</section>
			</div>
		</div>
	);
}
