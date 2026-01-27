import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { RolePlayAd } from "../interfaces";
import useSocketStore from "../store/useSocketStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface UseRolePlayAdsHook {
	roleplayAds: RolePlayAd[];
}

export default function useRolePlayAds(): UseRolePlayAdsHook {
	const queryClient = useQueryClient();
	const { rolePlayAd } = useSocketStore();
	const navigate = useNavigate();

	const { data: roleplayAds } = useQuery({
		queryKey: ["roleplayAds"],
		queryFn: async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_BACKEND_BASE_URL}/role-play-ad/all`,
					{
						withCredentials: true
					}
				);
				return response.data;
			} catch (error) {
				console.error(error);
			}
		}
	});

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

	useEffect(() => {
		if (rolePlayAd) {
			queryClient.setQueryData<RolePlayAd[] | undefined>(
				["roleplayAds"],
				old => [rolePlayAd, ...(old ?? [])]
			);
		}
	}, [rolePlayAd]);

	return { roleplayAds };
}
