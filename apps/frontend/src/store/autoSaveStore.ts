import { create } from "zustand";

interface AutoSaveState {
  saving: boolean;
  setSaving: (saving: boolean) => void;
}

export const autoSaveStore = create<AutoSaveState>((set) => ({
  saving: false,
  setSaving: (saving) => set({ saving }),
}));
