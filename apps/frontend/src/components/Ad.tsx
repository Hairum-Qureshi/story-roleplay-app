import { useCurrentUser } from "../hooks/useCurrentUser";
import useRolePlayAds from "../hooks/useRolePlayAds";
import useRolePlayChat from "../hooks/useRolePlayChat";
import type { AdProps } from "../interfaces";
import moment from "moment";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { MdReport } from "react-icons/md";
import ReportModal from "./ReportModal";

export default function Ad({ hideButton = false, rolePlayAd }: AdProps) {
  const formattedDate = new Date(rolePlayAd?.createdAt).toLocaleDateString(
    undefined,
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  );

  const { data: currUserData } = useCurrentUser();
  const { deleteAdMutate } = useRolePlayAds();
  const { createConversation } = useRolePlayChat();
  const { likeMutate, unlikeMutate } = useRolePlayAds();
  const [openModal, setOpenModal] = useState(false);

  return (
    <article className="w-full max-w-4xl mx-auto rounded-xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 shadow-lg mb-8">
      {openModal && (
        <ReportModal
          openModal={openModal}
          onCloseModal={() => setOpenModal(false)}
        />
      )}
      <header className="p-6 border-b border-slate-800 space-y-3">
        <h2 className="text-2xl font-bold text-zinc-100 leading-tight">
          {rolePlayAd?.title}
        </h2>
        <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-400">
          <span>
            Posted by{" "}
            <span className="text-sky-400">{rolePlayAd?.author?.username}</span>
          </span>
          <span className="text-zinc-600">•</span>
          <span>{moment(rolePlayAd?.createdAt).fromNow()}</span>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          <span className="px-3 py-1 rounded-full bg-sky-900/50 text-sky-300 text-xs font-medium">
            {String(rolePlayAd?.pov)}
          </span>

          {rolePlayAd?.adultRoleplay && (
            <span className="px-3 py-1 rounded-full bg-red-900/40 text-red-300 text-xs font-medium">
              18+ Only
            </span>
          )}
        </div>
      </header>
      <section className="p-6 space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-zinc-200">Premise</h3>
          <p className="text-zinc-300 leading-relaxed whitespace-pre-line">
            {rolePlayAd?.premise}
          </p>
        </div>
        {rolePlayAd?.writingExpectations?.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-zinc-200">
              Writing Expectations
            </h3>
            <ul className="grid gap-2 sm:grid-cols-2 text-zinc-300">
              {rolePlayAd?.writingExpectations?.map((expectation, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="flex items-center gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400" />
                    <span>{expectation}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {rolePlayAd?.contentNotes && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-zinc-200">
              Content Notes
            </h3>
            <p className="text-zinc-300 leading-relaxed whitespace-pre-line break-words">
              {rolePlayAd?.contentNotes}
            </p>
          </div>
        )}
      </section>
      <footer className="px-6 py-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <span className="text-sm text-zinc-500">
          Last updated {formattedDate}
        </span>
        {!hideButton && (
          <div className="flex flex-wrap gap-3">
            {!currUserData ||
              (currUserData?._id !== rolePlayAd?.author?._id && (
                <>
                  <button
                    className="
                      inline-flex items-center justify-center
                      rounded-lg
                      bg-indigo-600
                      px-5 py-2.5
                      text-sm font-semibold text-white
                      shadow-sm
                      transition-all duration-200
                      hover:bg-indigo-700
                      hover:shadow-md
                      active:scale-[0.98]
                      cursor-pointer
                    "
                    onClick={() => {
                      createConversation(rolePlayAd._id);
                    }}
                  >
                    Respond to Ad
                  </button>

                  <button
                    className="
                      group inline-flex items-center justify-center gap-2
                      rounded-xl
                      border border-gray-600
                      bg-gray-800/80
                      px-5 py-2.5
                      text-sm font-semibold text-gray-100
                      shadow-md shadow-black/20
                      backdrop-blur-sm
                      transition-all duration-200
                      hover:-translate-y-0.5
                      hover:border-gray-500
                      hover:bg-gray-700
                      hover:shadow-lg
                      active:translate-y-0
                      cursor-pointer
                    "
                    onClick={() => {
                      setOpenModal(true);
                    }}
                  >
                    <MdReport className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                    <span>Report Ad</span>
                  </button>
                </>
              ))}
            {currUserData?._id === rolePlayAd?.author?._id && (
              <button
                className="flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 transition-colors hover:cursor-pointer hover:border-red-500 hover:bg-red-50 hover:text-red-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-red-500 dark:hover:bg-red-950/30 dark:hover:text-red-400"
                onClick={() => {
                  confirm("Are you sure you want to delete this ad?") &&
                    deleteAdMutate({ adID: rolePlayAd._id });
                }}
              >
                <FiTrash2 className="h-4 w-4" />
              </button>
            )}
            <button
              className="
                group inline-flex items-center justify-center
                rounded-xl
                bg-gradient-to-br from-red-500 to-rose-600
                px-3 py-2.5
                text-lg font-semibold text-white
                shadow-md shadow-red-500/25
                transition-all duration-200
                hover:-translate-y-0.5
                hover:shadow-lg hover:shadow-red-500/40
                active:scale-95
                cursor-pointer
              "
              onClick={() =>
                rolePlayAd?.isLiked
                  ? unlikeMutate({ adID: rolePlayAd._id })
                  : likeMutate({ adID: rolePlayAd._id })
              }
            >
              <span className="transition-transform duration-200 group-hover:scale-125">
                {rolePlayAd?.isLiked ? <FaHeart /> : <FaRegHeart />}
              </span>
            </button>
          </div>
        )}
      </footer>
    </article>
  );
}
