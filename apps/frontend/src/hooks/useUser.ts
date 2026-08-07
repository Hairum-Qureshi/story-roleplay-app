import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface UseUserHook {
  deleteProfile: () => void;
  blockUserMutation: (targetUserId: string) => void;
  unBlockUserMutation: (targetUserId: string) => void;
  allBlockedUsers: { _id: string; username: string; profilePicture: string }[];
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
      queryClient.invalidateQueries({
        queryKey: ["blocked-users"],
      });
    },
  });

  const { data: allBlockedUsers } = useQuery({
    queryKey: ["blocked-users"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/user/all/blocked`,
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

  function deleteProfile() {
    mutate();
  }

  return {
    deleteProfile,
    blockUserMutation,
    unBlockUserMutation,
    allBlockedUsers,
  };
}
