import { useState } from "react";
import { moderationStore } from "../../store/useModerationStore";

type TemplateKey = "ban" | "warn" | "suspend";

const suspensionPresets = [1, 3, 7, 14, 30];

function clampSuspensionDays(days: number) {
  if (Number.isNaN(days)) return 1;
  return Math.min(365, Math.max(1, days));
}

function getSuspensionReturnDate(days: number) {
  const returnDate = new Date();
  returnDate.setDate(returnDate.getDate() + days);

  return returnDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function buildSuspensionTemplate(days: number) {
  return `Hello {{username}},

Your account has been temporarily suspended for ${days} days due to violations of our community guidelines.

You will be able to return on ${getSuspensionReturnDate(days)}.

Please take time to review the rules and prepare to return once your suspension period ends.

Thanks,
The TaleWeaver Moderation Team`;
}

const initialTemplates = (
  suspensionDays: number,
): Record<TemplateKey, string> => ({
  ban: `Hello {{username}},

Your account has been banned from TaleWeaver due to repeated violations of our community guidelines. This action is final unless you contact support to appeal.

We take safety and respectful play seriously, and we expect all users to follow the rules in the future.

Thanks,
The TaleWeaver Moderation Team`,
  warn: `Hello {{username}},

This is a warning regarding behavior that violated our community guidelines. Please review the rules and adjust your conduct in future interactions.

If this behavior continues, additional moderation action may follow.

Thanks,
The TaleWeaver Moderation Team`,
  suspend: buildSuspensionTemplate(suspensionDays),
});

function templateLabel(template: TemplateKey) {
  if (template === "warn") return "warning";
  if (template === "suspend") return "suspension";
  return "ban";
}

export default function EmailTemplates({ username }: { username: string }) {
  const [suspensionDays, setSuspensionDays] = useState(7);
  const [templates, setTemplates] = useState(initialTemplates(7));
  const [activeTemplate, setActiveTemplate] = useState<TemplateKey>("warn");
  const [sentTemplate, setSentTemplate] = useState<TemplateKey | null>(null);
  const setEmailSent = moderationStore((state) => state.setSentEmail);

  function updateSuspensionDays(nextDays: number) {
    const clamped = clampSuspensionDays(nextDays);
    setSuspensionDays(clamped);
    setTemplates((prev) => ({
      ...prev,
      suspend: buildSuspensionTemplate(clamped),
    }));
  }

  function updateTemplate(key: TemplateKey, value: string) {
    setTemplates((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function sendEmail() {
    setSentTemplate(activeTemplate);
    setEmailSent(true);
  }

  return (
    <div className="flex min-h-0 max-h-[78vh] flex-col rounded-2xl border border-slate-700 bg-slate-900/80 p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Email Templates</h2>

        <span className="text-xs text-slate-400">
          Editable moderation messages
        </span>
      </div>

      {sentTemplate ? (
        <div className="mt-4 flex min-h-0 flex-1 items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-6">
          <p className="text-center text-sm font-medium text-emerald-200">
            {templateLabel(sentTemplate)} email sent to user {username}
          </p>
        </div>
      ) : (
        <>
          <div className="mt-4 flex flex-wrap gap-2">
            {(["warn", "suspend", "ban"] as TemplateKey[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTemplate(key)}
                className={`rounded-full px-3 py-1.5 text-sm capitalize transition-colors ${
                  activeTemplate === key
                    ? "bg-sky-500/20 text-sky-200"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {key}
              </button>
            ))}
          </div>

          <div className="mt-4 flex min-h-0 flex-1 flex-col overflow-y-auto pr-1">
            {activeTemplate === "suspend" ? (
              <div className="rounded-xl border border-orange-400/30 bg-orange-500/10 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-orange-200">
                  Suspension Duration
                </p>

                <div className="mt-2 flex flex-wrap gap-2">
                  {suspensionPresets.map((presetDays) => (
                    <button
                      key={presetDays}
                      type="button"
                      onClick={() => updateSuspensionDays(presetDays)}
                      className={`rounded-md border px-2.5 py-1 text-xs transition-colors ${
                        suspensionDays === presetDays
                          ? "border-orange-300/50 bg-orange-300/20 text-orange-100"
                          : "border-orange-400/30 bg-orange-500/5 text-orange-200 hover:bg-orange-500/20"
                      }`}
                    >
                      {presetDays}d
                    </button>
                  ))}
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateSuspensionDays(suspensionDays - 1)}
                    className="rounded-md border border-orange-400/30 bg-orange-500/5 px-2.5 py-1 text-sm text-orange-200 hover:bg-orange-500/20"
                  >
                    -
                  </button>

                  <input
                    type="number"
                    min={1}
                    max={365}
                    value={suspensionDays}
                    onChange={(event) => {
                      const parsed = Number.parseInt(event.target.value, 10);
                      updateSuspensionDays(parsed);
                    }}
                    className="w-24 rounded-md border border-orange-400/30 bg-slate-950/80 px-2 py-1 text-sm text-orange-100 focus:border-orange-300/60 focus:outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => updateSuspensionDays(suspensionDays + 1)}
                    className="rounded-md border border-orange-400/30 bg-orange-500/5 px-2.5 py-1 text-sm text-orange-200 hover:bg-orange-500/20"
                  >
                    +
                  </button>

                  <span className="text-xs text-orange-100/80">days</span>
                </div>

                <p className="mt-2 text-xs text-orange-100/80">
                  Return date: {getSuspensionReturnDate(suspensionDays)}
                </p>
              </div>
            ) : null}

            <div className="mt-4">
              <label className="text-sm font-medium text-slate-200">
                {activeTemplate.charAt(0).toUpperCase() +
                  activeTemplate.slice(1)}{" "}
                Template
              </label>

              <textarea
                value={templates[activeTemplate]}
                onChange={(event) =>
                  updateTemplate(activeTemplate, event.target.value)
                }
                rows={12}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-500/60 focus:outline-none"
              />
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={sendEmail}
                className="rounded-lg border border-sky-400/40 bg-sky-500/10 px-3 py-2 text-sm font-medium text-sky-200 transition-colors hover:bg-sky-500/20"
              >
                {activeTemplate === "suspend"
                  ? "Send Suspension Email"
                  : "Send Email"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
