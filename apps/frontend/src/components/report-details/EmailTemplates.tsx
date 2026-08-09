import { useState } from "react";

type TemplateKey = "ban" | "warn" | "suspend";

const initialTemplates: Record<TemplateKey, string> = {
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
  suspend: `Hello {{username}},

Your account has been temporarily suspended for violating our community guidelines. The suspension will remain in place until the review period ends.

Please take time to review the rules and prepare to return once the suspension expires.

Thanks,
The TaleWeaver Moderation Team`,
};

export default function EmailTemplates() {
  const [templates, setTemplates] = useState(initialTemplates);
  const [activeTemplate, setActiveTemplate] = useState<TemplateKey>("warn");

  function updateTemplate(key: TemplateKey, value: string) {
    setTemplates((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Email Templates</h2>

        <span className="text-xs text-slate-400">
          Editable moderation messages
        </span>
      </div>

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

      <div className="mt-4">
        <label className="text-sm font-medium text-slate-200">
          {activeTemplate.charAt(0).toUpperCase() + activeTemplate.slice(1)}{" "}
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

      <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-300">
        <p className="font-medium text-slate-100">Tip</p>

        <p className="mt-2 leading-6">
          Keep the tone calm, clear, and community-focused. You can edit the
          message here before sending it to the user.
        </p>
      </div>
    </div>
  );
}
