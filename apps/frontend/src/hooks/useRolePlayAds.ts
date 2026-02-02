import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { RolePlayAd } from "../interfaces";
import useSocketStore from "../store/useSocketStore";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface UseRolePlayAdsHook {
	roleplayAds: RolePlayAd[];
	deleteProfile: () => void;
	currUserRoleplayAds: RolePlayAd[];
	adData: RolePlayAd | null;
	loading: boolean;
}

export default function useRolePlayAds(adID?: string): UseRolePlayAdsHook {
	const queryClient = useQueryClient();
	const { rolePlayAd } = useSocketStore();
	const [adData, setAdData] = useState<RolePlayAd | null>(null);
	const [loading, setLoading] = useState(true);

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

	const { data: currUserRoleplayAds } = useQuery({
		queryKey: ["your-roleplayAds"],
		queryFn: async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_BACKEND_BASE_URL}/role-play-ad/all/yours`,
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
		const fetchAd = async () => {
			try {
				setLoading(true);
				const response = await axios.get(
					`${import.meta.env.VITE_BACKEND_BASE_URL}/role-play-ad/${adID}`,
					{ withCredentials: true }
				);
				setAdData(response.data);
			} catch (error) {
				console.error(error);
				setAdData(null);
			} finally {
				setLoading(false);
			}
		};

		if (adID) fetchAd();
	}, [adID]);

	useEffect(() => {
		if (rolePlayAd) {
			queryClient.setQueryData<RolePlayAd[] | undefined>(
				["roleplayAds"],
				old => [rolePlayAd, ...(old ?? [])]
			);
		}
	}, [rolePlayAd]);

	return { roleplayAds, deleteProfile, currUserRoleplayAds, adData, loading };
}
