import { useRef, useEffect } from "react";
import ChatBubble from "./ChatBubble";
import useRolePlayChat from "../../hooks/useRolePlayChat";
import type { Message } from "../../interfaces";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import useSocketStore from "../../store/useSocketStore";
import { useParams } from "react-router-dom";
import Ad from "../Ad";
import ChatHeader from "./ChatHeader";
import ChatFooter from "./ChatFooter";
import type { MainChatContainerProps } from "../../interfaces";

export default function MainChatContainer({
	selectedChat,
	noMessageOpened,
	fullWidth,
	fullWidthToggle,
	partner,
	partnerUsername
}: MainChatContainerProps) {
	const { chatID } = useParams();
	const {
		endedConversationID,
		typing,
		partnerUsername: typingPartnerUsername,
		currentTypingChatID
	} = useSocketStore();

	const { rolePlayChatMessages, deleteMessage, endRolePlayConversation } =
		useRolePlayChat(chatID || "");

	const { data: currUser } = useCurrentUser();
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
					<ChatHeader
						fullWidth={fullWidth}
						fullWidthToggle={fullWidthToggle}
						selectedChat={selectedChat}
						endedConversationID={endedConversationID}
						endRolePlayConversation={endRolePlayConversation}
					/>
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
										className="text-center text-sky-400 my-6 mx-10 italic"
										key={message._id}
									>
										<p>
											{message.content.includes(currUser?.username)
												? message.content
														.replace(`@${currUser?.username} has`, "You have")
														.replace("their", "your")
												: message.content}
										</p>
									</div>
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
								<ChatFooter
									partner={partner}
									partnerUsername={partnerUsername}
									selectedChat={selectedChat}
								/>
							)}
						</div>
					</div>
				</>
			)}
		</div>
	);
}
