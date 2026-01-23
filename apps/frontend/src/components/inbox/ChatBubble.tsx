interface ChatBubbleProps {
	you: boolean;
	message: string;
}

export default function ChatBubble({ you, message }: ChatBubbleProps) {
	return (
		<div className={`m-2 max-w-lg ${you ? "ml-auto" : "mr-auto"}`}>
			<div
				className={`relative rounded-2xl ${you ? "rounded-tr-sm bg-blue-950" : "rounded-tl-sm bg-gray-800"} px-4 py-3 shadow-md border border-gray-700`}
			>
				<p className="text-sm text-gray-100 leading-relaxed">{message}</p>
				<span className="block mt-1 text-xs text-gray-400 text-right">
					12:45 PM
				</span>
			</div>
		</div>
	);
}
