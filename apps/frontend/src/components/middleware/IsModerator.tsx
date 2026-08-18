import { useCurrentUser } from "../../hooks/useCurrentUser";
import useReport from "../../hooks/useReport";
import NotFound from "../../pages/NotFound";

export default function IsModerator({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: currUserData } = useCurrentUser();
  const { reportData } = useReport(); 
  const isModerator =
    currUserData?.role === "admin" || currUserData?.role === "moderator";

  return reportData && isModerator ? children : <NotFound />;
}
