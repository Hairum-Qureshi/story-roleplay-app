import { create } from "zustand";

interface ChatStore {
  hideSystemMessages: boolean;
  setHideSystemMessages: (hide: boolean) => void;
}

const useChatStore = create<ChatStore>((set, get) => ({
  hideSystemMessages: false,
  setHideSystemMessages: (hide: boolean) => set({ hideSystemMessages: hide }),
}));

export default useChatStore;
