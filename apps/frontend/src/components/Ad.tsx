import { useCurrentUser } from "../hooks/useCurrentUser";
import useRolePlayChat from "../hooks/useRolePlayChat";
import type { AdProps } from "../interfaces";
import moment from "moment";
import { FaHeart } from "react-icons/fa";

export default function Ad({ hideButton = false, rolePlayAd }: AdProps) {
	const {
		title,
		pov,
		adultRoleplay,
		premise,
		writingExpectations,
		contentNotes,
		author,
		createdAt
	} = rolePlayAd;

	const formattedDate = new Date(createdAt).toLocaleDateString(undefined, {
		month: "short",
		day: "numeric",
		year: "numeric"
	});

	const { data: currUserData } = useCurrentUser();

	const { createConversation } = useRolePlayChat();

	return (
		<article className="w-full max-w-4xl mx-auto rounded-xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 shadow-lg mb-8">
			<header className="p-6 border-b border-slate-800 space-y-3">
				<h2 className="text-2xl font-bold text-zinc-100 leading-tight">
					{title}
				</h2>
				<div className="flex flex-wrap items-center gap-2 text-sm text-zinc-400">
					<span>
						Posted by <span className="text-sky-400">{author.username}</span>
					</span>
					<span className="text-zinc-600">•</span>
					<span>{moment(createdAt).fromNow()}</span>
				</div>
				<div className="flex flex-wrap gap-2 pt-2">
					<span className="px-3 py-1 rounded-full bg-sky-900/50 text-sky-300 text-xs font-medium">
						{String(pov)}
					</span>

					{adultRoleplay && (
						<span className="px-3 py-1 rounded-full bg-red-900/40 text-red-300 text-xs font-medium">
							18+ Only
						</span>
					)}
				</div>
			</header>
			<section className="p-6 space-y-6">
				<div className="space-y-2">
					<h3 className="text-lg font-semibold text-zinc-200">Premise</h3>
					<p className="text-zinc-300 leading-relaxed whitespace-pre-line">
						{premise}
					</p>
				</div>
				{writingExpectations.length > 0 && (
					<div className="space-y-2">
						<h3 className="text-lg font-semibold text-zinc-200">
							Writing Expectations
						</h3>
						<ul className="grid gap-2 sm:grid-cols-2 text-zinc-300">
							{writingExpectations?.map((expectation, i) => (
								<li key={i} className="flex items-start gap-2">
									<span className="flex items-center gap-2">
										<span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400" />
										<span>{expectation}</span>
									</span>
								</li>
							))}
						</ul>
					</div>
				)}
				{contentNotes && (
					<div className="space-y-2">
						<h3 className="text-lg font-semibold text-zinc-200">
							Content Notes
						</h3>
						<p className="text-zinc-300 leading-relaxed whitespace-pre-line">
							{contentNotes}
						</p>
					</div>
				)}
			</section>
			<footer className="px-6 py-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<span className="text-sm text-zinc-500">
					Last updated {formattedDate}
				</span>
				{!hideButton && (
					<div className="flex flex-wrap gap-3">
						{!currUserData ||
							(currUserData?._id !== author._id && (
								<>
									<button
										className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 transition hover:cursor-pointer"
										onClick={() => {
											createConversation(rolePlayAd._id);
										}}
									>
										Respond to Ad
									</button>
									<button
										className="inline-flex items-center justify-center rounded-lg bg-red-600 px-3 py-2.5 text-lg font-semibold text-white hover:bg-red-500 transition hover:cursor-pointer"
										onClick={() => alert("Feature coming soon!")}
									>
										<FaHeart />
									</button>
								</>
							))}
					</div>
				)}
			</footer>
		</article>
	);
}
