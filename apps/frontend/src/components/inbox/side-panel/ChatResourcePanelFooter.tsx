import { FaExternalLinkAlt } from "react-icons/fa";
import { RiStickyNote2Fill } from "react-icons/ri";
import { FiDownload } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import type { Conversation } from "../../../interfaces";

interface ChatResourcePanelFooterProps {
  noteMode: boolean;
  showPinnedMessages: boolean;
  selectedChat: Conversation | null;
  onToggleNoteMode: () => void;
  onShowMembers: () => void;
}

export default function ChatResourcePanelFooter({
  noteMode,
  showPinnedMessages,
  selectedChat,
  onToggleNoteMode,
  onShowMembers,
}: ChatResourcePanelFooterProps) {
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
        onClick={onToggleNoteMode}
      >
        <div className="flex items-center gap-3">
          {noteMode ? (
            <IoMdArrowRoundBack className="text-sky-400 text-lg" />
          ) : (
            <RiStickyNote2Fill className="text-yellow-400 text-lg" />
          )}
          <span className="font-medium">
            {noteMode ? "Back To Resources" : "Create Note"}
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
