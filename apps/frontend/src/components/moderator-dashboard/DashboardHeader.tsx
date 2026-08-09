export default function DashboardHeader({ username }: { username?: string }) {
  return (
    <section className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-6 shadow-[0_8px_30px_rgba(2,6,23,0.45)] backdrop-blur-sm md:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
            Moderation Dashboard
          </h1>
          <p className="mt-3 max-w-2xl leading-relaxed text-slate-300">
            Welcome back{username ? `, @${username}` : ""}. Here is a quick look
            at moderation activity and what needs your attention next.
          </p>
        </div>
      </div>
    </section>
  );
}
