import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useEmail() {
	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const { mutate: sendFeedbackEmail } = useMutation({
		mutationFn: async ({
			from,
			subject,
			message
		}: {
			from: string;
			subject: string;
			message: string;
		}) => {
			await axios.post(
				`${import.meta.env.VITE_BACKEND_BASE_URL}/email/send`,
				{
					from,
					subject,
					message
				},
				{
					withCredentials: true
				}
			);
		},
		onSuccess: () => {
			setSuccessMessage("Your message has been sent successfully!");
		},
		onError: (error: any) => {
			console.log(error);
			setErrorMessage(
				error.response?.data?.message ||
					"An error occurred while sending your message. Please try again."
			);
		}
	});

	useEffect(() => {
		if (!successMessage && !errorMessage) return;

		if (!successMessage && errorMessage) {
			const timer = setTimeout(() => {
				setErrorMessage("");
			}, 1000);

			return () => clearTimeout(timer);
		}

		if (successMessage && !errorMessage) {
			const timer = setTimeout(() => {
				setSuccessMessage("");
			}, 1000);

			return () => clearTimeout(timer);
		}
	}, [successMessage, errorMessage]);

	return { sendFeedbackEmail, successMessage, errorMessage };
}
