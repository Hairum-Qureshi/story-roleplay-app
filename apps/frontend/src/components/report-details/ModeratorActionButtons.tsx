import { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import ModerationEmailPanel from "./ModerationEmailPanel";
import { moderationStore } from "../../store/useModerationStore";

export default function ModeratorActionButtons() {
  const [action, setAction] = useState<
    "WARN" | "SUSPEND" | "BAN" | "DELETE" | null
  >(null);
  const { setSentEmail } = moderationStore();

  return (
    <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900">
      <div className="border-b border-slate-800 p-6">
        <h2 className="text-lg font-semibold">Moderation Actions</h2>
        <p className="mt-1 text-sm text-slate-500">
          Choose an action to take against the reported content or user.
        </p>
      </div>

      {!action || action === "DELETE" ? (
        <div className="grid gap-3 p-6 sm:grid-cols-2">
          {/* Warn */}
          <button
            className="group rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 text-left transition hover:border-blue-500/50 hover:bg-blue-500/10 hover:cursor-pointer"
            onClick={() => setAction("WARN")}
          >
            <span className="block font-medium text-slate-200 group-hover:text-blue-400">
              Warn User
            </span>
            <span className="mt-1 block text-sm font-normal text-slate-500">
              Send a warning to this user.
            </span>
          </button>

          {/* Suspend */}
          <button
            className="group rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 text-left transition hover:border-blue-500/50 hover:bg-blue-500/10 hover:cursor-pointer"
            onClick={() => setAction("SUSPEND")}
          >
            <span className="block font-medium text-slate-200 group-hover:text-blue-400">
              Suspend User
            </span>
            <span className="mt-1 block text-sm font-normal text-slate-500">
              Temporarily prevent the user from posting.
            </span>
          </button>

          {/* Ban */}
          <button
            className="group rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 text-left transition hover:border-red-500/40 hover:bg-red-500/5 hover:cursor-pointer"
            onClick={() => setAction("BAN")}
          >
            <span className="block font-medium text-slate-200 group-hover:text-red-400">
              Ban User
            </span>
            <span className="mt-1 block text-sm font-normal text-slate-500">
              Permanently remove this user's access.
            </span>
          </button>

          {/* Delete */}
          <button
            className="group rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 text-left transition hover:border-red-500/40 hover:bg-red-500/5 hover:cursor-pointer"
            onClick={() => setAction("DELETE")}
          >
            <span className="block font-medium text-slate-200 group-hover:text-red-400">
              Delete Post
            </span>
            <span className="mt-1 block text-sm font-normal text-slate-500">
              Permanently remove the reported post.
            </span>
          </button>
        </div>
      ) : (
        <div className="p-6">
          <button
            className="flex items-center gap-2 font-medium text-sky-300 hover:text-sky-400 hover:cursor-pointer"
            onClick={() => {
              setAction(null);
              setSentEmail(false);
            }}
          >
            <IoMdArrowRoundBack />
            <span>Go Back</span>
          </button>
          <ModerationEmailPanel moderatorAction={action} />
        </div>
      )}
    </div>
  );
}
