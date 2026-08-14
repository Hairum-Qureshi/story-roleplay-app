import { useEffect, useState } from "react";
import { moderationStore } from "../../store/useModerationStore";
import SuspensionDuration from "./SuspensionDuration";
import { FaArrowRight } from "react-icons/fa6";
import { CiWarning } from "react-icons/ci";
import { CiMail } from "react-icons/ci";

const EMAIL_DRAFTS = {
  WARN: {
    subject: "Community Guidelines Warning",
    body: "Dear {{User}},\n\nWe are writing to let you know that we identified activity on your account that may violate our Community Guidelines.\n\nThis message serves as a formal warning. Please review our Community Guidelines and make sure your future activity complies with them. Continued violations may result in additional enforcement action, including temporary suspension or permanent removal of your account.\n\nIf you believe this warning was issued in error or have questions about the decision, please contact our support team.\n\nBest regards,\nThe Moderation Team",
  },

  SUSPEND: {
    subject: "Account Suspension Notice",
    body: "Dear {{User}},\n\nYour account has been temporarily suspended for {{suspensionDuration}} days (until {{date}}) due to a violation of our Community Guidelines.\n\nDuring the suspension period, you will not be able to access or use your account. We encourage you to review our Community Guidelines before returning to the platform to help ensure that future activity remains compliant.\n\nIf you believe this suspension was issued in error or would like to request a review, please contact our support team through the appropriate appeal process.\n\nBest regards,\nThe Moderation Team",
  },

  BAN: {
    subject: "Permanent Account Ban Notice",
    body: "Dear {{User}},\n\nWe are writing to inform you that your account has been permanently banned due to repeated or serious violations of our Community Guidelines.\n\nAs a result, you will no longer be able to access or use this account. This decision has been made following a review of the relevant activity.\n\nIf you believe this action was taken in error, you may submit an appeal through our designated appeals process. Please review our Community Guidelines for additional information about account enforcement.\n\nBest regards,\nThe Moderation Team",
  },
};

export default function EmailEditor({
  moderatorAction,
}: {
  moderatorAction: "WARN" | "SUSPEND" | "BAN";
}) {
  const {
    suspensionDuration,
    username,
    name,
    sentEmail,
    setSentEmail,
    profilePicture,
  } = moderationStore();
  const [emailContent, setEmailContent] = useState(
    EMAIL_DRAFTS[moderatorAction].body
      .replace("{{suspensionDuration}}", suspensionDuration.toString())
      .replace(
        "{{date}}",
        new Date(
          Date.now() + suspensionDuration * 24 * 60 * 60 * 1000,
        ).toLocaleDateString(),
      )
      .replace("{{User}}", username),
  );
  const [emailSubject, setEmailSubject] = useState(
    EMAIL_DRAFTS[moderatorAction].subject,
  );

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

  useEffect(() => {
    setEmailContent(
      EMAIL_DRAFTS[moderatorAction].body
        .replace("{{suspensionDuration}}", suspensionDuration.toString())
        .replace(
          "{{date}}",
          new Date(
            Date.now() + suspensionDuration * 24 * 60 * 60 * 1000,
          ).toLocaleDateString(),
        )
        .replace("{{User}}", username),
    );
  }, [suspensionDuration]);

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

      {moderatorAction === "SUSPEND" && (
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
            <div className="p-6 text-center text-green-400">
              <p className="text-lg font-semibold">Email Sent Successfully!</p>
              <p className="mt-1 text-sm">
                The email has been sent to the user.
              </p>
            </div>
          ) : (
            <>
              {/* Email Details */}
              <div className="border-b border-slate-800 px-6 py-5">
                {/* Recipient */}
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Recipient
                  </p>

                  <div className="mt-2 flex items-center gap-3">
                    <img
                      src={profilePicture}
                      alt="User Avatar"
                      className="h-10 w-10 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />

                    <div>
                      <p className="text-sm font-medium text-slate-200">
                        {name}
                      </p>

                      <p className="text-xs text-slate-500">@{username}</p>
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div className="mt-5">
                  <label
                    htmlFor="email-subject"
                    className="text-xs font-medium uppercase tracking-wide text-slate-500"
                  >
                    Subject
                  </label>

                  <input
                    id="email-subject"
                    type="text"
                    defaultValue="Important notice regarding your account"
                    className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm font-medium text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-blue-500/70 focus:ring-2 focus:ring-blue-500/10"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                  />
                </div>
              </div>

              {/* Message */}
              <div className="p-6">
                <label className="mb-3 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Message
                </label>

                <div className="overflow-hidden rounded-xl border border-slate-600 bg-slate-800 shadow-lg shadow-black/10 transition focus-within:border-blue-500/70 focus-within:ring-2 focus-within:ring-blue-500/10">
                  <textarea
                    rows={16}
                    defaultValue={emailContent}
                    value={emailContent}
                    onChange={(e) => setEmailContent(e.target.value)}
                    placeholder="Compose your message here..."
                    className="w-full resize-none bg-transparent px-5 py-5 text-sm leading-7 text-slate-100 outline-none placeholder:text-slate-500"
                  />

                  <div className="flex items-center justify-between border-t border-slate-700 bg-slate-800/80 px-4 py-2.5">
                    <span className="text-xs text-slate-500">
                      Markdown is not supported
                    </span>

                    <span className="text-xs text-slate-600">
                      {emailContent.length} characters
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-slate-800 bg-slate-900 px-6 py-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <CiWarning className="h-4 w-4 text-slate-400" />

                      <p className="text-sm text-slate-400">
                        This email will be sent immediately once you hit the
                        "Send Email" button.
                      </p>
                    </div>

                    <p className="mt-1 pl-6 text-xs text-slate-600">
                      Make sure your message is ready before sending.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-700 hover:text-white hover:cursor-pointer">
                      Save Draft
                    </button>

                    {/* disable send email if the textarea and input field are empty */}
                    <button
                      className="group flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-900/20 transition hover:bg-blue-500 active:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:active:bg-blue-500 hover:cursor-pointer"
                      disabled={!emailContent.trim() || !emailSubject.trim()}
                      onClick={() => setSentEmail(true)}
                    >
                      Send Email
                      <FaArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
