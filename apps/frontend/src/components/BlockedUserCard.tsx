import useUser from "../hooks/useUser";

export default function BlockedUserCard({
  userID,
  username,
  profilePicture,
}: {
  userID: string;
  username: string;
  profilePicture?: string;
}) {
  const { unBlockUserMutation } = useUser();
  return (
    <div className="flex items-center justify-between w-full p-4 bg-slate-900 border border-slate-800 rounded-lg">
      <div className="flex items-center gap-4">
        <img
          src={profilePicture}
          alt={`${username}'s profile`}
          className="w-12 h-12 rounded-full object-cover border border-slate-700"
        />

        <span className="text-slate-100 font-medium">{username}</span>

        <button
          className="
        rounded-md
        border border-red-700/50
        bg-red-900/20
        px-4 py-2
        text-sm font-medium
        text-red-400
        transition-colors
        hover:bg-red-900/40
        hover:text-red-300
        hover:cursor-pointer
      "
          onClick={() => {
            confirm("Are you sure you want to unblock this user?") &&
              unBlockUserMutation(userID);
          }}
        >
          Unblock
        </button>
      </div>
    </div>
  );
}
