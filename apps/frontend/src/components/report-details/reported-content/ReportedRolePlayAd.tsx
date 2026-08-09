import type { RolePlayAdData } from "../types";

export default function ReportedRolePlayAd({
  rolePlayAd,
}: {
  rolePlayAd: RolePlayAdData;
}) {
  return (
    <div className="mt-3 overflow-hidden rounded-xl border border-sky-500/20 bg-slate-950/60">
      {/* Ad header */}
      <div className="border-b border-slate-800 bg-sky-500/5 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-sky-400/30 bg-sky-500/10 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-sky-200">
                Role-play Ad
              </span>

              <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-emerald-200">
                {rolePlayAd.status}
              </span>
            </div>

            <h3 className="mt-3 text-xl font-semibold text-slate-100">
              {rolePlayAd.title}
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Posted by{" "}
              <span className="font-medium text-slate-200">
                @{rolePlayAd.creator.username}
              </span>
            </p>
          </div>

          <div className="shrink-0 rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2">
            <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
              Ad ID
            </p>

            <p className="mt-1 font-mono text-xs text-slate-300">
              {rolePlayAd.id}
            </p>
          </div>
        </div>
      </div>

      {/* Ad content */}
      <div className="p-4">
        <p className="text-sm leading-7 text-slate-300">
          {rolePlayAd.description}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {rolePlayAd.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Metadata */}
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3">
            <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
              Genre
            </p>

            <p className="mt-1 text-sm text-slate-200">{rolePlayAd.genre}</p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3">
            <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
              Looking For
            </p>

            <p className="mt-1 text-sm text-slate-200">
              {rolePlayAd.lookingFor}
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3">
            <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
              Creator
            </p>

            <p className="mt-1 text-sm text-slate-200">
              @{rolePlayAd.creator.username} (ID: {rolePlayAd.creator.id})
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3">
            <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
              Posted
            </p>

            <p className="mt-1 text-sm text-slate-200">{rolePlayAd.postedAt}</p>
          </div>
        </div>

        {/* Starter sample */}
        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
              Starter Sample
            </p>

            <span className="text-[10px] uppercase tracking-[0.16em] text-slate-600">
              Reported content
            </span>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
            <p className="text-sm leading-7 text-slate-300">
              {rolePlayAd.starterSample}
            </p>
          </div>
        </div>

        {/* Creator identifiers */}
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-3">
            <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
              Creator ID
            </p>

            <p className="mt-1 font-mono text-xs text-slate-300">
              {rolePlayAd.creator.id}
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-3">
            <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
              Content Type
            </p>

            <p className="mt-1 text-xs text-sky-200">Role-play advertisement</p>
          </div>
        </div>
      </div>
    </div>
  );
}
