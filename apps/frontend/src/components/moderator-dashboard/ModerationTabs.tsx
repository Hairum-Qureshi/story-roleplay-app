import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const sections = {
  reports: {
    label: "Reports",
    options: [
      "all-reports",
      "closed-reports",
      "resolved-reports",
    ],
  },
  users: {
    label: "Users",
    options: ["all-users", "banned-users", "warned-users", "suspended-users"],
  },
};

export default function ModerationTabs() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get("tab");

  const allOptions = Object.values(sections).flatMap(
    (section) => section.options,
  );

  const initialOption =
    allOptions.find((option) => option === query) ||
    sections.reports.options[0];

  const [currentTab, setCurrentTab] = useState(initialOption);

  const currentSection =
    !query || sections.reports.options.includes(query) ? "reports" : "users";

  const section = sections[currentSection];

  useEffect(() => {
    const option = allOptions.find((option) => option === query);

    if (option) {
      setCurrentTab(option);
    }
  }, [query]);

  const handleTabChange = (value: string) => {
    setCurrentTab(value);
    navigate(`?tab=${value}`);
  };

  return (
    <div className="bg-slate-900/80 text-white rounded-md shadow-md border border-sky-600/50 p-3">
      <div className="flex items-center justify-between gap-4">
        {/* Primary navigation */}
        <div className="flex gap-1">
          {Object.entries(sections).map(([key, section]) => (
            <button
              key={key}
              onClick={() => handleTabChange(section.options[0])}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition cursor-pointer ${
                currentSection === key
                  ? "bg-sky-600/20 text-sky-400"
                  : "text-slate-400 hover:bg-sky-600/10 hover:text-slate-200"
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Status filter */}
        <select
          value={currentTab}
          onChange={(e) => handleTabChange(e.target.value)}
          className="
            bg-slate-800
            border border-slate-700
            text-slate-200
            text-sm
            font-medium
            rounded-md
            px-3 py-2
            outline-none
            cursor-pointer
            hover:border-sky-600/50
            focus:border-sky-500
          "
        >
          {section.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
