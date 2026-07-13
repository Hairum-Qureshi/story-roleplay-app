import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function useNotifications() {
  const queryClient = useQueryClient();

  const { mutate: resetNotificationMutation } = useMutation({
    mutationFn: async ({ chatID }: { chatID: string }) => {
      try {
        const response = await axios.patch(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/notification/${chatID}/reset/unread-count`,
          {},
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
        queryKey: ["your-chats"],
      });
    },
  });

  return { resetNotificationMutation };
}
