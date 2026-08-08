import { Modal } from "react-responsive-modal";
import { IoIosWarning } from "react-icons/io";
import { FaChevronRight, FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "react-responsive-modal/styles.css";
import "../css/index.css";
import { useState } from "react";

export default function ReportModal({
  openModal,
  onCloseModal,
}: {
  openModal: boolean;
  onCloseModal: () => void;
}) {
  const [page, setPage] = useState(1);
  const [selectedReason, setSelectedReason] = useState("");
  const [details, setDetails] = useState("");

  const reasons = [
    "Underage or minor-related sexual content",
    "Purely sexual or smut-focused ad",
    "Hate speech, slurs, or extremist content",
    "This ad is plagiarized or stolen content",
    "Doxxing or sharing personal/contact information",
    "Unrelated content or spam",
    "AI generated content",
    "Other",
  ];

  return (
    <div>
      <Modal open={openModal} onClose={onCloseModal} center>
        <div className="w-full max-w-lg rounded-2xl bg-slate-900 p-3 text-white shadow-2xl">
          {/* Header */}
          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-500/10">
              <IoIosWarning className="h-6 w-6 text-red-500" />
            </div>

            <div>
              <h2 className="text-lg font-semibold">Report Roleplay</h2>

              <p className="mt-1 text-sm leading-relaxed text-slate-400">
                Help us understand what went wrong with this roleplay.
              </p>
            </div>
          </div>
          {page === 1 ? (
            <div className="space-y-2">
              {reasons.map((reason) => (
                <button
                  key={reason}
                  type="button"
                  onClick={() => {
                    setSelectedReason(reason);
                    setPage(2);
                  }}
                  className="group flex w-full items-center justify-between rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-3 text-left text-sm text-slate-200 transition-all duration-200 hover:border-red-500/50 hover:bg-red-500/10 hover:text-white hover:cursor-pointer"
                >
                  <span className="pr-4">{reason}</span>

                  <FaChevronRight className="h-4 w-4 shrink-0 text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-red-400" />
                </button>
              ))}
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-right-2 duration-200">
              <button
                type="button"
                onClick={() => setPage(1)}
                className="group mb-5 flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
              >
                <FaArrowLeftLong className="h-4 w-4 hover:cursor-pointer transition group-hover:-translate-x-1" />
                Back to reasons
              </button>
              <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-red-400">
                  Reporting for
                </p>

                <p className="text-sm font-medium leading-relaxed text-slate-200">
                  {selectedReason}
                </p>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="report-details"
                    className="text-sm font-medium text-slate-200"
                  >
                    Additional details (N/A if not applicable)
                    <span className="text-red-500">*</span>
                  </label>

                  <span className="text-xs text-slate-500">
                    {details.length}/500
                  </span>
                </div>
                <textarea
                  id="report-details"
                  value={details}
                  onChange={(e) => setDetails(e.target.value.slice(0, 500))}
                  placeholder="Tell us a little more about what happened..."
                  rows={5}
                  className="w-full resize-none rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-3 text-sm leading-relaxed text-white outline-none placeholder:text-slate-500 transition focus:border-sky-500/60 focus:bg-slate-800 focus:ring-2 focus:ring-sky-500/10"
                />
                {selectedReason === reasons[3] && (
                  <>
                    <label className="mb-2 mt-4 block text-sm font-medium text-white">
                      Please provide a username of the original author
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Username"
                      className="w-full rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-3 text-sm leading-relaxed text-white outline-none placeholder:text-slate-500 transition focus:border-sky-500/60 focus:bg-slate-800 focus:ring-2 focus:ring-sky-500/10 mb-3"
                    />
                  </>
                )}
                <p className="mt-2 text-xs leading-relaxed text-slate-500">
                  Please don't include personal information unless it's relevant
                  to your report.
                </p>
              </div>
              <button
                type="button"
                disabled={!details.trim()}
                className="mt-5 w-full rounded-xl bg-red-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed hover:cursor-pointer disabled:bg-slate-700 disabled:text-slate-500"
              >
                Submit Report
              </button>
            </div>
          )}
          <p className="mt-5 text-xs leading-relaxed text-slate-500">
            Need more context? Review our{" "}
            <Link
              to="/guidelines"
              className="text-sky-400 underline underline-offset-2 transition hover:text-sky-300"
            >
              community guidelines
            </Link>
            .
          </p>
        </div>
      </Modal>
    </div>
  );
}
