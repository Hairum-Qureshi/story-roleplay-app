import { useState } from "react";
import { MdExpandLess, MdExpandMore, MdOpenInNew } from "react-icons/md";
import ReportCard from "./ReportCard";

type PostReportGroupProps = {
  postId: string;
  postTitle: string;
  postUrl: string;
  reportIds: string[];
  reportStatuses: string[];
  reportSubjects: string[];
  reportAges: string[];
  statusPillClasses: (status: string) => string;
};

function prioritizeStatus(statuses: string[]) {
  if (statuses.includes("OPEN")) return "OPEN";
  if (statuses.includes("RESOLVED")) return "RESOLVED";
  return "CLOSED";
}

export default function PostReportGroup({
  postId,
  postTitle,
  postUrl,
  reportIds,
  reportStatuses,
  reportSubjects,
  reportAges,
  statusPillClasses,
}: PostReportGroupProps) {
  const [isOpen, setIsOpen] = useState(true);
  const topStatus = prioritizeStatus(reportStatuses);

  return (
    <div className="rounded-xl border border-slate-700/70 bg-slate-900/70 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_8px_24px_rgba(2,6,23,0.25)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-slate-400">{postId}</span>
            <span
              className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${statusPillClasses(topStatus)}`}
            >
              {topStatus}
            </span>
            <span className="inline-flex rounded-full border border-slate-600/60 bg-slate-800 px-2 py-0.5 text-[11px] font-semibold text-slate-200">
              {reportIds.length} {reportIds.length === 1 ? "report" : "reports"}
            </span>
          </div>

          <p className="mt-1 text-sm font-semibold text-slate-100">
            {postTitle}
          </p>

          <a
            href={postUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-1 inline-flex items-center gap-1 text-xs text-sky-300 underline decoration-sky-500/40 underline-offset-4"
          >
            View post URL
            <MdOpenInNew className="text-sm" />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex items-center gap-1 self-start rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:bg-slate-700"
        >
          {isOpen ? "Hide" : "Show"} {reportIds.length} report
          {reportIds.length === 1 ? "" : "s"}
          {isOpen ? (
            <MdExpandLess className="text-base" />
          ) : (
            <MdExpandMore className="text-base" />
          )}
        </button>
      </div>

      {isOpen ? (
        <div className="mt-4 space-y-2 border-t border-slate-800 pt-3">
          {reportIds.map((reportId, index) => (
            <div
              key={reportId}
              className="flex flex-col rounded-lg shadow-sm shadow-slate-950/20 md:flex-row md:items-center bg-slate-800 border border-slate-800/80 px-4 py-3"
            >
              <ReportCard
                reportId={reportId}
                reportStatus={reportStatuses[index]}
                reportSubject={reportSubjects[index]}
                reportAge={reportAges[index]}
                statusPillClasses={statusPillClasses}
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
