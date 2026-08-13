export default function ReportedMessageCard() {
  return (
    <div className="group rounded-xl border border-slate-700/80 bg-slate-800/40 p-4 text-white shadow-lg shadow-black/10 transition hover:border-sky-500/40 hover:bg-slate-800/50">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-700 text-sm font-semibold text-slate-200">
            JD
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-100">@username</p>

            <p className="text-xs text-slate-500">Reported 12 minutes ago</p>
          </div>
        </div>

        <span className="rounded-full bg-green-500/10 px-2.5 py-1 text-xs font-semibold text-green-400 ring-1 ring-inset ring-green-500/20">
          OPEN
        </span>
      </div>

      {/* Reported Message */}
      <div className="mb-4 rounded-lg border border-slate-700/60 bg-slate-950/40 p-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Reported message
          </p>

          <span className="text-xs text-slate-600">Chat ID: #123</span>
        </div>

        <p className="text-sm leading-relaxed text-slate-200">
          This is the reported message content. It could be a longer message
          that was flagged by another user for violating the community rules.
        </p>
      </div>

      {/* Report Reason */}
      <div className="mb-5">
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500">
          Report reason
        </p>

        <div className="flex items-center gap-2">
          <span className="rounded-md bg-red-500/10 px-2 py-1 text-xs font-semibold text-red-400 ring-1 ring-inset ring-red-500/20">
            Harassment
          </span>

          <span className="text-xs text-slate-500">Reported by @reporter</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          className="rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-2 text-sm font-semibold text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-500/40"
        >
          View Message
        </button>

        <button
          type="button"
          className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm font-semibold text-red-400 transition hover:border-red-500/30 hover:bg-red-500/15 hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-500/30"
        >
          Take Action
        </button>
      </div>
    </div>
  );
}
