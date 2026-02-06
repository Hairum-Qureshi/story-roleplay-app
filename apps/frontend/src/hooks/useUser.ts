import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface UseUserHook {
	deleteProfile: () => void;
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
						withCredentials: true
					}
				);
			} catch (error) {
				console.error(error);
			}
		},
		onSuccess: () => {
			queryClient.setQueryData(["currentUser"], null);
			navigate("/");
		}
	});

	function deleteProfile() {
		mutate();
	}

	return { deleteProfile };
}
