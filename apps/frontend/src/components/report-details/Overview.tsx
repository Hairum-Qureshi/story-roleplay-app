type OverviewProps = {
  reporter: string;
  reportedUser: string;
  submittedAt: string;
  status: string;
};

export default function Overview({
  reporter,
  reportedUser,
  submittedAt,
  status,
}: OverviewProps) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-5">
      <h2 className="text-lg font-semibold">Overview</h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
            Reporter
          </p>

          <p className="mt-2 text-sm text-slate-100">{reporter}</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
            Reported User
          </p>

          <p className="mt-2 text-sm text-slate-100">{reportedUser}</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
            Submitted
          </p>

          <p className="mt-2 text-sm text-slate-100">{submittedAt}</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
            Status
          </p>

          <p className="mt-2 text-sm text-slate-100">{status}</p>
        </div>
      </div>
    </div>
  );
}
