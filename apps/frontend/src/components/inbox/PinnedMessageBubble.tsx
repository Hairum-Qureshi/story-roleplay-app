import { MdPushPin } from "react-icons/md";
import useRolePlayChat from "../../hooks/useRolePlayChat";

interface PinnedMessageBubbleProps {
  profilePicture: string;
  timestamp: string;
  message: string;
  chatID: string;
  messageID: string;
}

export default function PinnedMessageBubble({
  profilePicture,
  timestamp,
  message,
  chatID,
  messageID,
}: PinnedMessageBubbleProps) {
  const { pinMessageMutation } = useRolePlayChat(chatID || "");

  function scrollToMessage(id: string) {
    const el = document.getElementById(`message-${id}`);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }

  return (
    <div
      className="relative rounded-lg border border-slate-700 bg-slate-900 p-3 hover:bg-slate-800/50 transition-colors hover:cursor-pointer"
      onClick={() => scrollToMessage(messageID)}
    >
      <div className="absolute right-3 top-3 text-slate-500">
        <MdPushPin
          className="h-4 w-4"
          onClick={(e) => {
            e.stopPropagation();
            pinMessageMutation({
              chatID: chatID!,
              messageID,
            });
          }}
        />
      </div>
      <div className="flex items-start gap-3">
        <img
          src={profilePicture}
          alt="Profile Picture"
          className="h-9 w-9 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">
              {new Date(timestamp).toLocaleString()}
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-300 line-clamp-2 truncate">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
