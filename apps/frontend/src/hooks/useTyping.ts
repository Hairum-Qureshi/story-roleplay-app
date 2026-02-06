import { useRef } from "react";
import useSocketStore from "../store/useSocketStore";

interface UseTypingHook {
	typingIndicator: (
		partnerID: string,
		partnerUsername: string,
		currentChatID: string
	) => void;
}

export default function useTyping(): UseTypingHook {
	const keyUpTimer = useRef<number | null>(null);
	const { socket } = useSocketStore();

	function typingIndicator(
		partnerID: string,
		partnerUsername: string,
		currentChatID: string
	) {
		if (!partnerID || !socket) return;

		socket?.emit("typingIndicator", {
			typing: true,
			partnerID,
			partnerUsername,
			currentTypingChatID: currentChatID
		});

		if (keyUpTimer.current) {
			clearTimeout(keyUpTimer.current);
		}

		keyUpTimer.current = window.setTimeout(() => {
			socket?.emit("typingIndicator", {
				typing: false,
				partnerID,
				partnerUsername,
				currentTypingChatID: currentChatID
			});
		}, 500);
	}

	return { typingIndicator };
}
