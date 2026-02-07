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
		<div className="w-1/4 h-[94vh] space-y-3 overflow-y-scroll border-r border-slate-700">
			{(currUserConversations?.conversations?.length ?? 0) > 0 ? (
				currUserConversations?.conversations.map(
					(chat: Conversation, index: number) => (
						<div className={index === 0 ? "mt-9" : ""} key={chat._id}>
							<Link
								to={`/inbox/${chat._id}`}
								onClick={() => {
									messageOpenedToggle(false);
									selectedChatToggle(chat);
								}}
							>
								<ChatContainer chat={chat} />
							</Link>
						</div>
					)
				)
			) : (
				<p className="text-center text-sky-600 mt-20 font-semibold mx-10">
					No conversations found. Any ads of yours users have responded to or
					you have responded to will show up here.
				</p>
			)}
		</div>
	);
}
