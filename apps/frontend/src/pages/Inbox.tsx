import { useState, useRef, useEffect } from "react";
import ChatContainer from "../components/inbox/ChatContainer";
import Ad from "../components/Ad";
import { Link, useParams } from "react-router-dom";
import ChatBubble from "../components/inbox/ChatBubble";
import useRolePlayChat from "../hooks/useRolePlayChat";
import type { Conversation, Message } from "../interfaces";
import { useCurrentUser } from "../hooks/useCurrentUser";
import useSocketStore from "../store/useSocketStore";

export default function Inbox() {
	const [fullWidth, setFullWith] = useState(true);
	const { chatID } = useParams();
	const { endedConversationID } = useSocketStore();

	const {
		rolePlayChats,
		sendMessage,
		rolePlayChatMessages,
		deleteMessage,
		editMessage,
		endRolePlayConversation
	} = useRolePlayChat(chatID || "");

	const [noMessageOpened, setNoMessageOpened] = useState(chatID ? false : true);
	const [selectedChat, setSelectedChat] = useState<Conversation | null>(null);
	const { data: currUser } = useCurrentUser();
	const [message, setMessage] = useState("");
	const bottomOfContainer = useRef<HTMLDivElement>(null);
	const isFirstLoad = useRef(true);

	useEffect(() => {
		if (!bottomOfContainer.current) return;

		if (isFirstLoad) {
			// Initial positioning — no animation
			// For cases when you first opened the chat, you're instantly led to the latest message
			bottomOfContainer.current.scrollIntoView({ behavior: "auto" });
			isFirstLoad.current = false;
		} else {
			// New message arrived — animate
			bottomOfContainer.current?.scrollIntoView({ behavior: "smooth" });
		}
	}, [rolePlayChatMessages]);

	// TODO - when a user selects a character, make sure a message/notification is shown in the chat that says "You have selected [character name] for this chat which, for the role-play partner would link to that specific character bio for them to view."

	useEffect(() => {
		setNoMessageOpened(chatID ? false : true);
	}, [chatID]);

	return (
		<div className="min-h-[100vh - 4rem] bg-slate-950 text-white flex">
			<div className="w-1/4 h-[100vh - 4rem] space-y-3 overflow-y-scroll border-r border-slate-700">
				{rolePlayChats?.length > 0
					? rolePlayChats.map((chat: Conversation) => (
							<Link
								to={`/inbox/${chat._id}`}
								onClick={() => {
									setNoMessageOpened(false);
									setSelectedChat(chat);
								}}
							>
								<ChatContainer key={chat._id} chat={chat} />
							</Link>
						))
					: null}
			</div>
			<div
				className={`w-1/2 min-h-[100vh - 4rem] ${fullWidth ? "w-3/4" : "w-1/2"}`}
			>
				{noMessageOpened ? (
					<p className="text-sky-600 mt-50 text-center text-3xl font-semibold min-h-[65.5vh]">
						Select a chat to view messages
					</p>
				) : (
					<>
						<div className="w-full border-b border-slate-700 flex items-center">
							<h3
								className={
									fullWidth
										? "text-lg w-[54%] truncate overflow-hidden font-semibold mr-auto ml-4"
										: "w-[32%] ml-3 truncate font-semibold text-lg"
								}
							>
								{selectedChat?.title}
							</h3>
							<div
								className="m-2 bg-red-500 border border-red-600 rounded-md px-2 py-1 hover:cursor-pointer"
								onClick={() => chatID && endRolePlayConversation(chatID)}
							>
								End Role-Play
							</div>
							<select className="m-2 border border-white rounded-md px-2 py-1 hover:cursor-pointer">
								<option value="" disabled selected>
									Choose Character
								</option>
								<option value="character1">Character 1</option>
								<option value="character2">Character 2</option>
								<option value="character3">Character 3</option>
							</select>
							<button
								onClick={() => setFullWith(!fullWidth)}
								className="m-2 border border-white rounded-md px-2 py-1 hover:cursor-pointer justify-end"
							>
								{fullWidth ? "Show" : "Hide"} Side Panel
							</button>
						</div>{" "}
						<div className="min-h-[85vh] relative">
							<div className="overflow-y-scroll h-[75vh]">
								{selectedChat && (
									<div className="m-4">
										<Ad rolePlayAd={selectedChat?.roleplayAd} hideButton />
									</div>
								)}
								{rolePlayChatMessages?.map((message: Message) =>
									message.sender.username === "SYSTEM" ? (
										<div
											dangerouslySetInnerHTML={{ __html: message.content }}
											className="text-center text-gray-400 my-6 mx-2 italic"
											key={message._id}
										/>
									) : (
										<ChatBubble
											key={message._id}
											messageData={{
												message: message.content,
												you: message.sender._id === currUser?._id,
												timestamp: message.createdAt
											}}
											onEdit={() => editMessage(message._id)}
											onDelete={() => deleteMessage(message._id)}
										/>
									)
								)}
								<div ref={bottomOfContainer} />
							</div>
							<div className="flex items-center w-full bg-slate-800 shadow-md px-4 py-2">
								{selectedChat?.chatEnded || endedConversationID ? (
									<div className="text-center w-full py-1.5 border border-red-600 text-red-500 rounded-md">
										<p>
											This role-play has ended. You can no longer send messages
											in this chat.
										</p>
										<p className="text-sm mt-1">
											To learn more, check out the{" "}
											<a href="/faq" className="underline hover:text-red-800">
												FAQ
											</a>
											.
										</p>
									</div>
								) : (
									<div className="flex items-center space-x-2 w-full">
										<textarea
											className="flex-1 bg-transparent w-full resize-none outline-none text-white placeholder-slate-400 h-14 p-2 focus:ring-0 rounded-md"
											placeholder="Type your message..."
											value={message}
											onChange={e => setMessage(e.target.value)}
										/>
										{selectedChat && (
											<button
												className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 transition-colors duration-200 rounded-md"
												onClick={() => {
													sendMessage(selectedChat._id, message);
													setMessage("");
												}}
											>
												Send
											</button>
										)}
									</div>
								)}
							</div>
						</div>
					</>
				)}
			</div>
			<div
				className={`border border-slate-700 w-1/4 min-h-[100vh - 4rem] max-h-auto ${fullWidth ? "hidden" : "block"}`}
			>
				<div className="m-2">
					<input
						type="text"
						placeholder="Search a phrase in this chat..."
						className="w-full p-2 border border-sky-700 focus:outline-none focus:ring-2 focus:ring-slate-800 rounded bg-slate-900"
					/>
				</div>
				<div className="h-92 overflow-y-scroll space-y-2">
					<p className="text-gray-400 text-center m-10">
						Your search results will appear here
					</p>
				</div>
				<div className="absolute bottom-0 border border-slate-950">
					<div className="p-4 bg-gray-900 text-white rounded-lg max-w-md">
						<h3 className="text-lg font-semibold mb-2">
							Download Your Conversation History
						</h3>
						<p className="text-sm mb-4 text-gray-300">
							You can download your entire story role-play conversation as a
							PDF. This is handy if you want to read through your entire
							storyline you created with your role-play partner. Please note,
							the PDF is for personal use and cannot be redistributed
							commercially due to copyright.
						</p>
						<button
							className="m-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded-md px-4 py-2 transition-colors duration-200 hover:cursor-pointer"
							onClick={() => {
								window.open(
									`${import.meta.env.VITE_BACKEND_BASE_URL}/pdf/${selectedChat?._id}/role-play`,
									"_blank"
								);
							}}
						>
							Download Conversation History
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
