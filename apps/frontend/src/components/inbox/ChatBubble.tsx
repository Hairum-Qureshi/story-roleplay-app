import reactStringReplace from "react-string-replace";
import moment from "moment";
import { FaEdit, FaTrash } from "react-icons/fa";

interface ChatBubbleProps {
	messageData: {
		message: string;
		you: boolean;
		timestamp: string;
	};
	onEdit?: () => void;
	onDelete?: () => void;
	chatEnded: boolean;
}

export default function ChatBubble({
	messageData,
	onEdit,
	onDelete,
	chatEnded
}: ChatBubbleProps) {
	const { message, you, timestamp } = messageData;

	function formatMessage(text: string): React.ReactNode {
		text = text.replace(/^> (.+)$/gm, (_, match) => `\u0000BQ${match}\u0000`);

		let replaced: React.ReactNode[] = reactStringReplace(
			text,
			/\*\*(.+?)\*\*/g,
			(match, i) => <strong key={`b-${i}`}>{formatMessage(match)}</strong>
		);

		replaced = reactStringReplace(replaced, /\*(.+?)\*/g, (match, i) => (
			<em key={`i-${i}`}>{formatMessage(match)}</em>
		));

		replaced = reactStringReplace(replaced, /__(.+?)__/g, (match, i) => (
			<u key={`u-${i}`}>{formatMessage(match)}</u>
		));

		replaced = reactStringReplace(
			replaced,
			/\u0000BQ(.+?)\u0000/g,
			(match, i) => (
				<blockquote
					key={`q-${i}`}
					className="border-l-4 border-sky-600 mt-2 pl-4 italic text-sky-300"
				>
					{match}
				</blockquote>
			)
		);

		return replaced;
	}

	return (
		<div className={`m-2 max-w-lg ${you ? "ml-auto" : "mr-auto"}`}>
			<div
				className={`group rounded-2xl ${
					you ? "rounded-tr-sm bg-blue-950" : "rounded-tl-sm bg-gray-800"
				} px-4 py-3 shadow-md border border-gray-700`}
			>
				<p className="text-sm text-gray-100 leading-relaxed">
					{formatMessage(message)}
				</p>

				{/* Footer row */}
				<div className="mt-1 flex items-center justify-end gap-2 text-xs text-gray-400">
					{!chatEnded && you && (onEdit || onDelete) && (
						<div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
							{onEdit && (
								<button
									onClick={onEdit}
									className="hover:text-blue-400 hover:cursor-pointer"
									aria-label="Edit message"
								>
									<FaEdit size={14} />
								</button>
							)}
							{onDelete && (
								<button
									onClick={onDelete}
									className="hover:text-red-400 hover:cursor-pointer"
									aria-label="Delete message"
								>
									<FaTrash size={12} />
								</button>
							)}
						</div>
					)}

					<span>{moment(timestamp).format("hh:mm A MMM D")}</span>
				</div>
			</div>
		</div>
	);
}
