import { create } from "zustand";

interface ModerationState {
  sentEmail: boolean;
  setSentEmail: (value: boolean) => void;
}

export const moderationStore = create<ModerationState>((set) => ({
  sentEmail: false,
  setSentEmail: (value: boolean) => set({ sentEmail: value }),
}));
