import { useCurrentUser } from "../../hooks/useCurrentUser";

export default function ModerationHeader() {
  const { data: currUserData } = useCurrentUser();

  return (
    <div className="bg-slate-900/80 p-10 rounded-md shadow-md text-white border border-sky-600/50 space-y-3">
      <h1 className="text-3xl font-bold">Moderator Dashboard</h1>
      <h2 className="text-xl text-slate-300">
        Hello,{" "}
        <span className="text-sky-400 font-semibold">
          @{currUserData?.username}
        </span>
      </h2>
      <p className="text-lg text-slate-300">
        Welcome to the moderator dashboard. Here you can manage reports and
        perform moderation tasks.
      </p>
    </div>
  );
}
