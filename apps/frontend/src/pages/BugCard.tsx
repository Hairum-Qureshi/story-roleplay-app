import type { Bug } from "../interfaces";
import { FaBug } from "react-icons/fa";

export default function BugCard({ bug }: { bug: Bug }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-slate-700 bg-slate-800/70 p-4 shadow-md transition hover:border-red-500/50 hover:shadow-lg">
      <div className="rounded-lg bg-red-500/10 p-2">
        <FaBug className="h-5 w-5 text-red-400" />
      </div>

      <div className="flex-1">
        <p className="mt-1 text-sm leading-6 text-slate-300">{bug.bug}</p>
      </div>
    </div>
  );
}
