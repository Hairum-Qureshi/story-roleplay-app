import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export default function AppContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.refetchQueries({
      queryKey: ["total-notifications"],
    }); 

  }, [location.pathname]);

  return <div className="overflow-y-hidden">{children}</div>;
}
