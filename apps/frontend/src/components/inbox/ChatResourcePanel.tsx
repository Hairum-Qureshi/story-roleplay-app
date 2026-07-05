import { useCurrentUser } from "../../hooks/useCurrentUser";
import type { Conversation } from "../../interfaces";
import UserCard from "./UserCard";
import { MdPushPin } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import { RiStickyNote2Fill } from "react-icons/ri";

export default function ChatResourcePanel({
  fullWidth,
  selectedChat,
}: {
  fullWidth: boolean;
  selectedChat: Conversation | null;
}) {
  const { data: currUserData } = useCurrentUser();
  const isSearching = false;

  return (
    <div
      className={`border border-slate-700 w-1/4 h-[calc(100vh-2rem)] flex flex-col justify-between ${
        fullWidth ? "hidden" : "block"
      }`}
    >
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="mx-2 mt-10">
          <input
            type="text"
            placeholder="Search a phrase in this chat..."
            className="w-full p-2 border border-sky-700 focus:outline-none focus:ring-2 focus:ring-slate-800 rounded bg-slate-900"
          />
        </div>
        {isSearching ? (
          <div className="m-2">
            <p className="text-sm text-gray-400">Searching...</p>
          </div>
        ) : (
          <div className="my-5">
            <div className="space-y-3 mx-4">
              {selectedChat?.participants.map(
                (member) =>
                  member.username !== "SYSTEM" && (
                    <UserCard
                      key={member._id}
                      username={member.username}
                      you={member.username === currUserData?.username}
                      profilePicture={member.profilePicture || ""}
                    />
                  ),
              )}
            </div>
          </div>
        )}
      </div>
      <div className="w-full border border-slate-950 p-2 mb-3">
        <div className="w-full rounded-xl border border-gray-700 bg-gray-900 p-3 shadow-lg">
          <h2 className="mb-3 text-sm font-semibold text-gray-300 uppercase tracking-wide">
            Chat Options
          </h2>
          <div className="space-y-2">
            <button className="flex w-full items-center gap-3 rounded-lg bg-gray-800 px-4 py-3 text-left text-gray-100 transition hover:bg-blue-700 hover:translate-x-1 active:bg-blue-800 cursor-pointer">
              <MdPushPin className="text-lg text-blue-400" />
              <span>View Pinned Messages</span>
            </button>
            <button className="flex w-full items-center gap-3 rounded-lg bg-gray-800 px-4 py-3 text-left text-gray-100 transition hover:bg-blue-700 hover:translate-x-1 active:bg-blue-800 cursor-pointer">
              <RiStickyNote2Fill className="text-lg text-blue-400" />
              <span>Create a Note from this Role-play</span>
            </button>
            <button
              className="flex w-full items-center gap-3 rounded-lg bg-gray-800 px-4 py-3 text-left text-gray-100 transition hover:bg-blue-700 hover:translate-x-1 active:bg-blue-800 cursor-pointer"
              onClick={() => {
                window.open(
                  `${import.meta.env.VITE_BACKEND_BASE_URL}/pdf/${selectedChat?._id}/role-play`,
                  "_blank",
                );
              }}
            >
              <FaExternalLinkAlt className="text-sm text-blue-400" />
              <span>View & Download Story Transcript</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
