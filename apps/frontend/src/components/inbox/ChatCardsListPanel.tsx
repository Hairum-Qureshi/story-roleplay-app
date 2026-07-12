import { Link } from "react-router-dom";
import ChatContainer from "./ChatContainer";
import type { Conversation } from "../../interfaces";
import useChatStore from "../../store/useChatStore";
import useSocketStore from "../../store/useSocketStore";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function ChatCardsListPanel({
  currUserConversations,
}: {
  currUserConversations:
    { _id: string; conversations: Conversation[] } | undefined;
}) {
  const { selectedChat, setSelectedChat } = useChatStore();
  const { socket } = useSocketStore();

  return (
    <div className="w-1/4 shrink-0 h-full min-h-0 pt-3 overflow-y-auto border-r border-slate-700 flex flex-col gap-1">
      <div className="px-4 mb-2 relative">
        <input
          type="text"
          placeholder="Search chats by title..."
          className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="absolute left-7 top-1/2 transform -translate-y-1/2 text-gray-400">
          <FaMagnifyingGlass />
        </div>
      </div>
      {(currUserConversations?.conversations?.length ?? 0) > 0 ? (
        currUserConversations?.conversations.map((chat: Conversation) => (
          <div key={chat._id}>
            <Link
              to={`/inbox/${chat._id}`}
              onClick={() => {
                if (selectedChat?._id !== chat._id) setSelectedChat(chat);
                socket?.emit("currentChatID", {
                  chatID: chat._id || null,
                });
              }}
            >
              <ChatContainer chat={chat} />
            </Link>
          </div>
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
