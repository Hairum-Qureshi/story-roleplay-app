import { useLocation } from "react-router-dom";
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
  const location = useLocation();
  const isModerator =
    currUserData?.role === "admin" || currUserData?.role === "moderator";

  const isDashboard = location.pathname.startsWith("/dashboard");

  return isDashboard && isModerator ? (
    children
  ) : !isDashboard && isModerator ? (
    reportData ? (
      children
    ) : (
      <NotFound />
    )
  ) : (
    <NotFound />
  );
}
