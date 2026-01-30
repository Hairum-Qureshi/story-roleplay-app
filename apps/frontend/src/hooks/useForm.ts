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
}

export default function useForm(): UseFormHook {
	const navigate = useNavigate();

	const { mutate, isError, isPending, error } = useMutation({
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

		mutate({ title, pov, isAdult, premise, writingExpectations, contentNotes });
	}

	return { createRoleplayAd };
}
