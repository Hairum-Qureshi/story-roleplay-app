import { MdPushPin } from "react-icons/md";

export default function PinnedMessageBubble() {
  return (
    <div className="relative rounded-lg border border-slate-700 bg-slate-900 p-3 hover:bg-slate-800/50 transition-colors hover:cursor-pointer">
      <div className="absolute right-3 top-3 text-slate-500">
        <MdPushPin className="h-4 w-4" />
      </div>
      <div className="flex items-start gap-3">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq2wATYpHIiC_s98OHdjfpN3k-QudsXFJ6xxmpDtcbzA&s"
          alt="Profile Picture"
          className="h-9 w-9 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Jan 2, 2026</span>
          </div>

          <p className="mt-1 text-sm text-slate-300 line-clamp-2">
            This is the pinned message preview. It can wrap to multiple lines if
            needed while still keeping the card compact.
          </p>
        </div>
      </div>
    </div>
  );
}
