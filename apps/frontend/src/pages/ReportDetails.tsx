import DetailsCard from "../components/report-details/DetailsCard";
import EmailTemplates from "../components/report-details/EmailTemplates";
import Overview from "../components/report-details/Overview";
import ReportHeader from "../components/report-details/ReportHeader";
import ReportedContent from "../components/report-details/ReportedContent";
import type { ReportDetailsData } from "../components/report-details/types";

const report: ReportDetailsData = {
  id: "RPT-2401",
  title: "Boundary violations in private role-play",
  status: "Open",
  reporter: "NightQuill",
  reportedUser: "Inkbreaker",
  submittedAt: "26m ago",
  details:
    "Several chat messages include repeated requests for non-consensual or extreme content despite prior boundary-setting messages.",
  reportedContentType: "chat" as "ad" | "chat",

  rolePlayAd: {
    id: "AD-4472",
    title: "Shadow Court Romance",
    genre: "Fantasy",
    status: "Active",
    postedAt: "2026-08-03 21:14 UTC",
    lookingFor: "1x1, literate to advanced literate",
    tags: ["Slow Burn", "Court Intrigue", "Enemies to Lovers"],
    starterSample:
      "The marble hall fell silent as the new envoy stepped into the court, cloak still wet from the storm. Every noble bowed except one.",
    description:
      "A dark fantasy role-play centered on political intrigue, forbidden attraction, and tense court drama.",
    creator: {
      username: "Inkbreaker",
      id: "usr_204",
    },
  },

  chatMessage: {
    id: "CHAT-8821",
    preview:
      "The participant continued the scene after multiple reminders to keep it consensual and respectful.",
    participants: [
      {
        username: "NightQuill",
        id: "usr_1001",
      },
      {
        username: "Inkbreaker",
        id: "usr_204",
      },
    ],
  },
};

export default function ReportDetails() {
  const reportedAdExists = true;
  const isChatReport = report.reportedContentType === "chat";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 md:px-8 md:py-12">
        <ReportHeader id={report.id} title={report.title} />

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-6">
            <Overview
              reporter={report.reporter}
              reportedUser={report.reportedUser}
              submittedAt={report.submittedAt}
              status={report.status}
            />

            <ReportedContent
              reportedAdExists={reportedAdExists}
              isChatReport={isChatReport}
              report={report}
            />

            <DetailsCard details={report.details} />
          </div>

          <div className="min-h-0 lg:self-start">
            <EmailTemplates />
          </div>
        </section>
      </div>
    </div>
  );
}
