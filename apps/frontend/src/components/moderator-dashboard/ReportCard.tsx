import { MdOpenInNew } from "react-icons/md";

export default function ReportCard({
  reportID,
  reportStatus,
  reportSubject,
  statusPillClasses,
}: {
  reportID: string;
  reportStatus: string;
  reportSubject: string;
  statusPillClasses: (status: string) => string;
}) {
  return (
    <>
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-400">{reportID}</span>
          <span
            className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${statusPillClasses(reportStatus)}`}
          >
            {reportStatus}
          </span>
        </div>
        <p className="mt-1 text-sm text-slate-100">{reportSubject}</p>
      </div>
      <div>
        <MdOpenInNew className="text-slate-400 text-xl" />
      </div>
    </>
  );
}
