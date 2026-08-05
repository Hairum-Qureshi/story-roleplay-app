import { useCurrentUser } from "../../hooks/useCurrentUser";
import type { ChatHeaderProps } from "../../interfaces";
import useChatStore from "../../store/useChatStore";
import useSocketStore from "../../store/useSocketStore";
import { LuPanelLeftOpen } from "react-icons/lu";
import { LuPanelLeftClose } from "react-icons/lu";

export default function ChatHeader({
  fullWidth,
  fullWidthToggle,
  endedConversationID,
  endRolePlayConversation,
}: ChatHeaderProps) {
  const { setHideSystemMessages, hideSystemMessages, selectedChat } =
    useChatStore();
  const { socket } = useSocketStore();
  const { data: currUserData } = useCurrentUser();

  // useEffect(() => {
  //   fullWidthToggle(true);
  // }, [pathname, fullWidthToggle]);

  return (
    <div className="w-full border-b border-slate-700 flex items-center gap-3 px-3 py-2">
      <h3 className="min-w-0 flex-1 truncate font-semibold text-lg">
        {selectedChat?.title}
      </h3>
      <div className="ml-auto flex items-center gap-2 shrink-0">
        <div
          className={`bg-red-500 border border-red-600 flex rounded-md px-2 py-1 ${
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
        <button
          className="border border-white rounded-md px-2 py-1 hover:cursor-pointer"
          onClick={() => setHideSystemMessages(!hideSystemMessages)}
        >
          {hideSystemMessages ? "Show" : "Hide"} System Messages
        </button>
        {/* <select className="m-2 border border-white rounded-md px-2 py-1 hover:cursor-pointer">
        <option value="" disabled selected>
          Choose Character
        </option>
        <option value="character1">Character 1</option>
        <option value="character2">Character 2</option>
        <option value="character3">Character 3</option>
      </select> */}
        <button
          onClick={() => {
            fullWidthToggle();
            if (!fullWidth) {
              socket?.emit("noteEditorUpdate", {
                chatID: selectedChat?._id,
                uid: currUserData?._id,
                username: currUserData?.username,
                action: "stop",
              });
            }
          }}
          className="
            ml-2 flex items-center justify-center
            h-9 w-9
            rounded-lg
            border border-blue-900/50
            bg-slate-950
            text-blue-300/70
            transition-all duration-200
            hover:bg-blue-950/60
            hover:text-blue-200
            hover:border-blue-700/60
            hover:shadow-[0_0_12px_rgba(37,99,235,0.15)]
            active:scale-95
            cursor-pointer
          "
        >
          {fullWidth ? (
            <LuPanelLeftOpen className="h-5 w-5" />
          ) : (
            <LuPanelLeftClose className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
}
