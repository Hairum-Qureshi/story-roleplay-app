import axios from "axios";
import { useMutation } from "@tanstack/react-query";

export default function useReport() {
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

  return { createReportMutation, isReportLoading };
}
