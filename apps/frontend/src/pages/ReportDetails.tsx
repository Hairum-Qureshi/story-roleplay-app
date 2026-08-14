import ModeratorActionButtons from "../components/report-details/ModeratorActionButtons";
import useReport from "../hooks/useReport";
import { moderationStore } from "../store/useModerationStore";
import { useEffect } from "react";

export default function ReportDetails() {
  const { reportData } = useReport();

  const { setName, setUsername, sentEmail, setProfilePicture } =
    moderationStore();

  useEffect(() => {
    if (reportData) {
      setUsername(reportData?.reported?.username);
      setName(
        `${reportData?.reported?.firstName} ${reportData?.reported?.lastName}`,
      );
      setProfilePicture(reportData?.reported?.profilePicture);
    }
  }, [reportData]);

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <p className="text-sm font-medium text-blue-400">Report Details</p>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                {reportData?.adSnapshot.title || "Report Title"}
              </h1>
              <p className="mt-2 text-slate-400">
                Reported by {reportData?.reporter.username} •{" "}
                {new Date(reportData?.createdAt).toLocaleDateString()}
              </p>
            </div>

            {reportData?.status === "OPEN" ? (
              <span className="w-fit rounded-full bg-yellow-500/10 px-3 py-1 text-sm font-medium text-yellow-400">
                Pending Review
              </span>
            ) : reportData?.status === "RESOLVED" ? (
              <span className="w-fit rounded-full bg-green-500/10 px-3 py-1 text-sm font-medium text-green-400">
                Resolved
              </span>
            ) : (
              <span className="w-fit rounded-full bg-red-500/10 px-3 py-1 text-sm font-medium text-red-400">
                Closed
              </span>
            )}
          </div>
        </div>

        {/* Reported Post */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 shadow-lg">
          <div className="border-b border-slate-800 p-6">
            <h2 className="text-lg font-semibold">Reported Post</h2>
          </div>

          <div className="p-6">
            <div className="mb-4 flex items-center gap-3">
              <img
                src={reportData?.reported?.profilePicture}
                alt="Reported Post"
                className="h-12 w-12 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />

              <div>
                <p className="font-medium">
                  {reportData?.reported?.firstName}{" "}
                  {reportData?.reported?.lastName}
                </p>
                <p className="text-sm text-slate-500">
                  @{reportData?.reported?.username}
                </p>
              </div>
            </div>

            <p className="leading-7 text-slate-300">
              {reportData?.adSnapshot.content || "No content available."}
            </p>
          </div>
        </div>

        {/* Report Information */}
        <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900">
          <div className="border-b border-slate-800 p-6">
            <h2 className="text-lg font-semibold">Report Information</h2>
          </div>

          <div className="grid gap-6 p-6 sm:grid-cols-2">
            <div>
              <p className="text-sm text-slate-500">Reason</p>
              <p className="mt-1 text-slate-200">{reportData?.reason}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Reported User</p>
              <p className="mt-1 text-slate-200">
                @{reportData?.reported?.username}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Report ID</p>
              <p className="mt-1 text-slate-200">#{reportData?._id}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Status</p>
              <p className="mt-1 text-yellow-400">
                {reportData?.status === "OPEN"
                  ? "Pending Review"
                  : reportData?.status === "RESOLVED"
                    ? "Resolved"
                    : "Closed"}
              </p>
            </div>
          </div>
        </div>

        {/* Moderation Actions */}
        <ModeratorActionButtons />
        {/* Resolve Report */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button className="rounded-lg border border-slate-700 bg-slate-800 px-5 py-2.5 font-medium text-slate-300 transition hover:bg-slate-700">
            Dismiss Report
          </button>

          <button
            className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium transition hover:bg-blue-500"
            onClick={() =>
              !sentEmail
                ? alert(
                    "Please send an email to the user before resolving the report.",
                  )
                : alert("Report resolved successfully!")
            }
          >
            Resolve Report
          </button>
        </div>
      </div>
    </div>
  );
}
