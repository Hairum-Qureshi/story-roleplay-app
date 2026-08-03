import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function AppContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  const queryClient = useQueryClient();

  useEffect(() => {
    // queryClient.refetchQueries({
    //   queryKey: ["total-notifications"],
    // });

    async function test() {
      await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/notification/all/total`,
        {
          withCredentials: true,
        },
      );
    }

    test();
  }, [location.pathname]);

  return <div className="overflow-y-hidden">{children}</div>;
}
