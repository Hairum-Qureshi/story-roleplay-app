import reactStringReplace from "react-string-replace";
import moment from "moment";
import { FaEdit, FaTrash } from "react-icons/fa";
import type { ChatBubbleProps } from "../../interfaces";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useRolePlayChat from "../../hooks/useRolePlayChat";

export default function ChatBubble({
	messageData,
	onDelete,
	chatEnded,
	isDeleted,
	isEdited,
	messageID,
	isSystemMessage
}: ChatBubbleProps) {
	const { message, you, timestamp } = messageData;
	const [editMode, setEditMode] = useState(false);
	const [editedMessage, setEditedMessage] = useState(message);
	const { chatID } = useParams();
	const { editMessage } = useRolePlayChat(chatID);

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
					className="mt-2 border-l-4 border-sky-600 pl-4 italic text-sky-300"
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
				className={`group rounded-2xl border border-gray-700 shadow-md ${
					you ? "rounded-tr-sm bg-blue-950" : "rounded-tl-sm bg-gray-800"
				} ${editMode ? "p-2" : "px-4 py-3"}`}
			>
				{editMode && !isDeleted ? (
					<>
						<textarea
							className="
								w-full
								min-h-[48px]
								resize-none
								rounded-md
								border border-gray-700
								bg-gray-900
								px-2 py-1.5
								text-sm text-gray-100
								leading-relaxed
								focus:outline-none
								focus:ring-1 focus:ring-blue-500
								transition
							"
							autoFocus
							value={editedMessage}
							onChange={e => {
								setEditedMessage(e.target.value);
								e.target.style.height = "auto";
								e.target.style.height = `${e.target.scrollHeight}px`;
							}}
						/>

						<div className="mt-1 flex justify-end gap-3 text-xs">
							<button
								onClick={() => {
									setEditedMessage(message);
									setEditMode(false);
								}}
								className="text-gray-400 hover:text-gray-200 transition hover:cursor-pointer"
							>
								Cancel
							</button>

							<button
								onClick={() => {
									chatID && editMessage(chatID, messageID, editedMessage);
									setEditMode(false);
								}}
								className="font-medium text-blue-400 hover:text-blue-300 transition hover:cursor-pointer"
							>
								Save
							</button>
						</div>
					</>
				) : message === "This message has been deleted." ? (
					<p className="italic text-gray-400">{message}</p>
				) : (
					<p className="whitespace-pre-wrap text-sm leading-relaxed break-words">
						{formatMessage(message)}
					</p>
				)}

				{/* Footer row */}
				<div className="mt-1 flex items-center justify-end gap-2 text-xs text-gray-400">
					{!chatEnded && !isDeleted && you && onDelete && (
						<div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
							<button
								onClick={() => setEditMode(true)}
								className="hover:text-blue-400 hover:cursor-pointer"
								aria-label="Edit message"
							>
								<FaEdit size={14} />
							</button>
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
					{isEdited && !isDeleted && (
						<span className="italic text-sky-500">(edited)</span>
					)}
					<span>{moment(timestamp).format("hh:mm A MMM D")}</span>
				</div>
			</div>
		</div>
	);
}
