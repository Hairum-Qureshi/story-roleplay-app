export type ReportStatus = "OPEN" | "RESOLVED" | "CLOSED";

export type UserModerationStatus = "ACTIVE" | "WARNED" | "SUSPENDED" | "BANNED";

export type DashboardTab =
  "queue" | "history" | "suspended" | "banned" | "users";

export type ReportItem = {
  id: string;
  subject: string;
  status: ReportStatus;
  age: string;
};

export type ModerationUser = {
  id: string;
  username: string;
  reason: string;
  updatedAt: string;
  status: UserModerationStatus;
};

export type SnapshotItem = {
  label: string;
  value: number;
  tone: string;
};

export type QuickAction = {
  label: string;
  description: string;
  to: string;
};
