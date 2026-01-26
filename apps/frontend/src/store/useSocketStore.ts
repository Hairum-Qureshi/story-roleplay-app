import { create } from "zustand";
import { io } from "socket.io-client";
import type { SocketStore } from "../interfaces";

const useSocketStore = create<SocketStore>((set, get) => ({
	socket: null,
	rolePlayAd: null,

	connectSocket: (userId: string) => {
		const socket = io(import.meta.env.VITE_BACKEND_BASE_URL, {
			auth: { userId }
		});

		socket.on("connect", () => {
			console.log("Connected:", socket.id);
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
