import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useRolePlayChat from "../hooks/useRolePlayChat";
import type { Conversation } from "../interfaces";
import MainChatContainer from "../components/inbox/MainChatContainer";
import ChatCardsListPanel from "../components/inbox/ChatCardsListPanel";
import ChatResourcePanel from "../components/inbox/ChatResourcePanel";

export default function Inbox() {
	const { chatID } = useParams();
	const [fullWidth, setFullWidth] = useState(chatID ? true : false);
	const [noMessageOpened, setNoMessageOpened] = useState(false);

	const { rolePlayChats, currUserConversations } = useRolePlayChat(
		chatID || ""
	);

	const [selectedChat, setSelectedChat] = useState<Conversation | null>(null);

	function fullWidthToggle(fullWidth: boolean) {
		setFullWidth(fullWidth);
	}

	function messageOpenedToggle(noMessageOpened: boolean) {
		setNoMessageOpened(noMessageOpened);
	}

	function selectedChatToggle(chat: Conversation | null) {
		setSelectedChat(chat);
	}

	// TODO - when a user selects a character, make sure a message/notification is shown in the chat that says "You have selected [character name] for this chat which, for the role-play partner would link to that specific character bio for them to view."

	// TODO - fix issue where if fullWidth is false, and the side panel is open, the 'hide side panel' button is not aligned all the way to the right

	// TODO - break this component into sub components

	// TODO - fix scrolling issue with this component

	// ! formatter needs some tinkering. For example, if you try and put '> **__COOL__**' in a message, the markdown isn't rendered correctly.

	useEffect(() => {
		setNoMessageOpened(chatID ? false : true);
		setSelectedChat(
			rolePlayChats?.find((chat: Conversation) => chat._id === chatID) || null
		);
	}, [chatID, rolePlayChats]);

	useEffect(() => {
		if (!chatID) {
			setFullWidth(true);
		}
	}, [chatID]);

	return (
		<div className="min-h-[100vh - 4rem] bg-slate-950 text-white flex">
			<ChatCardsListPanel
				currUserConversations={currUserConversations}
				messageOpenedToggle={messageOpenedToggle}
				selectedChatToggle={selectedChatToggle}
			/>
			<MainChatContainer
				selectedChat={selectedChat}
				noMessageOpened={noMessageOpened}
				fullWidth={fullWidth}
				fullWidthToggle={fullWidthToggle}
			/>
			<ChatResourcePanel fullWidth={fullWidth} selectedChat={selectedChat} />
		</div>
	);
}
