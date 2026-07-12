import { useRef, useEffect, useLayoutEffect } from "react";
import useChatStore from "../../store/useChatStore";
import ChatBubble from "./ChatBubble";
import useRolePlayChat from "../../hooks/useRolePlayChat";
import type { Message } from "../../interfaces";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import useSocketStore from "../../store/useSocketStore";
import { useParams } from "react-router-dom";
import Ad from "../Ad";
import ChatHeader from "./ChatHeader";
import ChatFooter from "./ChatFooter";
import type { MainChatContainerProps } from "../../interfaces";

export default function MainChatContainer({
  noMessageOpened,
  fullWidth,
  fullWidthToggle,
}: MainChatContainerProps) {
  const { chatID } = useParams();
  const {
    socket,
    endedConversationID,
    typing,
    partnerUsername: typingPartnerUsername,
    currentTypingChatID,
  } = useSocketStore();

  const { rolePlayChatMessages, deleteMessage, endRolePlayConversation } =
    useRolePlayChat(chatID || "");

  const { hideSystemMessages, selectedChat } = useChatStore();
  const { data: currUser } = useCurrentUser();
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const bottomOfContainer = useRef<HTMLDivElement>(null);
  const isFirstLoad = useRef(true);
  const pendingDistanceFromBottom = useRef<number | null>(null);
  const chatEnded = selectedChat?.chatEnded;
  const partner = selectedChat?.participants.find(
    (participant) => participant._id !== currUser?._id,
  );

  useEffect(() => {
    socket?.emit("currentChatID", {
      chatID,
    });
  }, [chatID, socket]);

  useEffect(() => {
    const messagesContainer = messagesContainerRef.current;
    if (!messagesContainer) return;

    if (isFirstLoad.current) {
      messagesContainer.scrollTo({
        top: messagesContainer.scrollHeight,
        behavior: "auto",
      });
      isFirstLoad.current = false;
    } else {
      messagesContainer.scrollTo({
        top: messagesContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [rolePlayChatMessages]);

  useLayoutEffect(() => {
    if (pendingDistanceFromBottom.current === null) return;

    const messagesContainer = messagesContainerRef.current;
    if (!messagesContainer) return;

    messagesContainer.scrollTop = Math.max(
      0,
      messagesContainer.scrollHeight -
        messagesContainer.clientHeight -
        pendingDistanceFromBottom.current,
    );
    pendingDistanceFromBottom.current = null;
  }, [fullWidth]);

  function handleFullWidthToggle() {
    const messagesContainer = messagesContainerRef.current;

    if (messagesContainer) {
      pendingDistanceFromBottom.current =
        messagesContainer.scrollHeight -
        messagesContainer.scrollTop -
        messagesContainer.clientHeight;
    }

    fullWidthToggle();
  }

  function isSystemMessage(message: Message) {
    const senderData = message.sender as Message["sender"] | string | undefined;
    const senderUsername =
      typeof senderData === "string" ? undefined : senderData?.username;
    const senderId =
      typeof senderData === "string" ? senderData : senderData?._id;

    return (
      senderUsername === "SYSTEM" || senderId === "000000000000000000000001"
    );
  }

  return (
    <div className="flex-1 h-full min-h-0 min-w-0 flex flex-col overflow-hidden">
      {noMessageOpened ? (
        <p className="text-sky-600 text-center text-3xl mt-50 font-semibold flex items-center justify-center">
          Select a chat to view messages
        </p>
      ) : (
        <>
          {/* Header */}
          <div>
            <ChatHeader
              fullWidth={fullWidth}
              fullWidthToggle={handleFullWidthToggle}
              endedConversationID={endedConversationID}
              endRolePlayConversation={endRolePlayConversation}
            />
          </div>

          {/* Messages */}
          <div
            ref={messagesContainerRef}
            className="flex-1 min-h-0 overflow-y-auto"
          >
            {selectedChat && (
              <div className="m-4">
                <Ad rolePlayAd={selectedChat.roleplayAd} hideButton />
              </div>
            )}
            {rolePlayChatMessages?.map((message: Message) =>
              hideSystemMessages &&
              isSystemMessage(message) ? null : isSystemMessage(message) ? (
                <div
                  key={message._id}
                  className="text-center text-sky-400 my-6 mx-10 italic"
                >
                  <p>
                    {message.content.includes(currUser?.username)
                      ? message.content
                          .replace(`@${currUser?.username} has`, "You have")
                          .replace("their", "your")
                      : message.content}
                  </p>
                </div>
              ) : (
                <div id={`message-${message._id}`} key={message._id}>
                  <ChatBubble
                    messageData={{
                      message: message.content,
                      you: message.sender?._id === currUser?._id,
                      timestamp: message.createdAt,
                    }}
                    onDelete={() =>
                      selectedChat &&
                      deleteMessage(selectedChat._id, message._id)
                    }
                    isPinned={message.isPinned || false}
                    chatEnded={chatEnded || false}
                    isDeleted={message.isDeleted}
                    isEdited={message.isEdited || false}
                    messageID={message._id}
                  />
                </div>
              ),
            )}

            <div ref={bottomOfContainer} />

            {typing && currentTypingChatID === selectedChat?._id && (
              <p className="text-slate-400 italic ml-4 mb-2">
                @{typingPartnerUsername} is typing...
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="shrink-0 flex items-center w-full bg-slate-800 px-4 py-2">
            {chatEnded || endedConversationID ? (
              <div className="text-center w-full py-1.5 border border-red-600 text-red-500 rounded-md">
                <p>
                  This role-play has ended. You can no longer send messages in
                  this chat.
                </p>
                <p className="text-sm mt-1">
                  To learn more, check out the{" "}
                  <a
                    href="/faq#role-play-management"
                    className="underline hover:text-red-800"
                  >
                    FAQ
                  </a>
                  .
                </p>
              </div>
            ) : (
              <ChatFooter
                partner={partner?._id || ""}
                partnerUsername={currUser?.username || ""}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
