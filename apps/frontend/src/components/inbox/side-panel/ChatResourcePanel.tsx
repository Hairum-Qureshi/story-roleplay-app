import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useState } from "react";
import type { PinnedMessage } from "../../../interfaces";
import UserCard from "../UserCard";
import { MdPushPin } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import PinnedMessageBubble from "../PinnedMessageBubble";
import { useParams } from "react-router-dom";
import useRolePlayChat from "../../../hooks/useRolePlayChat";
import SidePanelTipTapEditor from "./SidePanelTipTapEditor";
import ChatResourcePanelFooter from "./ChatResourcePanelFooter";
import useChatStore from "../../../store/useChatStore";

export default function ChatResourcePanel({
  fullWidth,
}: {
  fullWidth: boolean;
}) {
  const { data: currUserData } = useCurrentUser();
  const { selectedChat } = useChatStore();
  const isSearching = false;
  const [showPinnedMessages, setShowPinnedMessages] = useState(false);
  const { chatID } = useParams();
  const { pinnedRoleplayMessages } = useRolePlayChat(chatID || "");
  const [noteMode, setNoteMode] = useState(false);

  return (
    <aside
      className={`
        ${fullWidth ? "hidden" : "flex"}
        w-90
        h-full
        min-h-0
        flex-col
        bg-slate-950
        border-l
        border-slate-800
    `}
    >
      {noteMode ? (
        <SidePanelTipTapEditor />
      ) : (
        <>
          <div className="px-5 pt-6 pb-4 border-b border-slate-800">
            <h2 className="text-lg font-semibold text-white">
              Chat Resources
            </h2>
            <div className="relative mt-5">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                placeholder="Search this conversation..."
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-700
                  bg-slate-900
                  py-2.5
                  pl-10
                  pr-3
                  text-sm
                  text-slate-200
                  placeholder:text-slate-500
                  outline-none
                  transition
                  focus:border-sky-500
                  focus:ring-2
                  focus:ring-sky-500/20
                  "
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-5">
            {isSearching ? (
              <p className="text-sm text-slate-400">Searching...</p>
            ) : showPinnedMessages ? (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                    Pinned Messages
                  </span>
                  <span className="text-xs text-slate-500">
                    {pinnedRoleplayMessages?.length ?? 0}
                  </span>
                </div>
                <div className="space-y-2">
                  {!pinnedRoleplayMessages?.length ? (
                    <p className="text-sm text-slate-400">
                      No pinned messages.
                    </p>
                  ) : (
                    pinnedRoleplayMessages?.map((message: PinnedMessage) => (
                      <div key={message._id}>
                        <PinnedMessageBubble
                          profilePicture={message.sender.profilePicture!}
                          timestamp={message.createdAt}
                          message={message.content}
                          chatID={chatID || ""}
                          messageID={message._id}
                        />
                      </div>
                    ))
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                    People
                  </span>

                  <span className="text-xs text-slate-500">
                    {
                      selectedChat?.participants.filter(
                        (p) => p.username !== "SYSTEM",
                      ).length
                    }
                  </span>
                </div>
                <div className="space-y-1">
                  {selectedChat?.participants.map(
                    (member) =>
                      member.username !== "SYSTEM" && (
                        <UserCard
                          key={member._id}
                          username={member.username}
                          you={member.username === currUserData?.username}
                          profilePicture={member.profilePicture || ""}
                        />
                      ),
                  )}
                </div>
              </>
            )}
          </div>
        </>
      )}
      <div className="border-t border-slate-800 p-4">
        <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
          Actions
        </div>
        <div className="space-y-1">
          {!showPinnedMessages ? (
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
              onClick={() => setShowPinnedMessages(!showPinnedMessages)}
            >
              <div className="flex items-center gap-3">
                <MdPushPin className="text-sky-400 text-lg" />
                <span className="font-medium">Pinned Messages</span>
              </div>
            </button>
          ) : null}

          <ChatResourcePanelFooter
            noteMode={noteMode}
            showPinnedMessages={showPinnedMessages}
            onShowMembers={() => setShowPinnedMessages(false)}
            onToggleNoteMode={() => {
              setNoteMode((prev) => !prev);
            }}
          />
        </div>
      </div>
    </aside>
  );
}
