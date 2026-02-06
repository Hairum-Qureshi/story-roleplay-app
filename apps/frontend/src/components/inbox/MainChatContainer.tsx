import { useRef, useState, useEffect, use } from "react";
import ChatBubble from "./ChatBubble";
import useRolePlayChat from "../../hooks/useRolePlayChat";
import type { Message, Conversation } from "../../interfaces";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import useSocketStore from "../../store/useSocketStore";
import { useParams } from "react-router-dom";
import Ad from "../Ad";
import useTyping from "../../hooks/useTyping";

export default function MainChatContainer({
	selectedChat,
	noMessageOpened,
	fullWidth,
	fullWidthToggle,
	partner,
	partnerUsername
}: {
	selectedChat: Conversation | null;
	noMessageOpened: boolean;
	fullWidth: boolean;
	fullWidthToggle: (fullWidth: boolean) => void;
	partner: string;
	partnerUsername: string;
}) {
	const { chatID } = useParams();
	const {
		endedConversationID,
		typing,
		partnerUsername: typingPartnerUsername,
		currentTypingChatID
	} = useSocketStore();

	const {
		sendMessage,
		rolePlayChatMessages,
		deleteMessage,
		endRolePlayConversation
	} = useRolePlayChat(chatID || "");

	const { data: currUser } = useCurrentUser();
	const [message, setMessage] = useState("");
	const bottomOfContainer = useRef<HTMLDivElement>(null);
	const isFirstLoad = useRef(true);

	const { typingIndicator } = useTyping();

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

	console.log(currentTypingChatID, selectedChat?._id);

	return (
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
							className={`m-2 bg-red-500 border border-red-600 rounded-md px-2 py-1 ${
								selectedChat?.chatEnded || endedConversationID
									? "cursor-not-allowed opacity-50"
									: "hover:bg-red-600 active:bg-red-700 hover:cursor-pointer"
							}`}
							onClick={() => {
								if (!selectedChat?.chatEnded && !endedConversationID) {
									endRolePlayConversation(selectedChat!._id);
								}
							}}
						>
							{selectedChat?.chatEnded || endedConversationID
								? "Ended"
								: "End Role-Play"}
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
							onClick={() => fullWidthToggle(!fullWidth)}
							className="m-2 border border-white rounded-md px-2 py-1 hover:cursor-pointer justify-end"
						>
							{fullWidth ? "Show" : "Hide"} Side Panel
						</button>
					</div>
					<div className="relative">
						<div className="overflow-y-scroll h-[75vh]">
							{selectedChat && (
								<div className="m-4">
									<Ad rolePlayAd={selectedChat?.roleplayAd} hideButton />
								</div>
							)}
							{rolePlayChatMessages?.map((message: Message) =>
								message.sender?.username === "SYSTEM" ? (
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
											you: message.sender?._id === currUser?._id,
											timestamp: message.createdAt
										}}
										onDelete={() =>
											selectedChat &&
											deleteMessage(selectedChat?._id, message._id)
										}
										chatEnded={selectedChat?.chatEnded || !!endedConversationID}
										isDeleted={message.isDeleted}
										isEdited={message.isEdited || false}
										messageID={message._id}
										isSystemMessage={message.sender?.username === "SYSTEM"}
									/>
								)
							)}

							<div ref={bottomOfContainer} />
							{typing && currentTypingChatID === selectedChat?._id && (
								<p className="text-slate-400 italic ml-4 mb-2">
									@{typingPartnerUsername} is typing...
								</p>
							)}
						</div>
						<div className="flex items-center w-full bg-slate-800 shadow-md px-4 py-2">
							{selectedChat?.chatEnded || endedConversationID ? (
								<div className="text-center w-full py-1.5 border border-red-600 text-red-500 rounded-md">
									<p>
										This role-play has ended. You can no longer send messages in
										this chat.
									</p>
									<p className="text-sm mt-1">
										To learn more, check out the{" "}
										<a
											href="/faq#role-play-management"
											className="underline hover:text-red-800"
										>
											FAQ
										</a>
										.
									</p>
								</div>
							) : (
								<div className="flex items-center space-x-2 w-full">
									<textarea
										className="flex-1 bg-transparent w-full resize-none outline-none text-white placeholder-slate-400 h-17 p-2 focus:ring-0 rounded-md"
										placeholder="Type your message..."
										value={message}
										onChange={e => {
											setMessage(e.target.value);
											typingIndicator(
												partner,
												partnerUsername,
												selectedChat?._id || ""
											);
										}}
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
	);
}
