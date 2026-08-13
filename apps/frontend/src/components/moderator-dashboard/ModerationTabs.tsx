import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function ModerationTabs() {
  const tabs = [
    "All Reports",
    "Open Reports",
    "Closed Reports",
    "Resolved Reports",
    "All Users",
    "Banned Users",
    "Suspended Users",
    "Warned Users",
  ];

  const [searchParams] = useSearchParams();
  const query = searchParams.get("tab");
  const [currentTab, setCurrentTab] = useState(
    tabs.find((tab) => tab.toLowerCase().replace(/ /g, "-") === query) ||
      tabs[0],
  );
  const navigate = useNavigate();

  return (
    <div
      className="
    bg-slate-900/80 text-white p-3 rounded-md shadow-md border border-sky-600/50
    flex justify-between gap-2 text-sm font-semibold 
    "
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`px-2 py-1 rounded-md hover:bg-sky-600/20 transition hover:cursor-pointer font-semibold ${
            currentTab === tab
              ? "bg-sky-600/10 text-sky-400"
              : "bg-transparent text-slate-400"
          }`}
          onClick={() => {
            setCurrentTab(tab);
            navigate(`?tab=${tab.toLowerCase().replace(/ /g, "-")}`);
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
