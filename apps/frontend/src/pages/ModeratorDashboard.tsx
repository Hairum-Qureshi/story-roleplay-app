import ModerationHeader from "../components/moderator-dashboard/ModerationHeader";
import ModerationTabs from "../components/moderator-dashboard/ModerationTabs";
import { FaMagnifyingGlass } from "react-icons/fa6";
import ReportedMessagesDiv from "../components/moderator-dashboard/ReportedMessagesDiv";
import ReportedAdsDiv from "../components/moderator-dashboard/ReportedAdsDiv";

export default function ModerationDashboard() {
  return (
    <div className="h-screen bg-slate-950 p-10">
      <div className="w-5/6 m-auto flex flex-col space-y-5">
        <ModerationHeader />
        <div className="relative">
          <FaMagnifyingGlass className="absolute mt-3 ml-3 text-slate-400" />
          <input
            type="search"
            placeholder="Search for a post by title/ID or a user by username/ID..."
            className="w-full p-2 pl-10 rounded-md bg-slate-800/60 text-white border border-sky-600/50 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
          />
        </div>
        <ModerationTabs />
        <div className="w-full flex flex-row">
          <ReportedAdsDiv />
          <ReportedMessagesDiv />
        </div>
      </div>
    </div>
  );
}
