import ReportedChatMessage from "./reported-content/ReportedChatMessage";
import ReportedRolePlayAd from "./reported-content/ReportedRolePlayAd";
import type { ReportDetailsData } from "./types";

export default function ReportedContent({
  reportedAdExists,
  isChatReport,
  report,
}: {
  reportedAdExists: boolean;
  isChatReport: boolean;
  report: ReportDetailsData;
}) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Reported Content</h2>

          <p className="mt-1 text-xs text-slate-500">
            Content attached to this moderation report
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        {/* Reported Role-play Ad */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
              Reported Role-play Ad
            </p>

            <span
              className={`rounded-full border px-2 py-1 text-[11px] uppercase tracking-[0.16em] ${
                reportedAdExists
                  ? "border-sky-400/30 bg-sky-500/10 text-sky-200"
                  : "border-slate-700 text-slate-400"
              }`}
            >
              {reportedAdExists ? "Reported" : "Not Reported"}
            </span>
          </div>

          {reportedAdExists ? (
            <ReportedRolePlayAd rolePlayAd={report.rolePlayAd} />
          ) : (
            <p className="mt-3 rounded-lg border border-dashed border-slate-700 bg-slate-900/70 p-3 text-sm text-slate-400">
              Role-play ad was not reported.
            </p>
          )}
        </div>

        {/* Reported Chat Message */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
              Reported Chat Message
            </p>

            <span
              className={`rounded-full border px-2 py-1 text-[11px] uppercase tracking-[0.16em] ${
                isChatReport
                  ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-200"
                  : "border-slate-700 text-slate-400"
              }`}
            >
              {isChatReport ? "Reported" : "Not Reported"}
            </span>
          </div>

          {isChatReport ? (
            <ReportedChatMessage chatMessage={report.chatMessage} />
          ) : (
            <p className="mt-3 rounded-lg border border-dashed border-slate-700 bg-slate-900/70 p-3 text-sm text-slate-400">
              Chat message was not reported.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
