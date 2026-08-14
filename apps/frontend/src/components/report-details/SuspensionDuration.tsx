import { useEffect, useState } from "react";
import { moderationStore } from "../../store/useModerationStore";

export default function SuspensionDuration() {
  const [days, setDays] = useState(7);
  const { setSuspensionDuration } = moderationStore();

  const decrement = () => {
    setDays((current) => Math.max(1, current - 1));
  };

  const increment = () => {
    setDays((current) => current + 1);
  };

  const handleDaysChange = (value: string) => {
    if (value === "") {
      setDays(0);
      return;
    }

    const number = Number(value);

    if (!Number.isNaN(number)) {
      setDays(Math.max(1, number));
      setSuspensionDuration(Math.max(1, number));
    }
  };

  useEffect(() => {
    setSuspensionDuration(days);
  }, [days]);

  return (
    <div className="rounded-xl border border-slate-700 bg-blue-950/30 p-5 text-white shadow-lg shadow-black/10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-slate-100">
              Suspension Duration
            </h3>
          </div>

          <p className="mt-1.5 text-xs text-slate-400">
            Choose how long the user will be suspended.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={decrement}
            disabled={days <= 1}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-600 bg-slate-900 text-lg text-slate-300 transition hover:border-slate-500 hover:bg-slate-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Decrease suspension duration"
          >
            −
          </button>

          {/* Editable Duration */}
          <div className="flex h-11 min-w-24 items-center justify-center rounded-lg border border-slate-600 bg-slate-900 px-3 focus-within:border-blue-500/70 focus-within:ring-2 focus-within:ring-blue-500/10">
            <input
              type="number"
              min={1}
              max={400}
              value={days || ""}
              onChange={(event) => {
                let number = Number(event.target.value);
                if (number > 400) number = 400;
                handleDaysChange(number.toString());
              }}
              onBlur={() => {
                if (days < 1) {
                  setDays(1);
                }
              }}

              className="w-10 bg-transparent text-center text-lg font-semibold text-slate-100 outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              aria-label="Suspension duration in days"
            />

            <span className="ml-1 text-xs uppercase tracking-wide text-slate-500">
              days
            </span>
          </div>
          <button
            type="button"
            onClick={increment}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-600 bg-slate-900 text-lg text-slate-300 transition hover:border-slate-500 hover:bg-slate-700 hover:text-white"
            aria-label="Increase suspension duration"
          >
            +
          </button>
        </div>
      </div>

      <div className="mt-4 border-t border-slate-700/70 pt-4">
        <p className="text-xs text-slate-400">
          The user will be unable to post for{" "}
          <span className="font-medium text-slate-200">
            {days.toLocaleString("en-US") || 1} {days === 1 ? "day" : "days"}
          </span>
          .
        </p>
      </div>
    </div>
  );
}
