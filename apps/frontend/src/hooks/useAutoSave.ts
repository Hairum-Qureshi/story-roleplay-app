import { useRef } from "react";
import { autoSaveStore } from "../store/useAutoSaveStore";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function useAutoSave() {
  const setSaving = autoSaveStore((s) => s.setSaving);
  const { saving } = autoSaveStore();
  const keyUpTimer = useRef<number | null>(null);
  const { chatID } = useParams();

  const { mutate: postRoleplayAdMutate } = useMutation({
    mutationFn: async ({ content }: { content: string }) => {
      try {
        const response = await axios.patch(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/chat/${chatID}/notes`,
          {
            content,
          },
          {
            withCredentials: true,
          },
        );

        return response;
      } catch (error) {
        console.error(error);
      }
    },
    onSuccess: () => {
      console.log("Note saved successfully");
    },
  });

  function autosave(noteData: string) {
    setSaving(true);
    if (keyUpTimer.current) {
      clearTimeout(keyUpTimer.current);
    }

    keyUpTimer.current = window.setTimeout(() => {
      // code responsible for sending data to backend

      postRoleplayAdMutate({ content: noteData });

      setSaving(false);
    }, 500);
  }

  return { autosave, saving };
}
