import type { SnapshotItem } from "./types";

export default function ModerationSnapshotGrid({
  items,
}: {
  items: SnapshotItem[];
}) {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <article
          key={item.label}
          className="rounded-xl border border-slate-700 bg-slate-900/80 p-5 transition-colors hover:border-sky-500/50"
        >
          <p className="text-sm text-slate-400">{item.label}</p>
          <p className={`mt-2 text-3xl font-semibold ${item.tone}`}>
            {item.value}
          </p>
        </article>
      ))}
    </section>
  );
}
