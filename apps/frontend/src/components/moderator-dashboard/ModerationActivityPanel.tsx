import type {
  DashboardTab,
  ModerationUser,
  ReportItem,
  ReportStatus,
  UserModerationStatus,
} from "./types";
import ReportCard from "./ReportCard";

function statusPillClasses(status: string) {
  if (status === "OPEN") {
    return "border border-rose-400/30 bg-rose-500/20 text-rose-300";
  }

  if (status === "RESOLVED") {
    return "border border-emerald-400/30 bg-emerald-500/20 text-emerald-300";
  }

  return "border border-slate-500/40 bg-slate-700/60 text-slate-200";
}

function userStatusPillClasses(status: UserModerationStatus) {
  if (status === "ACTIVE") {
    return "border border-emerald-400/30 bg-emerald-500/20 text-emerald-300";
  }

  if (status === "WARNED") {
    return "border border-amber-400/30 bg-amber-500/20 text-amber-300";
  }

  if (status === "SUSPENDED") {
    return "border border-orange-400/30 bg-orange-500/20 text-orange-300";
  }

  return "border border-rose-400/30 bg-rose-500/20 text-rose-300";
}

const tabs: Array<{ key: DashboardTab; label: string }> = [
  { key: "queue", label: "Current Queue" },
  { key: "history", label: "History" },
  { key: "suspended", label: "Suspended Users" },
  { key: "banned", label: "Banned Users" },
  { key: "users", label: "All Users" },
];

export default function ModerationActivityPanel({
  activeTab,
  setActiveTab,
  query,
  setQuery,
  isReportTab,
  statusFilter,
  setStatusFilter,
  userStatusFilter,
  setUserStatusFilter,
  filteredReports,
  filteredUsers,
  revokeSuspension,
  revokeBan,
}: {
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
  query: string;
  setQuery: (query: string) => void;
  isReportTab: boolean;
  statusFilter: "ALL" | ReportStatus;
  setStatusFilter: (status: "ALL" | ReportStatus) => void;
  userStatusFilter: "ALL" | UserModerationStatus;
  setUserStatusFilter: (status: "ALL" | UserModerationStatus) => void;
  filteredReports: ReportItem[];
  filteredUsers: ModerationUser[];
  revokeSuspension: (userId: string) => void;
  revokeBan: (userId: string) => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/80 lg:col-span-2">
      <div className="space-y-4 border-b border-slate-800 px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Report Activity</h2>
          <span className="text-xs text-slate-400">Last 24 hours</span>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-slate-800/70 p-1 sm:w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                activeTab === tab.key
                  ? "bg-sky-500/20 text-sky-200"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={
              isReportTab
                ? "Search by report ID or summary..."
                : "Search by user ID, username, or moderation note..."
            }
            className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-sky-500/60 focus:outline-none"
          />

          {isReportTab ? (
            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value as "ALL" | ReportStatus)
              }
              className="rounded-lg border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-200 focus:border-sky-500/60 focus:outline-none"
            >
              <option value="ALL">All statuses</option>
              <option value="OPEN">Open</option>
              <option value="RESOLVED">Resolved</option>
              <option value="CLOSED">Closed</option>
            </select>
          ) : (
            <select
              value={userStatusFilter}
              onChange={(event) =>
                setUserStatusFilter(
                  event.target.value as "ALL" | UserModerationStatus,
                )
              }
              className="rounded-lg border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-200 focus:border-sky-500/60 focus:outline-none"
            >
              <option value="ALL">All statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="WARNED">Warned</option>
              <option value="SUSPENDED">Suspended</option>
              <option value="BANNED">Banned</option>
            </select>
          )}
        </div>
      </div>

      <div className="divide-y divide-slate-800">
        {isReportTab ? (
          filteredReports.length > 0 ? (
            filteredReports.map((report) => (
              <div
                key={report.id}
                className="flex flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:justify-between"
              >
                <ReportCard
                  reportID={report.id}
                  reportStatus={report.status}
                  reportSubject={report.subject}
                  statusPillClasses={statusPillClasses}
                />
              </div>
            ))
          ) : (
            <div className="px-5 py-10 text-center text-sm text-slate-400">
              No reports found for this search/filter.
            </div>
          )
        ) : filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="flex flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium text-slate-400">
                    {user.id}
                  </span>
                  <span className="text-sm font-semibold text-slate-100">
                    @{user.username}
                  </span>
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${userStatusPillClasses(user.status)}`}
                  >
                    {user.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-300">{user.reason}</p>
                <p className="mt-1 text-xs text-slate-500">
                  Updated {user.updatedAt}
                </p>
              </div>

              {activeTab === "suspended" ? (
                <button
                  type="button"
                  onClick={() => revokeSuspension(user.id)}
                  className="rounded-lg border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-200 transition-colors hover:bg-emerald-500/20"
                >
                  Revoke Suspend
                </button>
              ) : activeTab === "banned" ? (
                <button
                  type="button"
                  onClick={() => revokeBan(user.id)}
                  className="rounded-lg border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-200 transition-colors hover:bg-emerald-500/20"
                >
                  Revoke Ban
                </button>
              ) : null}
            </div>
          ))
        ) : (
          <div className="px-5 py-10 text-center text-sm text-slate-400">
            No users found for this search/filter.
          </div>
        )}
      </div>
    </div>
  );
}
