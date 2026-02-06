import { useState } from "react";
import useRolePlayChat from "../../hooks/useRolePlayChat";
import useTyping from "../../hooks/useTyping";
import type { ChatFooterProps } from "../../interfaces";

export default function ChatFooter({
	partner,
	partnerUsername,
	selectedChat
}: ChatFooterProps) {
	const [message, setMessage] = useState("");
	const { sendMessage } = useRolePlayChat(selectedChat?._id || "");
	const { typingIndicator } = useTyping();

	return (
		<div className="flex items-center space-x-2 w-full">
			<textarea
				className="flex-1 bg-transparent w-full resize-none outline-none text-white placeholder-slate-400 h-17 p-2 focus:ring-0 rounded-md"
				placeholder="Type your message..."
				value={message}
				onChange={e => {
					setMessage(e.target.value);
					typingIndicator(partner, partnerUsername, selectedChat?._id || "");
				}}
			/>
			{selectedChat && (
				<button
					className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 transition-colors duration-200 rounded-md"
					onClick={() => {
						sendMessage(selectedChat._id, message);
						setMessage("");
					}}
				>
					Send
				</button>
			)}
		</div>
	);
}
