import type { UserData } from "../../../interfaces";

export default function UserCard({ user }: { user: UserData }) {
  function showModerationStyling(status: string) {
    switch (status) {
      case "WARNED":
        return (
          <span className="ml-auto rounded-full bg-yellow-500/10 px-2 py-0.5 text-xs text-yellow-400">
            WARNED
          </span>
        );
      case "SUSPENDED":
        return (
          <span className="ml-auto rounded-full bg-orange-500/10 px-2 py-0.5 text-xs text-orange-400">
            SUSPENDED
          </span>
        );
      case "BANNED":
        return (
          <span className="ml-auto rounded-full bg-red-500/10 px-2 py-0.5 text-xs text-red-400">
            BANNED
          </span>
        );
      default:
        return "";
    }
  }

  return (
    <div className="flex w-full items-center gap-4 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-white">
      <img
        src={user.profilePicture}
        alt={user.username}
        className="h-10 w-10 rounded-full object-cover"
        referrerPolicy="no-referrer"
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-medium">{user.username}</p>

          {user.moderation.status === "NONE" ? (
            <span className="rounded-full my-1 bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-400 ml-auto">
              GOOD STANDING
            </span>
          ) : (
            showModerationStyling(user.moderation.status)
          )}
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span>User ID: {user._id}</span>
          <span
            className={`ml-auto rounded-full px-2 py-0.5 text-xs ${user.role === "admin" ? "bg-red-500/10 text-red-400" : user.role === "moderator" ? "text-amber-400 bg-amber-500/10" : "bg-blue-500/10 text-blue-400"}`}
          >
            {user.role.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
}
