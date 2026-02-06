import type { ChatHeaderProps } from "../../interfaces";

export default function ChatHeader({
	fullWidth,
	fullWidthToggle,
	selectedChat,
	endedConversationID,
	endRolePlayConversation
}: ChatHeaderProps) {
	return (
		<div className="w-full border-b border-slate-700 flex items-center">
			<h3
				className={
					fullWidth
						? "text-lg w-[54%] truncate overflow-hidden font-semibold mr-auto ml-4"
						: "w-[32%] ml-3 truncate font-semibold text-lg"
				}
			>
				{selectedChat?.title}
			</h3>
			<div
				className={`m-2 bg-red-500 border border-red-600 rounded-md px-2 py-1 ${
					selectedChat?.chatEnded || endedConversationID
						? "cursor-not-allowed opacity-50"
						: "hover:bg-red-600 active:bg-red-700 hover:cursor-pointer"
				}`}
				onClick={() => {
					if (!selectedChat?.chatEnded && !endedConversationID) {
						endRolePlayConversation(selectedChat!._id);
					}
				}}
			>
				{selectedChat?.chatEnded || endedConversationID
					? "Ended"
					: "End Role-Play"}
			</div>
			<select className="m-2 border border-white rounded-md px-2 py-1 hover:cursor-pointer">
				<option value="" disabled selected>
					Choose Character
				</option>
				<option value="character1">Character 1</option>
				<option value="character2">Character 2</option>
				<option value="character3">Character 3</option>
			</select>
			<button
				onClick={() => fullWidthToggle(!fullWidth)}
				className="m-2 border border-white rounded-md px-2 py-1 hover:cursor-pointer justify-end"
			>
				{fullWidth ? "Show" : "Hide"} Side Panel
			</button>
		</div>
	);
}
