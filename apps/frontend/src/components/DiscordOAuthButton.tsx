import { FaDiscord } from "react-icons/fa";

export default function DiscordOAuthButton() {
  return (
    <div
      className="w-full h-11 bg-[#5865F2] text-white rounded-lg flex items-center justify-center gap-2 cursor-pointer hover:bg-[#4752C4] transition-colors px-4"
      onClick={() =>
        (window.location.href = import.meta.env.VITE_DISCORD_OAUTH2_URL)
      }
    >
      <FaDiscord className="w-5 h-5" />
      <span className="text-sm font-medium">Sign in with Discord</span>
    </div>
  );
}
