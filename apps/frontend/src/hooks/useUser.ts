import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface UseUserHook {
  deleteProfile: () => void;
  blockUserMutation: (targetUserId: string) => void;
  unBlockUserMutation: (targetUserId: string) => void;
}

export default function useUser(): UseUserHook {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: async () => {
      try {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/user/delete-account`,
          {
            withCredentials: true,
          },
        );
      } catch (error) {
        console.error(error);
      }
    },
    onSuccess: () => {
      queryClient.setQueryData(["currentUser"], null);
      navigate("/");
    },
  });

  const { mutate: blockUserMutation } = useMutation({
    mutationFn: async (targetUserId: string) => {
      try {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/user/${targetUserId}/block`,
          {},
          {
            withCredentials: true,
          },
        );
      } catch (error) {
        console.error(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["currentUser"],
      });
    },
  });

  const { mutate: unBlockUserMutation } = useMutation({
    mutationFn: async (targetUserId: string) => {
      try {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/user/${targetUserId}/unblock`,
          {},
          {
            withCredentials: true,
          },
        );
      } catch (error) {
        console.error(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["currentUser"],
      });
    },
  });

  function deleteProfile() {
    mutate();
  }

  return { deleteProfile, blockUserMutation, unBlockUserMutation };
}
