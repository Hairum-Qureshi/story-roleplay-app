import axios from "axios";
import { useMutation } from "@tanstack/react-query";

export default function useReport() {
  const { mutate: createReportMutation } = useMutation({
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
      try {
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
      } catch (error) {
        console.error(error);
      }
    },
  });

  return { createReportMutation };
}
