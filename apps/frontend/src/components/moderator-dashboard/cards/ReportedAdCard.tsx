import { useNavigate } from "react-router-dom";
import type { ReportAd } from "../../../interfaces";
import { RxOpenInNewWindow } from "react-icons/rx";

export default function ReportedAdCard({ report }: { report: ReportAd }) {
  const navigate = useNavigate();

  return (
    <div className="group rounded-xl border border-slate-700/90 bg-slate-800/40 p-4 text-white shadow-lg shadow-black/10 transition hover:border-sky-500/40 hover:bg-slate-800/50 hover:shadow-sky-950/20">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="mb-1 flex items-center gap-2">
            <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-semibold text-green-400 ring-1 ring-inset ring-green-500/20">
              {report.status.toUpperCase()}
            </span>
            <span className="text-xs font-medium text-slate-500">
              AD ID: #{report._id}
            </span>
          </div>
          <h2 className="truncate text-lg font-semibold tracking-tight text-slate-100">
            {report.adSnapshot.title}
          </h2>
        </div>
      </div>
      <div className="mb-4 rounded-lg border border-slate-700/60 bg-slate-950/40 p-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Reported by
            </p>
            <p className="mt-0.5 text-sm font-medium text-slate-200">
              @{report.reporter.username}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Posted by
            </p>
            <p className="mt-0.5 text-sm font-medium text-slate-200">
              @{report.reported.username}
            </p>
          </div>
        </div>
      </div>
      <div className="mb-5">
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500">
          Description
        </p>
        <p className="line-clamp-2 text-sm leading-relaxed text-slate-400">
          {report.adSnapshot.premise}
        </p>
      </div>
      <div className="mb-5">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
          Report Reason
        </p>
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3 wrap-break-word">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-red-500/10 text-red-400 ring-1 ring-inset ring-red-500/20">
              !
            </div>
            <div className="min-w-0">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-red-500/10 px-2 py-0.5 text-xs font-semibold text-red-400 ring-1 ring-inset ring-red-500/20">
                  {report.reason}
                </span>
              </div>

              {report.reportDetails && (
                <p className="text-sm leading-relaxed text-slate-300">
                  {report.reportDetails}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          className="rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-2 text-sm font-semibold text-slate-300 transition hover:cursor-pointer hover:border-slate-600 hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-500/40"
          onClick={() => navigate(`/report/${report._id}`)}
        >
          View Report
          <span>
            <RxOpenInNewWindow className="ml-1 inline-block text-lg font-bold" />
          </span>
        </button>
      </div>
    </div>
  );
}
