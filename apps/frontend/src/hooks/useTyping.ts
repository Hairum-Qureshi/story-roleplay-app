import { useRef } from "react";
import useSocketStore from "../store/useSocketStore";

interface UseTypingHook {
	typingIndicator: (partnerID: string, partnerUsername: string) => void;
}

export default function useTyping(): UseTypingHook {
	const keyUpTimer = useRef<number | null>(null);
	const { socket } = useSocketStore();

	function typingIndicator(partnerID: string, partnerUsername: string) {
		if (!partnerID) return;

		socket?.emit("typingIndicator", { typing: true, partnerID });

		if (keyUpTimer.current) {
			clearTimeout(keyUpTimer.current);
		}

		keyUpTimer.current = window.setTimeout(() => {
			socket?.emit("typingIndicator", {
				typing: false,
				partnerID,
				partnerUsername
			});
		}, 500); // half a second
	}

	return { typingIndicator };
}
