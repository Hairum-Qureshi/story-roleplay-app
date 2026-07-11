import { useRef } from "react";
import { autoSaveStore } from "../store/autoSaveStore";

export default function useAutoSave() {
  const setSaving = autoSaveStore((s) => s.setSaving);
  const { saving } = autoSaveStore();
  const keyUpTimer = useRef<number | null>(null);

  function autosave(noteData: string) {
    setSaving(true);
    if (keyUpTimer.current) {
      clearTimeout(keyUpTimer.current);
    }

    keyUpTimer.current = window.setTimeout(() => {
      // code responsible for sending data to backend
      console.log(noteData);
      setSaving(false);
    }, 500);
  }

  return { autosave, saving };
}
