import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export default function FAQ() {
	const sectionRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const hash = window.location.hash;
		if (hash) {
			const element = sectionRef.current?.querySelector(hash);
			if (element) {
				element.scrollIntoView({ behavior: "smooth" });
			}
		}
	}, []);

	const faqSections = [
		{
			title: (
				<HashLink smooth to="#general-questions">
					General Questions
				</HashLink>
			),
			items: [
				{
					question: "What is a story role-play?",
					answer:
						"A story role-play is a collaborative writing activity where two or more participants create and develop a fictional narrative by taking on the roles of characters within the story. Each participant contributes to the storyline by writing from their character's perspective, often in a back-and-forth manner, to build the plot, dialogue, and character interactions."
				},
				{
					question: "Can I have group role-plays with more than 2 people?",
					answer:
						"At this time, the platform only supports one-on-one role-plays. Group role-plays with more than 2 participants are not currently available."
				},
				{
					question:
						"What does the 'Download Conversation History' button do exactly?",
					answer:
						"This button redirects you to a page displaying a PDF of your entire conversation history. You can then download or print this PDF for your records. This is helpful if you would like to read through your entire role-play story you've made with your role-play partner and save it in a readable format. When a role-play has ended, you can still view and access this PDF."
				},
				{
					question: "Do you have plans to make a mobile app?",
					answer:
						"At this time, there are no immediate plans for a mobile app. The platform is currently optimized for desktop use. However, we are working towards making this site fully responsive and accessible on mobile devices."
				},
				{
					question:
						"What kind of content is allowed and not allowed in role-plays?",
					answer: (
						<p>
							Please check out{" "}
							<Link to="/guidelines" className="underline text-yellow-500">
								our guidelines
							</Link>
						</p>
					)
				}
			]
		},
		{
			title: (
				<HashLink smooth to="#account-related">
					Account Related
				</HashLink>
			),
			items: [
				{
					question: "Are profiles public?",
					answer:
						"At this time, profiles are not currently public. This may change in the future."
				},
				{
					question: "Can I change my username or profile picture?",
					answer:
						"Usernames are permanent and randomly generated during account creation. Profile pictures are pulled from your Google account and cannot be changed within the site. Future updates may include options to customize these elements."
				}
			]
		},
		{
			title: (
				<HashLink smooth to="#role-play-management">
					Role-Play Management
				</HashLink>
			),
			items: [
				{
					question: "How do I create a role-play ad?",
					answer:
						"Navigate to the 'New Ad' page, fill out the required fields including title, premise, tags, and preferences, and submit your ad for others to see."
				},
				{
					question: "How can I find role-play partners?",
					answer:
						"Browse the 'Role-Play Ads' section, use filters to narrow down your search, and reach out to users whose ads interest you."
				},
				{
					question: "Is there a way to manage my conversations?",
					answer:
						"You can manage conversations through the 'Inbox' page, where you can view ongoing chats, send messages, and organize your role-play interactions."
				},
				{
					question: "What does the 'End Role-Play' button do?",
					answer:
						"This button concludes the current role-play session, saving the conversation history. The session ends for both participants and no further messages can be sent."
				},
				{
					question: "Can I undo the 'End Role-Play' button?",
					answer:
						"No. Once pressed, the action is permanent. A new role-play session must be initiated to continue."
				}
			]
		},
		{
			title: (
				<HashLink smooth to="#character-bios">
					Character Bios
				</HashLink>
			),
			items: [
				{
					question: "How do I create a character bio?",
					answer:
						"Go to the 'New Character' page, fill in details about your character including name, appearance, personality traits, and background, and save it for future role-plays."
				},
				{
					question: "Do I have to have a character bio?",
					answer:
						"No, character bios are optional. You can role-play using imagination alone, but bios provide depth and may be required by some role-play partners."
				}
			]
		},
		{
			title: (
				<HashLink smooth to="#ads">
					Ads
				</HashLink>
			),
			items: [
				{
					question: "How long do my role-play ads last on the site?",
					answer:
						"Ads remain active on the main feed for 1 hour. They are still accessible through your profile, where you can repost, edit, or delete them. Once you repost an ad, you will need to wait another hour before reposting that same ad again."
				},
				{
					question: "Can I save role-play ads to revisit later?",
					answer:
						"You can save ads by clicking the heart icon. Favorited ads are accessible from the 'Favorited Ads' page. Note that deleted ads will no longer be accessible."
				},
				{
					question:
						"What happens if I have an ongoing role-play with an ad that gets deleted?",
					answer:
						"The conversation remains accessible in your inbox, but the role-play ends as if the 'End Role-Play' button was pressed."
				},
				{
					question:
						"Can I tag my role-play ads with specific themes or genres?",
					answer:
						"At this time, tagging is not supported. Future updates may include the ability to add tags for better ad discoverability."
				}
			]
		},
		{
			title: (
				<HashLink smooth to="#messaging">
					Messaging
				</HashLink>
			),
			items: [
				{
					question: "Do messages support markdown?",
					answer: (
						<div>
							<p>
								Yes, basic markdown formatting such as bold, italics, quotes,
								and underline is supported:
							</p>
							<ul className="list-disc list-inside mt-2 space-y-1">
								<li>
									Bold: <code>**bold**</code>
								</li>
								<li>
									Italics: <code>*italics*</code>
								</li>
								<li>
									Underline: <code>__underline__</code>
								</li>
								<li>
									Blockquote: <code>&gt; quote</code>
								</li>
							</ul>
						</div>
					)
				},
				{
					question: "Can I delete a role-play conversation?",
					answer:
						"You can delete conversations from your inbox. This is permanent and only removes it from your view. Your partner will still have access unless they delete it as well. If, however, your partner sends a new message in the deleted conversation, it will reappear in your inbox. The only way to stop receiving messages from the conversation is by ending the role-play."
				},
				{
					question: "Are images and links supported in messages?",
					answer:
						"Images are not supported. Links are supported but not clickable; users need to copy and paste URLs into their browser. Be cautious when opening links from users you don't know. It's preferred to share character bios and ad details within the platform rather than external links."
				},
				{
					question: "Are my chats private?",
					answer:
						"Yes, all role-play conversations are private between the participants. However, please be aware that messages are stored on our servers to facilitate the chat functionality and they are NOT encrypted."
				},
				{
					question: "Can I edit or delete messages after sending?",
					answer:
						"Yes, you can edit or delete your messages. Edited messages will show an 'edited' label. Deleted messages will be replaced with a placeholder indicating deletion."
				}
			]
		}
	];

	return (
		<div className="min-h-screen bg-slate-950 text-white">
			<div className="max-w-4xl mx-auto px-6 py-10">
				<h1 className="text-4xl font-bold mb-6">
					Frequently Asked Questions (FAQ)
				</h1>
				<div className="space-y-12" ref={sectionRef}>
					{faqSections.map(section => (
						<div key={new Date().getTime() + Math.random() * 1000}>
							<h2
								className="text-3xl font-bold mb-4 text-yellow-400"
								id={section.title.props.to.substring(1)}
							>
								{section.title}
							</h2>
							<div className="space-y-8">
								{section.items.map(item => (
									<div key={item.question} className="ml-5">
										<h3 className="text-2xl font-semibold mb-2 text-sky-500">
											{item.question}
										</h3>
										<div className="text-base">{item.answer}</div>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
