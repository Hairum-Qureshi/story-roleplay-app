import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface UseFormHook {
	createRoleplayAd: (
		title: string,
		pov: string,
		isAdult: boolean,
		premise: string,
		writingExpectations: string[],
		contentNotes: string
	) => void;
	editRoleplayAd: (
		title: string,
		pov: string,
		isAdult: boolean,
		premise: string,
		writingExpectations: string[],
		contentNotes: string,
		adID: string
	) => void;
}

export default function useForm(): UseFormHook {
	const navigate = useNavigate();

	const { mutate: postRoleplayAdMutate } = useMutation({
		mutationFn: async ({
			title,
			pov,
			isAdult,
			premise,
			writingExpectations,
			contentNotes
		}: {
			title: string;
			pov: string;
			isAdult: boolean;
			premise: string;
			writingExpectations: string[];
			contentNotes: string;
		}) => {
			try {
				const response = await axios.post(
					`${import.meta.env.VITE_BACKEND_BASE_URL}/role-play-ad/create`,
					{
						title,
						pov,
						isAdult,
						premise,
						writingExpectations,
						contentNotes
					},
					{
						withCredentials: true
					}
				);

				return response;
			} catch (error) {
				console.error(error);
			}
		},
		onSuccess: () => {
			navigate("/role-play-ads");
		}
	});

	function createRoleplayAd(
		title: string,
		pov: string,
		isAdult: boolean,
		premise: string,
		writingExpectations: string[],
		contentNotes: string
	) {
		if (!title || !pov || !premise || writingExpectations.length === 0) {
			throw new Error("Please fill in all required fields.");
		}

		postRoleplayAdMutate({
			title,
			pov,
			isAdult,
			premise,
			writingExpectations,
			contentNotes
		});
	}

	const { mutate: editRoleplayAdMutate } = useMutation({
		mutationFn: async ({
			title,
			pov,
			isAdult,
			premise,
			writingExpectations,
			contentNotes,
			adID
		}: {
			title: string;
			pov: string;
			isAdult: boolean;
			premise: string;
			writingExpectations: string[];
			contentNotes: string;
			adID: string;
		}) => {
			try {
				const response = await axios.patch(
					`${import.meta.env.VITE_BACKEND_BASE_URL}/role-play-ad/${adID}/edit`,
					{
						title,
						pov,
						isAdult,
						premise,
						writingExpectations,
						contentNotes
					},
					{
						withCredentials: true
					}
				);

				return response;
			} catch (error) {
				console.error(error);
			}
		},
		onSuccess: () => {
			navigate("/role-play-ads");
		}
	});

	function editRoleplayAd(
		title: string,
		pov: string,
		isAdult: boolean,
		premise: string,
		writingExpectations: string[],
		contentNotes: string,
		adID: string
	) {
		if (!title || !pov || !premise || writingExpectations.length === 0) {
			throw new Error("Please fill in all required fields.");
		}

		editRoleplayAdMutate({
			title,
			pov,
			isAdult,
			premise,
			writingExpectations,
			contentNotes,
			adID
		});
	}

	return { createRoleplayAd, editRoleplayAd };
}
