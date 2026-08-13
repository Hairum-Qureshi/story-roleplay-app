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
          className="px-2 py-1 rounded-md hover:bg-sky-600/20 transition hover:cursor-pointer bg-sky-600/10 text-sky-400 font-semibold"
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
