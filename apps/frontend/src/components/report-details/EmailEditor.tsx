import { useEffect, useState } from "react";
import { moderationStore } from "../../store/useModerationStore";
import { FaArrowRight } from "react-icons/fa6";
import { CiWarning } from "react-icons/ci";
import useReport from "../../hooks/useReport";

const EMAIL_DRAFTS = {
  WARN: {
    subject: "Community Guidelines Warning",
    body: "Dear {{User}},\n\nWe are writing to let you know that we identified activity on your account that may violate our Community Guidelines.\n\nWhat does this mean?\nThis is a formal warning, but your account has not been suspended or permanently removed. You can continue using the platform, but future violations may result in additional enforcement action, including a temporary suspension or permanent removal of your account.\n\nPlease review our Community Guidelines and make sure your future activity complies with them. We recommend taking this warning into account when posting, messaging, or otherwise using the platform.\n\nIf you believe this warning was issued in error or have questions about the decision, please contact us through our contact form.\n\nPlease note that this email address is not monitored for replies. Replies to this message will not receive a response. If you need to contact us regarding this notice, please use our contact form.\n\nBest regards,\nThe Taleweaver Moderation Team",
  },

  SUSPEND: {
    subject: "Account Suspension Notice",
    body: "Dear {{User}},\n\nYour account has been temporarily suspended for {{suspensionDuration}} days (until {{date}}) due to a violation of our Community Guidelines.\n\nWhat does this mean?\nYour account is temporarily unavailable during the suspension period. You will not be able to sign in, access your account, or use the platform until the suspension ends on {{date}}. Your account is not permanently removed, and access is expected to be restored after the suspension period, unless additional enforcement action is taken.\n\nBefore returning to the platform, we encourage you to review our Community Guidelines and make sure your future activity remains compliant. Further violations may result in additional enforcement action, including a longer suspension or permanent removal of your account.\n\nIf you believe this suspension was issued in error or would like to request a review, please contact our support team through our contact page.\n\nPlease note that this email address is not monitored for replies. Replies to this message will not receive a response. If you need to contact us regarding this suspension, please use our contact page.\n\nBest regards,\nThe Taleweaver Moderation Team",
  },

  BAN: {
    subject: "Permanent Account Ban Notice",
    body: "Dear {{User}},\n\nWe are writing to inform you that your account has been permanently banned due to repeated or serious violations of our Community Guidelines.\n\nWhat does this mean?\nYour account has been permanently removed from the platform and you will no longer be able to access or use it. Unlike a temporary suspension, this action does not have a scheduled end date. Any applicable information about your remaining account data, content, or appeal options is provided through our relevant policies and processes.\n\nThis decision was made following a review of the relevant activity. We encourage you to review our Community Guidelines to better understand the policies involved.\n\nIf you believe this action was taken in error, you may submit an appeal through our designated appeals process. Please include any relevant information that you believe should be considered as part of the review through our site's contact form.\n\nPlease note that this email address is not monitored for replies. Replies to this message will not receive a response. If you need to contact us regarding this notice or submit an appeal, please use our site's contact form.\n\nBest regards,\nThe Taleweaver Moderation Team",
  },
};

export default function EmailEditor({
  moderatorAction,
}: {
  moderatorAction: "WARN" | "SUSPEND" | "BAN";
}) {
  const { suspensionDuration, username, name, profilePicture } =
    moderationStore();
  const { reportData } = useReport();

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
    <>
      <div className="border-b border-slate-800 px-6 py-5">
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
              <p className="text-sm font-medium text-slate-200">{name}</p>

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
        <div className="mb-3 flex items-center justify-between gap-3">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Message
          </label>

          <button
            type="button"
            className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-700 hover:cursor-pointer hover:text-white"
            onClick={() =>
              confirm(
                "Are you sure you want to refetch the original template? This will overwrite any work you've written.",
              ) &&
              setEmailContent(
                EMAIL_DRAFTS[moderatorAction].body
                  .replace(
                    "{{suspensionDuration}}",
                    suspensionDuration.toString(),
                  )
                  .replace(
                    "{{date}}",
                    new Date(
                      Date.now() + suspensionDuration * 24 * 60 * 60 * 1000,
                    ).toLocaleDateString(),
                  )
                  .replace("{{User}}", username),
              )
            }
          >
            Refetch Template Email
          </button>
        </div>

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
                This email will be sent immediately once you hit the "Send
                Email" button.
              </p>
            </div>

            <p className="mt-1 pl-6 text-xs text-slate-600">
              Make sure your message is ready before sending.
            </p>
          </div>

          <div className="flex gap-3">
            {!emailContent ||
              (emailContent
                .replace(username, "{{User}}")
                .replace(
                  suspensionDuration.toString(),
                  "{{suspensionDuration}}",
                )
                .replace(
                  new Date(
                    Date.now() + suspensionDuration * 24 * 60 * 60 * 1000,
                  ).toLocaleDateString(),
                  "{{date}}",
                ) !== EMAIL_DRAFTS[moderatorAction].body && (
                <button
                  className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-700 hover:text-white hover:cursor-pointer"
                  onClick={() => alert("Feature coming soon!")}
                >
                  Save Draft
                </button>
              ))}

            {/* disable send email if the textarea and input field are empty */}
            <button
              className="group flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-900/20 transition hover:bg-blue-500 active:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:active:bg-blue-500 hover:cursor-pointer"
              disabled={!emailContent.trim() || !emailSubject.trim()}
              onClick={() => alert("Feature coming soon!")}
            >
              Send Email
              <FaArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
