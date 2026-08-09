import { useCurrentUser } from "../../hooks/useCurrentUser";
import NotFound from "../../pages/NotFound";

export default function IsModerator({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: currUserData } = useCurrentUser();
  const isModerator =
    currUserData?.role === "admin" || currUserData?.role === "moderator";

  return isModerator ? children : <NotFound />;
}
