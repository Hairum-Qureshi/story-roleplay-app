import { create } from "zustand";

interface ModerationState {
  suspensionDuration: number;
  setSuspensionDuration: (duration: number) => void;
  username: string;
  setUsername: (username: string) => void;
  name: string;
  setName: (name: string) => void;
  sentEmail: boolean;
  setSentEmail: (sent: boolean) => void;
  profilePicture: string;
  setProfilePicture: (url: string) => void;
}

export const moderationStore = create<ModerationState>((set) => ({
  setSuspensionDuration: (duration: number) =>
    set((state) => ({ ...state, suspensionDuration: duration })),
  suspensionDuration: 7,
  setUsername: (username: string) =>
    set((state) => ({ ...state, username: username })),
  username: "",
  setName: (name: string) => set((state) => ({ ...state, name: name })),
  name: "",
  sentEmail: false,
  setSentEmail: (sent: boolean) =>
    set((state) => ({ ...state, sentEmail: sent })),
  profilePicture: "",
  setProfilePicture: (url: string) =>
    set((state) => ({ ...state, profilePicture: url })),
}));
