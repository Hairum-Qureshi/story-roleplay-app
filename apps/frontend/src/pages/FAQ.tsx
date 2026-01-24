export default function FAQ() {
	return (
		<div className="min-h-screen bg-slate-950 text-white">
			<div className="max-w-4xl mx-auto px-6 py-10">
				<h1 className="text-4xl font-bold mb-6">
					Frequently Asked Questions (FAQ)
				</h1>
				<div className="space-y-8">
					<div>
						<h2 className="text-2xl font-semibold mb-2 text-sky-500">
							What is a story role-play?
						</h2>
						<p className="text-lg">
							A story role-play is a collaborative writing activity where two or
							more participants create and develop a fictional narrative by
							taking on the roles of characters within the story. Each
							participant contributes to the storyline by writing from their
							character's perspective, often in a back-and-forth manner, to
							build the plot, dialogue, and character interactions.
						</p>
					</div>
					<div>
						<h2 className="text-2xl font-semibold mb-2 text-sky-500">
							Can I change my username or profile picture?
						</h2>
						<p className="text-lg">
							At this time, usernames are permanent and randomly generated
							during the account creation process. The same goes for profile
							pictures, which are pulled from your Google account and cannot be
							changed within the site. Future updates may include options to
							customize these elements.
						</p>
					</div>
					<div>
						<h2 className="text-2xl font-semibold mb-2 text-sky-500">
							How do I create a role-play ad?
						</h2>
						<p className="text-lg">
							To create a role-play ad, navigate to the "New Ad" page, fill out
							the required fields including title, premise, tags, and
							preferences, and submit your ad for others to see.
						</p>
					</div>
					<div>
						<h2 className="text-2xl font-semibold mb-2 text-sky-500">
							How can I find role-play partners?
						</h2>
						<p className="text-lg">
							You can find role-play partners by browsing the "Role-Play Ads"
							section, using filters to narrow down your search, and reaching
							out to users whose ads interest you.
						</p>
					</div>
					<div>
						<h2 className="text-2xl font-semibold mb-2 text-sky-500">
							Is there a way to manage my conversations?
						</h2>
						<p className="text-lg">
							Yes, you can manage your conversations through the "Inbox" page,
							where you can view ongoing chats, send messages, and organize your
							role-play interactions.
						</p>
					</div>
					<div>
						<h2 className="text-2xl font-semibold mb-2 text-sky-500">
							How do I create a character bio?
						</h2>
						<p className="text-lg">
							To create a character bio, go to the "New Character" page, fill in
							the details about your character including name, appearance,
							personality traits, and background, and save it for future use in
							role-plays.
						</p>
					</div>
					<div>
						<h2 className="text-2xl font-semibold mb-2 text-sky-500">
							Do I have to have a character bio?
						</h2>
						<p className="text-lg">
							No, having a character bio is optional. You can role-play using
							just your imagination, describe your character(s) within the story
							through writing as well; but creating a bio can enhance the
							experience by providing more depth to your character. It also
							depends on the preferences of your role-play partner if their ad
							requires one.
						</p>
					</div>
					<div>
						<h2 className="text-2xl font-semibold mb-2 text-sky-500">
							What does the 'End Role-Play' button do?
						</h2>
						<p className="text-lg">
							The 'End Role-Play' button allows you to conclude the current
							role-play session. This will save the conversation history and is
							a good way to wrap up your role-playing experience if you're done
							your storyline or if you've lost interested and don't have plans
							to continue. Note that this will end the session for both you and
							your role-play partner and you will no longer be able to send any
							more messages.
						</p>
					</div>
					<div>
						<h2 className="text-2xl font-semibold mb-2 text-sky-500">
							Can I undo the 'End Role-Play' button?
						</h2>
						<p className="text-lg">
							No, once you (or your role-play partner) clicks the 'End
							Role-Play' button, the action is permanent and cannot be undone.
							You will need to re-initiate a new role-play session if you wish
							to continue.
						</p>
					</div>
					<div>
						<h2 className="text-2xl font-semibold mb-2 text-sky-500">
							Do messages support markdown?
						</h2>
						<div className="text-lg">
							<p>
								Yes, messages support basic markdown formatting such as bold,
								italics, quotes, and underline. You can use these formatting
								options to enhance your writing and make certain parts of your
								messages stand out.
							</p>
							<ul className="list-disc list-inside mt-2 space-y-1">
								<li>To bold text, wrap it in double asterisks (**bold**).</li>
								<li>For italics, use single asterisks (*italics*).</li>
								<li>For underline, use double underscores (__underline__).</li>
								<li>
									For a blockquote, start the line with a greater-than symbol
									(&gt; quote).
								</li>
							</ul>
						</div>
					</div>
					<div>
						<h2 className="text-2xl font-semibold mb-2 text-sky-500">
							Can I delete a role-play conversation?
						</h2>
						<p className="text-lg">
							Yes, you can delete a role-play conversation from your inbox.
							However, this action is permanent and cannot be undone. Deleting a
							conversation will only remove it from your view; your role-play
							partner will still have access to the chat history unless they
							also choose to delete it. If both parties delete the conversation,
							it will be removed entirely. If the role-play has not ended and
							your partner sends a message, the conversation will reappear in
							your inbox. In order to stop receiving notifications and messages
							from a role-play, you must end the role-play.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
