import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import useRolePlayChat from "../hooks/useRolePlayChat";
import MainChatContainer from "../components/inbox/MainChatContainer";
import ChatCardsListPanel from "../components/inbox/ChatCardsListPanel";
import ChatResourcePanel from "../components/inbox/side-panel/ChatResourcePanel";
import useChatStore from "../store/useChatStore";

export default function Inbox() {
  const { chatID } = useParams();
  const [fullWidth, setFullWidth] = useState(false);
  const { syncSelectedChatById, selectedChat } = useChatStore();

  const { rolePlayChats, currUserConversations } = useRolePlayChat(
    chatID || "",
  );

  const fullWidthToggle = useCallback(() => {
    if (!selectedChat) return;

    setFullWidth((prev) => !prev);
  }, [selectedChat]);

  const noMessageOpened = !chatID;
  const isSidePanelHidden = fullWidth || noMessageOpened;

  // TODO - when a user selects a character, make sure a message/notification is shown in the chat that says "You have selected [character name] for this chat which, for the role-play partner would link to that specific character bio for them to view."

  // ! formatter needs some tinkering. For example, if you try and put '> **__COOL__**' in a message, the markdown isn't rendered correctly.

  useEffect(() => {
    syncSelectedChatById(chatID, rolePlayChats);
  }, [chatID, rolePlayChats, syncSelectedChatById]);

  return (
    <div className="h-[calc(100vh-4rem)] bg-slate-950 text-white flex items-stretch overflow-hidden">
      <ChatCardsListPanel currUserConversations={currUserConversations} />
      <MainChatContainer
        noMessageOpened={noMessageOpened}
        fullWidth={isSidePanelHidden}
        fullWidthToggle={fullWidthToggle}
      />
      <ChatResourcePanel fullWidth={isSidePanelHidden} />
    </div>
  );
}
