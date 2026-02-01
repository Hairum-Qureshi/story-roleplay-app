import { Link } from "react-router-dom";
import ChatContainer from "./ChatContainer";
import type { Conversation } from "../../interfaces";

export default function ChatCardsListPanel({
	currUserConversations,
	messageOpenedToggle,
	selectedChatToggle
}: {
	currUserConversations:
		| { _id: string; conversations: Conversation[] }
		| undefined;
	messageOpenedToggle: (noMessageOpened: boolean) => void;
	selectedChatToggle: (chat: Conversation | null) => void;
}) {
	return (
		<div className="w-1/4 h-[92vh] space-y-3 overflow-y-scroll border-r border-slate-700">
			{currUserConversations?.conversations.length > 0 ? (
				currUserConversations?.conversations.map((chat: Conversation) => (
					<Link
						to={`/inbox/${chat._id}`}
						onClick={() => {
							messageOpenedToggle(false);
							selectedChatToggle(chat);
						}}
					>
						<ChatContainer key={chat._id} chat={chat} />
					</Link>
				))
			) : (
				<p className="text-center text-sky-600 mt-20 font-semibold mx-10">
					No conversations found. Any ads of yours users have responded to or
					you have responded to will show up here.
				</p>
			)}
		</div>
	);
}
