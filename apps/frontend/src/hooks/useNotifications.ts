import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useSocketStore from "../store/useSocketStore";
import { useEffect } from "react";

export default function useNotifications() {
  const queryClient = useQueryClient();
  const { notification } = useSocketStore();

  useEffect(() => {
    if (!notification) return;

    queryClient.invalidateQueries({
      queryKey: ["your-chats"],
    });
  }, [notification]);

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
      queryClient.invalidateQueries({
        queryKey: ["total-notifications"],
      });
    },
  });

  const { data: totalNotifications } = useQuery({
    queryKey: ["total-notifications"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/notification/all/total`,
          {
            withCredentials: true,
          },
        );
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
  });

  return { resetNotificationMutation, totalNotifications };
}
