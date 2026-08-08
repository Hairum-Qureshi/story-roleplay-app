import { Modal } from "react-responsive-modal";
import { IoIosWarning } from "react-icons/io";
import { FaChevronRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "react-responsive-modal/styles.css";
import "../css/index.css";

export default function ReportModal({
  openModal,
  onCloseModal,
}: {
  openModal: boolean;
  onCloseModal: () => void;
}) {
  return (
    <div>
      <Modal open={openModal} onClose={() => onCloseModal()} center>
        <div className="w-full max-w-md rounded-2xl p-6 text-white">
          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-400">
              <IoIosWarning className="h-6 w-6" />
            </div>

            <div>
              <h2 className="text-lg font-semibold">Report Roleplay</h2>
              <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                Help us understand what went wrong with this roleplay.
              </p>
            </div>
          </div>
          <div className="space-y-2">
            {[
              "Underage or minor-related sexual content",
              "Purely sexual or smut-focused ad",
              "Hate speech, slurs, or extremist content",
              "This ad is plagiarized or stolen content",
              "Doxxing or sharing personal/contact information",
              "Unrelated content or spam",
              "Other",
            ].map((reason) => (
              <button
                key={reason}
                type="button"
                className="group flex w-full items-center justify-between rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-3 text-left text-sm text-zinc-200 transition hover:border-red-500/50 hover:bg-red-500/10 hover:text-white hover:cursor-pointer"
              >
                <span>{reason}</span>

                <FaChevronRight className="h-4 w-4 text-zinc-400 transition group-hover:text-red-500" />
              </button>
            ))}
          </div>

          <p className="mt-4 text-xs text-zinc-400">
            Need more context? Review our{" "}
            <Link
              to="/guidelines"
              className="text-sky-400 underline underline-offset-2 hover:text-sky-300"
            >
              community guidelines
            </Link>
            .
          </p>

          <div className="mt-6 flex items-center justify-between border-t border-zinc-800 pt-4">
            <p className="text-xs text-sky-500">
              Reports are reviewed by our moderation team.
            </p>

            <button
              type="button"
              onClick={() => onCloseModal()}
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-400 transition hover:bg-sky-800 hover:text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
