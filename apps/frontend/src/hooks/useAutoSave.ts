import { useRef } from "react";
import { autoSaveStore } from "../store/useAutoSaveStore";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function useAutoSave() {
  const setSaving = autoSaveStore((s) => s.setSaving);
  const queryClient = useQueryClient();
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
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["role-play-notes", chatID],
      });

      console.log("Note saved successfully");
      setSaving(false);
    },
  });

  function autosave(noteData: string) {
    if (keyUpTimer.current) {
      clearTimeout(keyUpTimer.current);
      setSaving(true);
    }

    keyUpTimer.current = window.setTimeout(() => {
      if (!noteData || noteData.trim() === "") return;

      postRoleplayAdMutate({ content: noteData });
    }, 500);
  }

  return { autosave };
}
