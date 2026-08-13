import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export default function useReport() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("tab");
  const queryClient = useQueryClient();

  const { mutate: createReportMutation, isPending: isReportLoading } =
    useMutation({
      mutationFn: async ({
        reason,
        reportDetails,
        adLink,
        claimedOriginalAdPoster,
      }: {
        reason: string;
        reportDetails: string;
        adLink: string;
        claimedOriginalAdPoster: string;
      }) => {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/report/create`,
          {
            reason,
            reportDetails,
            adLink,
            claimedOriginalAdPoster,
          },
          {
            withCredentials: true,
          },
        );

        return response;
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          alert(error.response?.data?.message);
          return;
        }
        alert("Error reporting ad: " + error);
      },
    });

  const { data: allUsers, isLoading: isAllUsersLoading } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      try {
        const ALL_USERS_ENDPOINT =
          !query || query === "all-users"
            ? `${import.meta.env.VITE_BACKEND_BASE_URL}/api/user/all`
            : `${import.meta.env.VITE_BACKEND_BASE_URL}/api/user/all?status=${query.split("-")[0].toUpperCase()}`;

        const response = await axios.get(ALL_USERS_ENDPOINT, {
          withCredentials: true,
        });
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["all-users"] });
  }, [query]);

  const { data: allReports, isLoading: isAllReportsLoading } = useQuery({
    queryKey: ["all-reports"],
    queryFn: async () => {
      try {
        const ALL_OPEN_REPORTS_ENDPOINT =
          !query || query === "all-reports"
            ? `${import.meta.env.VITE_BACKEND_BASE_URL}/api/report/all?status=OPEN`
            : `${import.meta.env.VITE_BACKEND_BASE_URL}/api/report/all?status=${query.split("-")[0].toUpperCase()}`;

        const response = await axios.get(ALL_OPEN_REPORTS_ENDPOINT, {
          withCredentials: true,
        });
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["all-reports"] });
  }, [query]);

  return {
    createReportMutation,
    isReportLoading,
    allUsers,
    isAllUsersLoading,
    allReports,
    isAllReportsLoading,
  };
}
