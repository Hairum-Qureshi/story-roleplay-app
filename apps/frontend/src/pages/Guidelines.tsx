export default function Guidelines() {
	return (
		<div className="h-[calc(100vh-4rem)] overflow-y-auto bg-slate-950 text-slate-200 px-6 py-10">
			<div className="mx-auto max-w-4xl space-y-10">
				<header className="space-y-3">
					<h1 className="text-3xl font-semibold text-slate-100">
						Community Guidelines
					</h1>
					<p className="text-slate-400 leading-relaxed">
						This is a collaborative storytelling space. Every message shapes the
						world we build together. These guidelines exist to protect
						creativity, consent, and safety — without flattening imagination.
					</p>
				</header>

				<section className="space-y-4">
					<h2 className="text-xl font-medium text-blue-300">
						What's Encouraged
					</h2>
					<ul className="list-disc list-inside space-y-2 text-slate-300">
						<li>
							Original fictional storytelling and role-play in any genre or
							setting.
						</li>
						<li>
							Complex characters, emotional depth, moral ambiguity, and flawed
							heroes.
						</li>
						<li>
							Fantasy, sci-fi, horror, romance, drama, slice-of-life, and
							experimental narratives.
						</li>
						<li>
							Consensual character interactions, including conflict, rivalry,
							and romance.
						</li>
						<li>
							World-building, lore creation, and long-form narrative arcs.
						</li>
						<li>
							Respectful collaboration — building <em>with</em> your partner,
							not over them.
						</li>
					</ul>
				</section>

				<section className="space-y-4">
					<h2 className="text-xl font-medium text-blue-300">
						Out-of-Character & Casual Chat
					</h2>
					<p className="text-slate-400 leading-relaxed">
						This app is designed primarily for role-play and storytelling. While
						nothing technically prevents users from chatting casually or
						speaking out of character, it's not the intended use of private
						chats or story threads.
					</p>
					<ul className="list-disc list-inside space-y-2 text-slate-300">
						<li>
							Brief out-of-character messages for coordination or clarification
							are normal.
						</li>
						<li>
							Extended casual conversation, social DMs, or “just chatting” is
							discouraged.
						</li>
						<li>
							Private chats are not moderated as social spaces and are not
							optimized for that purpose.
						</li>
						<li>
							Please refrain from sharing personal information, making plans to
							meet in real life, or engaging in non-story-related conversations
							that could lead to harassment or safety issues.
						</li>
					</ul>
					<p className="text-slate-500">
						This is not something that can or will be strictly enforced. The
						expectation is that users respect the spirit of the platform and use
						it accordingly.
					</p>
				</section>

				<section className="space-y-4">
					<h2 className="text-xl font-medium text-blue-300">
						Allowed With Clear Consent
					</h2>
					<p className="text-slate-400">
						The following content is allowed only when{" "}
						<strong>all participants explicitly agree</strong>
						to it within the role-play context.
					</p>
					<ul className="list-disc list-inside space-y-2 text-slate-300">
						<li>Dark themes (violence, trauma, psychological distress).</li>
						<li>Romantic or intimate scenes between adult characters.</li>
						<li>
							Horror elements, including fear, suspense, and supernatural
							threats.
						</li>
						<li>
							Power dynamics that are fictional and consensual within the story.
						</li>
						<li>Character death, loss, or irreversible consequences.</li>
					</ul>
				</section>

				<section className="space-y-4">
					<h2 className="text-xl font-medium text-blue-300">Not Allowed</h2>
					<ul className="list-disc list-inside space-y-2 text-slate-300">
						<li>
							Sexual content involving minors, even in fictional or “aged-up”
							scenarios.
						</li>
						<li>
							Non-consensual sexual acts or coercion presented for
							gratification.
						</li>
						<li>Graphic sexual violence or fetishized abuse.</li>
						<li>
							Hate speech, slurs, or dehumanization targeting real-world groups.
						</li>
						<li>
							Extremist propaganda or glorification of real-world violence.
						</li>
						<li>
							Instructions or role-play focused on real-world criminal activity.
						</li>
						<li>Harassment, stalking, or attempts to pressure other users.</li>
						<li>
							Using role-play to bypass platform safeguards or moderation.
						</li>
					</ul>
				</section>

				<section className="space-y-4">
					<h2 className="text-xl font-medium text-blue-300">
						Consent & Boundaries
					</h2>
					<ul className="list-disc list-inside space-y-2 text-slate-300">
						<li>
							Consent can be withdrawn at any time — immediately and without
							explanation.
						</li>
						<li>
							Out-of-character boundaries must be respected, even if they
							disrupt the story.
						</li>
						<li>
							Do not assume consent based on genre, tone, or past interactions.
						</li>
						<li>When unsure, ask out of character before escalating themes.</li>
					</ul>
				</section>

				<section className="space-y-4">
					<h2 className="text-xl font-medium text-blue-300">
						Conversation Exports & PDFs
					</h2>
					<p className="text-slate-400 leading-relaxed">
						Private conversations can be exported as a PDF for personal
						reference, archival, or offline reading. This feature exists to
						support long-form storytelling and reflection — not redistribution.
					</p>

					<ul className="list-disc list-inside space-y-2 text-slate-300">
						<li>Exports are intended for personal use only.</li>
						<li>
							Sharing or reposting private conversations without consent may
							cause harm.
						</li>
						<li>
							Context matters — exported content can be easily misrepresented
							outside the app.
						</li>
						<li>
							Possessing an export does not imply ownership over the other
							participant's writing.
						</li>
						<li>
							Once exported, content exists outside the platform’s control and
							safeguards.
						</li>
					</ul>

					<p className="text-slate-500">
						Abuse of this feature — including harassment, doxxing, or
						non-consensual sharing — may result in moderation action, even if
						the content itself was originally allowed.
					</p>
				</section>

				<section className="space-y-4">
					<h2 className="text-xl font-medium text-blue-300">Enforcement</h2>
					<p className="text-slate-400 leading-relaxed">
						Content may be reviewed if reported or flagged. Violations can
						result in content removal, warnings, temporary restrictions, or
						permanent bans depending on severity and pattern of behavior.
					</p>
					<p className="text-slate-500">
						Moderation exists to protect the community — not to police
						creativity.
					</p>
				</section>

				<footer className="pt-6 border-t border-slate-800 text-slate-500 text-sm">
					Stories thrive where trust exists. Write boldly. Respect deeply.
				</footer>
			</div>
		</div>
	);
}
