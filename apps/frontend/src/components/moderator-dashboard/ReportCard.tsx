import { MdOpenInNew } from "react-icons/md";

export default function ReportCard({
  reportId,
  reportStatus,
  reportSubject,
  reportAge,
  statusPillClasses,
}: {
  reportId: string;
  reportStatus: string;
  reportSubject: string;
  reportAge: string;
  statusPillClasses: (status: string) => string;
}) {
  return (
    <div className="w-full rounded-lg border border-slate-600/40 bg-slate-900/70 px-3 py-2 shadow-[0_1px_2px_rgba(255,255,255,0.04)]">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-slate-400">{reportId}</span>
          <span
            className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${statusPillClasses(reportStatus)}`}
          >
            {reportStatus}
          </span>
        </div>

        <p className="mt-1 text-sm text-slate-100">{reportSubject}</p>
        <p className="mt-1 text-xs text-slate-500">Submitted {reportAge}</p>
      </div>
      <div>
        <MdOpenInNew className="text-slate-400 text-xl" />
      </div>
    </div>
  );
}
