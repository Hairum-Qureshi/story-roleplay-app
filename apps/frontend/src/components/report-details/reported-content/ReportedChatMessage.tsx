import type { ChatMessageData } from "../types";

export default function ReportedChatMessage({
  chatMessage,
}: {
  chatMessage: ChatMessageData;
}) {
  return (
    <div className="mt-3 space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
          Chat ID
        </p>

        <p className="mt-1 text-sm font-medium text-slate-100">
          {chatMessage.id}
        </p>
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
          Participant Usernames & IDs
        </p>

        <div className="mt-2 space-y-2">
          {chatMessage.participants.map((participant) => (
            <div
              key={participant.id}
              className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2"
            >
              <div>
                <p className="text-sm font-medium text-slate-100">
                  {participant.username}
                </p>

                <p className="text-xs text-slate-400">ID: {participant.id}</p>
              </div>

              <span className="rounded-full border border-slate-700 px-2 py-1 text-[11px] uppercase tracking-[0.16em] text-slate-400">
                Participant
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
          Message Preview
        </p>

        <p className="mt-1 text-sm leading-7 text-slate-300">
          {chatMessage.preview}
        </p>
      </div>
    </div>
  );
}
