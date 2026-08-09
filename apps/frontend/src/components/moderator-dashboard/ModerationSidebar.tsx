import { Link } from "react-router-dom";
import type { QuickAction } from "./types";

export default function ModerationSidebar({
  quickActions,
}: {
  quickActions: QuickAction[];
}) {
  return (
    <aside className="space-y-4">
      <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-5">
        <h3 className="text-base font-semibold">Quick Actions</h3>
        <div className="mt-4 space-y-3">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              to={action.to}
              className="block rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-3 transition-colors hover:border-sky-500/40 hover:bg-slate-800"
            >
              <p className="text-sm font-medium text-slate-100">
                {action.label}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                {action.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-700 bg-linear-to-br from-slate-900 via-slate-900 to-sky-950/40 p-5">
        <h3 className="text-base font-semibold">Moderation Note</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          Focus first on safety-related reports, then spam patterns, then
          quality issues. If context is unclear, leave a clear note before
          escalating.
        </p>
      </div>
    </aside>
  );
}
