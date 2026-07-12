import { FaExternalLinkAlt } from "react-icons/fa";
import { RiStickyNote2Fill } from "react-icons/ri";
import { FiDownload } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import useSocketStore from "../../../store/useSocketStore";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import useChatStore from "../../../store/useChatStore";

interface ChatResourcePanelFooterProps {
  noteMode: boolean;
  showPinnedMessages: boolean;
  onToggleNoteMode: () => void;
  onShowMembers: () => void;
}

export default function ChatResourcePanelFooter({
  noteMode,
  showPinnedMessages,
  onToggleNoteMode,
  onShowMembers,
}: ChatResourcePanelFooterProps) {
  const { data: currUserData } = useCurrentUser();
  const { socket } = useSocketStore();
  const { selectedChat } = useChatStore();

  return (
    <>
      {showPinnedMessages ? (
        <button
          className="
            group
            flex
            w-full
            items-center
            justify-between
            rounded-xl
            px-3
            py-3
            text-slate-200
            transition
            hover:bg-slate-800
            hover:cursor-pointer
          "
          onClick={onShowMembers}
        >
          <div className="flex items-center gap-3">
            <FaUsers className="text-sky-400 text-lg" />
            <span className="font-medium">Show Members</span>
          </div>
        </button>
      ) : null}

      <button
        className={`group
          flex
          w-full
          items-center
          justify-between
          rounded-xl
          px-3
          py-3
          text-slate-200
          transition
          hover:bg-slate-800
          hover:cursor-pointer ${selectedChat?.chatEnded && !selectedChat?.notes ? "opacity-50" : ""}`}
        disabled={selectedChat?.chatEnded && !selectedChat?.notes}
        onClick={() => {
          onToggleNoteMode();
          if (!noteMode) {
            socket?.emit("noteEditorUpdate", {
              chatID: selectedChat?._id,
              uid: currUserData?._id,
              username: currUserData?.username,
              action: "start",
            });
          } else {
            socket?.emit("noteEditorUpdate", {
              chatID: selectedChat?._id,
              uid: currUserData?._id,
              username: currUserData?.username,
              action: "stop",
            });
          }
        }}
      >
        <div className="flex items-center gap-3">
          {noteMode ? (
            <IoMdArrowRoundBack className="text-sky-400 text-lg" />
          ) : (
            <RiStickyNote2Fill className="text-yellow-400 text-lg" />
          )}
          <span className="font-medium">
            {noteMode
              ? "Back To Resources"
              : `${selectedChat?.notes && selectedChat?.chatEnded ? "View Notes" : selectedChat?.notes ? "Edit Notes" : "Add Notes"}`}
          </span>
        </div>
      </button>

      <button
        className="
          group
          flex
          w-full
          items-center
          justify-between
          rounded-xl
          px-3
          py-3
          text-slate-200
          transition
          hover:bg-slate-800
          hover:cursor-pointer
        "
        onClick={() => {
          window.open(
            `${import.meta.env.VITE_BACKEND_BASE_URL}/pdf/${selectedChat?._id}/role-play`,
            "_blank",
          );
        }}
      >
        <div className="flex items-center gap-3">
          <FiDownload className="text-sky-400" />
          <span className="font-medium">Download Transcript</span>
        </div>
        <FaExternalLinkAlt className="text-xs opacity-0 transition group-hover:opacity-100 text-slate-500" />
      </button>
    </>
  );
}
