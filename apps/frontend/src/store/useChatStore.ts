import { create } from "zustand";
import type { Conversation } from "../interfaces";

interface ChatStore {
  hideSystemMessages: boolean;
  selectedChat: Conversation | null;
  setHideSystemMessages: (hide: boolean) => void;
  setSelectedChat: (chat: Conversation | null) => void;
  syncSelectedChatById: (
    chatID: string | undefined,
    chats: Conversation[] | undefined,
  ) => void;
}

const useChatStore = create<ChatStore>((set) => ({
  hideSystemMessages: false,
  selectedChat: null,
  setHideSystemMessages: (hide: boolean) => set({ hideSystemMessages: hide }),
  setSelectedChat: (chat: Conversation | null) => set({ selectedChat: chat }),
  syncSelectedChatById: (
    chatID: string | undefined,
    chats: Conversation[] | undefined,
  ) => {
    const chat = chatID
      ? chats?.find((conversation) => conversation._id === chatID) || null
      : null;

    set({ selectedChat: chat });
  },
}));

export default useChatStore;
