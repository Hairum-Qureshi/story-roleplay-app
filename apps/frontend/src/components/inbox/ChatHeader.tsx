import { useEffect } from "react";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import type { ChatHeaderProps } from "../../interfaces";
import { useLocation } from "react-router-dom";
import useChatStore from "../../store/useChatStore";
import useSocketStore from "../../store/useSocketStore";

export default function ChatHeader({
  fullWidth,
  fullWidthToggle,
  endedConversationID,
  endRolePlayConversation,
}: ChatHeaderProps) {
  const { pathname } = useLocation();
  const { setHideSystemMessages, hideSystemMessages, selectedChat } =
    useChatStore();
  const { socket } = useSocketStore();
  const { data: currUserData } = useCurrentUser();

  useEffect(() => {
    fullWidthToggle(true);
  }, [pathname, fullWidthToggle]);

  return (
    <div className="w-full mt-5 border-b border-slate-700 flex items-center">
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
        className={`m-2 bg-red-500 border border-red-600 flex rounded-md px-2 py-1 ${
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
        className="border border-white rounded-md px-1 py-1 hover:cursor-pointer"
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
          fullWidthToggle(!fullWidth);
          if (!fullWidth) {
            socket?.emit("noteEditorUpdate", {
              chatID: selectedChat?._id,
              uid: currUserData?._id,
              username: currUserData?.username,
              action: "stop",
            });
          }
        }}
        className="m-2 border border-white rounded-md px-2 py-1 hover:cursor-pointer justify-end"
      >
        {fullWidth ? "Show" : "Hide"} Side Panel
      </button>
    </div>
  );
}
