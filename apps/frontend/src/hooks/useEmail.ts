import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useEmail() {
	const [successMessage, setSuccessMessage] = useState("");

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
			try {
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
			} catch (error) {
				console.error(error);
			}
		},
		onSuccess: () => {
			setSuccessMessage("Your message has been sent successfully!");
		}
	});

	useEffect(() => {
		if (!successMessage) return;

		const timer = setTimeout(() => {
			setSuccessMessage("");
		}, 1000);

		return () => clearTimeout(timer);
	}, [successMessage]);

	return { sendFeedbackEmail, successMessage };
}
