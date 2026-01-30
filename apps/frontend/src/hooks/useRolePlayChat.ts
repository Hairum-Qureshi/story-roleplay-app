import axios, { type AxiosResponse } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { Conversation, Message } from "../interfaces";
import { useQueryClient } from "@tanstack/react-query";
import useSocketStore from "../store/useSocketStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface UseRolePlayChatHook {
	createConversation: (adID: string) => void;
	rolePlayChats: Conversation[];
	sendMessage: (adID: string, message: string) => void;
	rolePlayChatMessages: Message[];
}

export default function useRolePlayChat(chatID?: string): UseRolePlayChatHook {
	const queryClient = useQueryClient();
	const { message } = useSocketStore();
	const navigate = useNavigate();

	const { mutate } = useMutation<AxiosResponse<{ conversation: Conversation }>, unknown, { adID: string }>({
		mutationFn: async ({ adID }: { adID: string }) => {
			try {
				const response = await axios.post<{ conversation: Conversation }>(
					`${import.meta.env.VITE_BACKEND_BASE_URL}/api/chat/create/${adID}`,
					{},
					{
						withCredentials: true
					}
				);
				return response;
			} catch (error) {
				console.error(error);
				throw error;
			}
		},
		onSuccess: (data) => {
			navigate(`/inbox/${data.data.conversation._id}`);
		}
	});

	const { mutate: messageMutation } = useMutation({
		mutationFn: async ({
			chatID,
			message
		}: {
			chatID: string;
			message: string;
		}) => {
			try {
				await axios.post(
					`${import.meta.env.VITE_BACKEND_BASE_URL}/api/chat/${chatID}/send-message`,
					{ message },
					{
						withCredentials: true
					}
				);
			} catch (error) {
				console.error(error);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["chat-messages", chatID]
			});
		}
	});

	const { data: rolePlayChatMessages } = useQuery({
		queryKey: ["chat-messages", chatID],
		queryFn: async () => {
			try {
				if (!chatID) return [];

				const response = await axios.get(
					`${import.meta.env.VITE_BACKEND_BASE_URL}/api/chat/${chatID}/all-messages`,
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

	const { data: rolePlayChats } = useQuery({
		queryKey: ["chats"],
		queryFn: async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_BACKEND_BASE_URL}/api/chat/all`,
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

	function sendMessage(chatID: string, message: string) {
		if (!message.trim()) return alert("Message cannot be empty");

		messageMutation({ chatID, message });
	}

	function createConversation(adID: string) {
		mutate({ adID });
	}

	useEffect(() => {
		if (message && message.conversation === chatID) {
			queryClient.setQueryData<Message[]>(
				["chat-messages", chatID],
				(oldMessages = []) => [...oldMessages, message]
			);
		}
	}, [message, chatID]);

	return {
		createConversation,
		rolePlayChats,
		sendMessage,
		rolePlayChatMessages
	};
}
