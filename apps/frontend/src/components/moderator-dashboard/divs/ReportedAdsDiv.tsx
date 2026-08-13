import useReport from "../../../hooks/useReport";
import type { ReportAd } from "../../../interfaces";
import ReportedAdCard from "../cards/ReportedAdCard";

export default function ReportedAdsDiv() {
  const { allReports, isAllReportsLoading } = useReport();

  return (
    <div className="bg-slate-900/80 p-5 w-1/2 rounded-md shadow-md text-white border border-sky-600/50 space-y-3">
      <h1 className="text-xl font-semibold">Reported Posts ({allReports?.length})</h1>
      <div>
        {isAllReportsLoading ? (
          <p className="text-center text-slate-400 my-10 text-lg">
            Loading reports...
          </p>
        ) : !allReports?.length ? (
          <p className="text-center text-slate-400 my-10 text-lg">
            No reports found.
          </p>
        ) : (
          allReports?.map((report: ReportAd) => (
            <ReportedAdCard key={report._id} report={report} />
          ))
        )}
      </div>
    </div>
  );
}
