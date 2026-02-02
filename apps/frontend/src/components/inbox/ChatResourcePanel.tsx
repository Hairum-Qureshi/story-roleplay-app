import { useCurrentUser } from "../../hooks/useCurrentUser";
import type { Conversation } from "../../interfaces";
import UserCard from "./UserCard";

export default function ChatResourcePanel({
	fullWidth,
	selectedChat
}: {
	fullWidth: boolean;
	selectedChat: Conversation | null;
}) {
	const { data: currUserData } = useCurrentUser();
	const isSearching = false;
	return (
		<div
			className={`border border-slate-700 w-1/4 min-h-[100vh - 4rem] max-h-auto ${fullWidth ? "hidden" : "block"}`}
		>
			<div className="m-2">
				<input
					type="text"
					placeholder="Search a phrase in this chat..."
					className="w-full p-2 border border-sky-700 focus:outline-none focus:ring-2 focus:ring-slate-800 rounded bg-slate-900"
				/>
			</div>
			{isSearching ? (
				<div className="m-2">
					<p className="text-sm text-gray-400">Searching...</p>
				</div>
			) : (
				<div className="m-2">
					<h3 className="font-semibold my-2 text-lg text-slate-300 text-center">
						Members in this role-play:
					</h3>
					<div className="space-y-3">
						{selectedChat?.participants.map(
							(member: {
								_id: string;
								username: string;
								profilePicture?: string;
							}) => (
								<UserCard
									key={member._id}
									username={member.username}
									you={member.username === currUserData?.username}
									profilePicture={member.profilePicture || ""}
								/>
							)
						)}
					</div>
				</div>
			)}
			<div className="absolute bottom-0 border border-slate-950">
				<div className="p-4 bg-gray-900 text-white rounded-lg max-w-md">
					<h3 className="text-lg font-semibold mb-2">
						Download Your Conversation History
					</h3>
					<p className="text-sm mb-4 text-gray-300">
						You can download your entire story role-play conversation as a PDF.
						This is handy if you want to read through your entire storyline you
						created with your role-play partner. Please note, the PDF is for
						personal use and cannot be redistributed commercially due to
						copyright.
					</p>
					<button
						className="m-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded-md px-4 py-2 transition-colors duration-200 hover:cursor-pointer"
						onClick={() => {
							window.open(
								`${import.meta.env.VITE_BACKEND_BASE_URL}/pdf/${selectedChat?._id}/role-play`,
								"_blank"
							);
						}}
					>
						Download Conversation History
					</button>
				</div>
			</div>
		</div>
	);
}
