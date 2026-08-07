import { IoMdClose } from "react-icons/io";

export default function UserCard({
  username,
  you,
  profilePicture,
  isBlockedFlag,
}: {
  username: string;
  you: boolean;
  profilePicture: string;
  isBlockedFlag: boolean;
}) {
  return (
    <button
      className="
                w-full
                flex
                items-center
                gap-3
                rounded-lg
                px-2.5
                py-2
                text-left
                transition-colors
                hover:bg-slate-800/80
            "
    >
      {username?.includes("deleted_user") ? (
        <IoMdClose className="h-10 w-10 text-red-500" />
      ) : (
        <img
          src={profilePicture}
          alt={`${username}'s avatar`}
          referrerPolicy="no-referrer"
          className="
                    h-10
                    w-10
                    rounded-lg
                    object-cover
                    border
                    border-slate-700
                    shrink-0
                "
        />
      )}

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate text-sm font-medium text-slate-100">
            @{username}
          </span>

          {you && (
            <span className="rounded bg-sky-500/10 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-sky-400">
              You
            </span>
          )}

          {!you && isBlockedFlag && (
            <span className="rounded bg-red-500/10 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-red-400">
              Blocked
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
