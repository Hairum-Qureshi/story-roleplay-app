import { useMemo, useState } from "react";
import DashboardHeader from "../components/moderator-dashboard/DashboardHeader";
import ModerationActivityPanel from "../components/moderator-dashboard/ModerationActivityPanel";
import ModerationSidebar from "../components/moderator-dashboard/ModerationSidebar";
import ModerationSnapshotGrid from "../components/moderator-dashboard/ModerationSnapshotGrid";
import type {
  DashboardTab,
  ModerationUser,
  QuickAction,
  ReportItem,
  ReportStatus,
  SnapshotItem,
  UserModerationStatus,
} from "../components/moderator-dashboard/types";
import { useCurrentUser } from "../hooks/useCurrentUser";

const moderationSnapshot: SnapshotItem[] = [
  { label: "Open Reports", value: 14, tone: "text-rose-300" },
  { label: "Active Warnings", value: 22, tone: "text-amber-300" },
  { label: "Suspensions", value: 5, tone: "text-orange-300" },
  { label: "Resolved Today", value: 9, tone: "text-emerald-300" },
];

const reportQueue: ReportItem[] = [
  {
    id: "RPT-2401",
    subject: "Boundary violations in private role-play",
    status: "OPEN",
    age: "26m ago",
  },
  {
    id: "RPT-2398",
    subject: "Repeated spam ad posting",
    status: "OPEN",
    age: "1h ago",
  },
  {
    id: "RPT-2393",
    subject: "Impersonation concern in ad description",
    status: "OPEN",
    age: "2h ago",
  },
];

const reportHistory: ReportItem[] = [
  {
    id: "RPT-2395",
    subject: "Harassment in inbox thread",
    status: "RESOLVED",
    age: "3h ago",
  },
  {
    id: "RPT-2391",
    subject: "Mismatched content warnings on ad",
    status: "CLOSED",
    age: "6h ago",
  },
  {
    id: "RPT-2388",
    subject: "Off-topic spam messages",
    status: "RESOLVED",
    age: "1d ago",
  },
];

const initialSuspendedUsers: ModerationUser[] = [
  {
    id: "USR-1082",
    username: "NightQuill",
    reason: "Repeated harassment in private threads",
    updatedAt: "2h ago",
    status: "SUSPENDED",
  },
  {
    id: "USR-1027",
    username: "Inkbreaker",
    reason: "Spam reports validated by moderation",
    updatedAt: "7h ago",
    status: "SUSPENDED",
  },
];

const initialBannedUsers: ModerationUser[] = [
  {
    id: "USR-0911",
    username: "MaskOfStatic",
    reason: "Severe policy violation with prior warnings",
    updatedAt: "1d ago",
    status: "BANNED",
  },
  {
    id: "USR-0839",
    username: "VoidSignal",
    reason: "Evasion of prior suspension and repeated abuse",
    updatedAt: "4d ago",
    status: "BANNED",
  },
];

const initialAllUsers: ModerationUser[] = [
  {
    id: "USR-1082",
    username: "NightQuill",
    reason: "Repeated harassment in private threads",
    updatedAt: "2h ago",
    status: "SUSPENDED",
  },
  {
    id: "USR-1027",
    username: "Inkbreaker",
    reason: "Spam reports validated by moderation",
    updatedAt: "7h ago",
    status: "SUSPENDED",
  },
  {
    id: "USR-0911",
    username: "MaskOfStatic",
    reason: "Severe policy violation with prior warnings",
    updatedAt: "1d ago",
    status: "BANNED",
  },
  {
    id: "USR-0839",
    username: "VoidSignal",
    reason: "Evasion of prior suspension and repeated abuse",
    updatedAt: "4d ago",
    status: "BANNED",
  },
  {
    id: "USR-1156",
    username: "RuneLumen",
    reason: "No active moderation flags",
    updatedAt: "just now",
    status: "ACTIVE",
  },
  {
    id: "USR-1102",
    username: "AshLore",
    reason: "Final warning issued for repeated boundary pushes",
    updatedAt: "5h ago",
    status: "WARNED",
  },
];

const quickActions: QuickAction[] = [
  {
    label: "Review Reports",
    description: "Open the pending moderation queue.",
    to: "/role-play-ads",
  },
  {
    label: "Community Guidelines",
    description: "Double-check policy language before action.",
    to: "/guidelines",
  },
];

export default function ModeratorDashboard() {
  const { data: currUserData } = useCurrentUser();
  const [activeTab, setActiveTab] = useState<DashboardTab>("queue");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | ReportStatus>("ALL");
  const [userStatusFilter, setUserStatusFilter] = useState<
    "ALL" | UserModerationStatus
  >("ALL");

  const [suspendedUsers, setSuspendedUsers] = useState(initialSuspendedUsers);
  const [bannedUsers, setBannedUsers] = useState(initialBannedUsers);
  const [allUsers, setAllUsers] = useState(initialAllUsers);

  const activeReports = activeTab === "queue" ? reportQueue : reportHistory;

  const filteredReports = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return activeReports.filter((report) => {
      const matchesStatus =
        statusFilter === "ALL" ? true : report.status === statusFilter;
      const matchesQuery =
        normalizedQuery.length === 0
          ? true
          : report.id.toLowerCase().includes(normalizedQuery) ||
            report.subject.toLowerCase().includes(normalizedQuery);

      return matchesStatus && matchesQuery;
    });
  }, [activeReports, query, statusFilter]);

  const activeUsers = useMemo(() => {
    if (activeTab === "suspended") return suspendedUsers;
    if (activeTab === "banned") return bannedUsers;
    return allUsers;
  }, [activeTab, suspendedUsers, bannedUsers, allUsers]);

  const filteredUsers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return activeUsers.filter((user) => {
      const matchesStatus =
        userStatusFilter === "ALL" ? true : user.status === userStatusFilter;
      const matchesQuery =
        normalizedQuery.length === 0
          ? true
          : user.id.toLowerCase().includes(normalizedQuery) ||
            user.username.toLowerCase().includes(normalizedQuery) ||
            user.reason.toLowerCase().includes(normalizedQuery);

      return matchesStatus && matchesQuery;
    });
  }, [activeUsers, query, userStatusFilter]);

  function revokeSuspension(userId: string) {
    setSuspendedUsers((prev) => prev.filter((user) => user.id !== userId));
    setAllUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, status: "ACTIVE" as const } : user,
      ),
    );
  }

  function revokeBan(userId: string) {
    setBannedUsers((prev) => prev.filter((user) => user.id !== userId));
    setAllUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, status: "ACTIVE" as const } : user,
      ),
    );
  }

  const isReportTab = activeTab === "queue" || activeTab === "history";

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-28 -left-20 h-72 w-72 rounded-full bg-sky-500/15 blur-3xl" />
        <div className="absolute top-44 right-0 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8 md:py-12 space-y-8">
        <DashboardHeader username={currUserData?.username} />

        <ModerationSnapshotGrid items={moderationSnapshot} />

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ModerationActivityPanel
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            query={query}
            setQuery={setQuery}
            isReportTab={isReportTab}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            userStatusFilter={userStatusFilter}
            setUserStatusFilter={setUserStatusFilter}
            filteredReports={filteredReports}
            filteredUsers={filteredUsers}
            revokeSuspension={revokeSuspension}
            revokeBan={revokeBan}
          />

          <ModerationSidebar quickActions={quickActions} />
        </section>
      </div>
    </div>
  );
}
