import { FaMagnifyingGlass } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";
import ModerationHeader from "../components/moderator-dashboard/ModerationHeader";
import ModerationTabs from "../components/moderator-dashboard/ModerationTabs";
import ReportManager from "../components/moderator-dashboard/groups/ReportManager";
import ReportedAdsDiv from "../components/moderator-dashboard/divs/ReportedAdsDiv";
import ReportedMessagesDiv from "../components/moderator-dashboard/divs/ReportedMessagesDiv";
import UserModerationManager from "../components/moderator-dashboard/groups/UserModerationManager";
import UserCard from "../components/moderator-dashboard/cards/UserCard";
import useReport from "../hooks/useReport";
import type { UserData } from "../interfaces";

export default function ModerationDashboard() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("tab");

  const queriesToShowReportDivs = [
    "all-reports",
    "open-reports",
    "closed-reports",
    "resolved-reports",
  ];

  const { allUsers } = useReport();

  return (
    <div className="min-h-screen max-h-auto bg-slate-950 p-10">
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
        {!query || queriesToShowReportDivs.includes(query) ? (
          <div className="w-full flex flex-row space-x-3">
            <ReportManager>
              <ReportedAdsDiv />
              <ReportedMessagesDiv />
            </ReportManager>
          </div>
        ) : (
          <div className="w-full flex flex-col space-y-3">
            <UserModerationManager>
              {allUsers.map((user: UserData) => {
                return <UserCard key={user._id} user={user} />;
              })}
            </UserModerationManager>
          </div>
        )}
      </div>
    </div>
  );
}
