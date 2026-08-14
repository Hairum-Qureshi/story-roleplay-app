import { moderationStore } from "../../store/useModerationStore";
import SuspensionDuration from "./SuspensionDuration";
import { CiWarning } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { IoMdCheckmark } from "react-icons/io";
import EmailEditor from "./EmailEditor";
import useReport from "../../hooks/useReport";

export default function ModerationEmailPanel({
  moderatorAction,
}: {
  moderatorAction: "WARN" | "SUSPEND" | "BAN";
}) {
  const { sentEmail } = moderationStore();
  const { sendApologyModeratorEmailMutation, reportData } = useReport();

  const actionStyles = {
    WARN: {
      border: "border-blue-500/20",
      background: "bg-blue-500/5",
      iconBackground: "bg-blue-500/10",
      icon: "text-blue-400",
      badge: "border-blue-500/20 bg-blue-500/10 text-blue-400",
      label: "Warn User",
      description:
        "This email will notify the user that they have received a warning.",
    },
    SUSPEND: {
      border: "border-yellow-500/20",
      background: "bg-yellow-500/5",
      iconBackground: "bg-yellow-500/10",
      icon: "text-yellow-400",
      badge: "border-yellow-500/20 bg-yellow-500/10 text-yellow-400",
      label: "Suspend User",
      description:
        "This email will notify the user that their account has been temporarily suspended.",
    },
    BAN: {
      border: "border-red-500/20",
      background: "bg-red-500/5",
      iconBackground: "bg-red-500/10",
      icon: "text-red-400",
      badge: "border-red-500/20 bg-red-500/10 text-red-400",
      label: "Ban User",
      description:
        "This email will notify the user that their account has been permanently banned.",
    },
  };

  const action = actionStyles[moderatorAction];

  return (
    <div className="my-3 text-white">
      {/* Moderation Action */}
      <div
        className={`my-3 rounded-lg border p-4 ${action.border} ${action.background}`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${action.iconBackground} ${action.icon}`}
          >
            <CiWarning className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Moderation Action
              </p>

              <span
                className={`rounded-full border px-2 py-0.5 text-xs font-medium ${action.badge}`}
              >
                {action.label}
              </span>
            </div>

            <p className="mt-1.5 text-sm text-slate-400">
              {action.description}
            </p>
          </div>
        </div>
      </div>

      {moderatorAction === "SUSPEND" && !sentEmail && (
        <div className="my-4">
          <SuspensionDuration />
        </div>
      )}

      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-xl">
          {/* Header */}
          <div className="border-b border-slate-800">
            <div className="flex items-center justify-between px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                  <CiMail className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-sm font-semibold text-slate-100">
                    Email Message
                  </h2>

                  <p className="mt-0.5 text-xs text-slate-500">
                    Compose a message to the user
                  </p>
                </div>
              </div>
            </div>
          </div>

          {sentEmail ? (
            <div className="border-t border-slate-800 bg-slate-900/60 p-6">
              <div className="flex flex-col items-center text-center">
                {/* Success Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                  <IoMdCheckmark className="h-6 w-6" />
                </div>

                {/* Message */}
                <h3 className="mt-4 text-base font-semibold text-slate-100">
                  Email Sent Successfully
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  The email has been successfully delivered to the user.
                </p>

                {/* Apology Action */}
                <div className="mt-5 flex flex-col items-center gap-2 sm:flex-row">
                  <p className="text-xs text-slate-500">
                    Sent something by mistake?
                  </p>

                  <button
                    type="button"
                    className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-700 hover:text-white hover:cursor-pointer"
                    onClick={() => {
                      if (
                        confirm(
                          "Are you sure you want to send an apology email to the user? This action cannot be undone.",
                        )
                      ) {
                        sendApologyModeratorEmailMutation({
                          reportedUserEmail: reportData?.reported?.email,
                          reportedUserUsername:
                            reportData?.reported?.username || "",
                          actionTaken: moderatorAction,
                        });
                        alert("Apology email sent successfully!");
                      }
                    }}
                  >
                    Send Apology Email
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <EmailEditor moderatorAction={moderatorAction} />
          )}
        </div>
      </div>
    </div>
  );
}
