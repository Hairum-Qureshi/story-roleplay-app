export default function UserCard({
	username,
	you,
	profilePicture
}: {
	username: string;
	you: boolean;
	profilePicture: string;
}) {
	return (
		<div className="w-full border border-slate-700 rounded-lg py-1 px-2 bg-slate-900">
			<div className="flex items-center">
				<img
					src={profilePicture}
					alt="User avatar"
					className="h-10 w-10 rounded-md border border-slate-700 object-cover inline-block mr-3"
					referrerPolicy="no-referrer"
				/>
				<h2 className="text-lg font-light">
					@{username}{" "}
					{you && <span className="text-gray-400 italic text-sm">(you)</span>}
				</h2>
			</div>
		</div>
	);
}
