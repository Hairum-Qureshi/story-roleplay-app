import { create } from "zustand";
import { io } from "socket.io-client";
import type { SocketStore } from "../interfaces";
import type { Message } from "../interfaces";

const useSocketStore = create<SocketStore>((set, get) => ({
	socket: null,
	rolePlayAd: null,
	message: null,
	endedConversationID: null,
	typing: false,
	partnerID: null,
	partnerUsername: null,
	setTyping: (typing: boolean) => set({ typing }),
	connectSocket: (userId: string) => {
		const socket = io(import.meta.env.VITE_BACKEND_BASE_URL, {
			auth: { userId }
		});

		socket.on("connect", () => {
			console.log("Connected:", socket.id);
			set({ socket });
		});

		socket.on("connect_error", err => {
			console.error("❌", err.message);
		});

		socket.on("disconnect", () => {
			console.log("Disconnected");
		});

		socket.on("connected", data => {
			console.log("Backend confirmed:", data);
		});

		socket.on("newRolePlayAd", ad => {
			set({ rolePlayAd: ad });
		});

		socket.on("newMessage", (message: Message) => {
			set({ message });
		});

		socket.on("conversationEnded", ({ chatID }: { chatID: string }) => {
			set({ endedConversationID: chatID });
		});

		socket.on(
			"typingIndicator",
			({
				typing,
				partnerUsername
			}: {
				typing: boolean;
				partnerUsername: string;
			}) => {
				set({ typing, partnerUsername });
			}
		);

		socket.connect();
		set({ socket });
	},

	disconnectSocket: () => {
		const socket = get().socket;
		if (!socket) return;

		socket.disconnect();
		socket.removeAllListeners();
		set({ socket: null });
	}
}));

export default useSocketStore;
