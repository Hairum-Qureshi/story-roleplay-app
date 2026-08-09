type ModerationAction = "warn" | "suspend" | "ban";

const actionButtons = [
  { label: "Warn", tone: "amber" },
  { label: "Suspend", tone: "orange" },
  { label: "Ban", tone: "rose" },
] as const;

function getToneClasses(tone: (typeof actionButtons)[number]["tone"]) {
  if (tone === "amber") {
    return "border-amber-400/30 bg-amber-500/10 text-amber-200 hover:bg-amber-500/20";
  }

  if (tone === "orange") {
    return "border-orange-400/30 bg-orange-500/10 text-orange-200 hover:bg-orange-500/20";
  }

  return "border-rose-400/30 bg-rose-500/10 text-rose-200 hover:bg-rose-500/20";
}

export default function ReportHeader({
  id,
  title,
  selectedAction,
  onSelectAction,
  completedAction,
}: {
  id: string;
  title: string;
  selectedAction: ModerationAction | null;
  onSelectAction: (action: ModerationAction) => void;
  completedAction: ModerationAction | null;
}) {
  const completedTone =
    completedAction === "warn"
      ? "amber"
      : completedAction === "suspend"
        ? "orange"
        : "rose";

  return (
    <section className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-6 shadow-[0_8px_30px_rgba(2,6,23,0.45)] backdrop-blur-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-sky-300/80">
            Report Details
          </p>

          <h1 className="mt-2 text-3xl font-semibold">{title}</h1>

          <p className="mt-2 text-sm text-slate-300">Report #{id}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {completedAction ? (
            <span
              className={`rounded-full border px-3 py-2 text-sm font-medium capitalize ${getToneClasses(completedTone)}`}
            >
              user has been
              {completedAction === "warn"
                ? " warned"
                : completedAction === "suspend"
                  ? " suspended"
                  : " banned"}
            </span>
          ) : (
            actionButtons.map((button) => {
              const actionKey = button.label.toLowerCase() as ModerationAction;
              const isSelected = selectedAction === actionKey;

              return (
                <button
                  key={button.label}
                  type="button"
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${getToneClasses(button.tone)} ${
                    isSelected ? "ring-1 ring-white/50" : ""
                  }`}
                  onClick={() => onSelectAction(actionKey)}
                >
                  {button.label} User
                </button>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
