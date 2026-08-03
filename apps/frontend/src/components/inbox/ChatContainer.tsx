import type { Conversation } from "../../interfaces";
import { FiTrash2 } from "react-icons/fi";
import useRolePlayChat from "../../hooks/useRolePlayChat";

export default function ChatContainer({ chat }: { chat: Conversation }) {
  const { removeChatFromList } = useRolePlayChat();

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="group flex items-center mx-2 my-1 border border-gray-700 justify-between p-2 bg-gray-900 rounded-lg hover:bg-slate-800 cursor-pointer transition-colors">
        {/* Left side */}
        <div className="flex items-center space-x-3">
          <div className="w-1 h-12 bg-gray-700 rounded-full shrink-0" />
          <div>
            <h3 className="text-white font-semibold text-lg">{chat.title}</h3>
            <p className="text-gray-400 text-sm truncate w-55 italic ellipsis overflow-hidden">
              {chat.latestMessage
                ? chat.latestMessage
                : "No messages yet. Start the conversation!"}
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-3">
          <div className="flex flex-col items-end space-y-1">
            {chat.unreadCount > 0 && (
              <span className="bg-indigo-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {chat.unreadCount}
              </span>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                removeChatFromList(chat._id);
              }}
              className="
							opacity-0 scale-95
							group-hover:opacity-100 group-hover:scale-100
							transition-all duration-150
							p-2 rounded-full
							text-gray-400 hover:text-red-400 hover:bg-red-500/10 hover:cursor-pointer
						"
              aria-label="Delete chat"
            >
              <FiTrash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
