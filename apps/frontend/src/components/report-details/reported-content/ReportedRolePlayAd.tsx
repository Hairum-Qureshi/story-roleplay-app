import type { RolePlayAdData } from "../types";

export default function ReportedRolePlayAd({
  rolePlayAd,
}: {
  rolePlayAd: RolePlayAdData;
}) {
  return (
    <div className="mt-3 overflow-hidden rounded-2xl border border-sky-500/25 bg-slate-950/95 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
      <div className="border-b border-slate-800/80 bg-sky-500/10 p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-sky-400/30 bg-sky-500/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-sky-200">
                Role-play Ad
              </span>

              <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-emerald-200">
                {rolePlayAd.status}
              </span>
            </div>

            <h3 className="mt-3 text-xl font-semibold text-slate-100">
              {rolePlayAd.title}
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Posted by{" "}
              <span className="font-medium text-slate-200">
                @{rolePlayAd.creator.username}
              </span>
            </p>
          </div>

          <div className="shrink-0 rounded-xl border border-slate-800/80 bg-slate-900/80 px-3 py-2">
            <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
              Ad ID
            </p>
            <p className="mt-1 font-mono text-xs text-slate-300">
              {rolePlayAd.id}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-4">
          <p className="text-sm leading-7 text-slate-300">
            {rolePlayAd.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {rolePlayAd.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-slate-700 bg-slate-950/70 px-2.5 py-1 text-xs text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-slate-800/80 bg-slate-900/70 p-3">
            <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
              Post URL
            </p>
            <a
              href={rolePlayAd.postUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-1 block break-all text-sm text-sky-300 underline decoration-sky-500/40 underline-offset-4 transition hover:text-sky-200"
            >
              {rolePlayAd.postUrl}
            </a>
          </div>

          <div className="rounded-xl border border-slate-800/80 bg-slate-900/70 p-3">
            <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
              Genre
            </p>
            <p className="mt-1 text-sm text-slate-200">{rolePlayAd.genre}</p>
          </div>

          <div className="rounded-xl border border-slate-800/80 bg-slate-900/70 p-3">
            <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
              Looking For
            </p>
            <p className="mt-1 text-sm text-slate-200">
              {rolePlayAd.lookingFor}
            </p>
          </div>

          <div className="rounded-xl border border-slate-800/80 bg-slate-900/70 p-3">
            <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
              Posted
            </p>
            <p className="mt-1 text-sm text-slate-200">{rolePlayAd.postedAt}</p>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-slate-800/80 bg-slate-950/70 p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
              Starter Sample
            </p>
            <span className="text-[10px] uppercase tracking-[0.16em] text-slate-600">
              Reported content
            </span>
          </div>

          <div className="mt-3 rounded-xl border border-slate-800 bg-slate-900/80 p-4">
            <p className="text-sm leading-7 text-slate-300">
              “{rolePlayAd.starterSample}”
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-slate-800/80 bg-slate-900/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
              Creator
            </p>
            <p className="mt-1 text-sm text-slate-200">
              @{rolePlayAd.creator.username} (ID: {rolePlayAd.creator.id})
            </p>
          </div>

          <div className="rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-200">
            Role-play advertisement
          </div>
        </div>
      </div>
    </div>
  );
}
