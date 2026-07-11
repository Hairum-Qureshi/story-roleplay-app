import React from "react";
import { useParams } from "react-router-dom";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import useRolePlayAds from "../../hooks/useRolePlayAds";
import NotFound from "../../pages/NotFound";

export default function OwnerRoutesGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: currUserData } = useCurrentUser();
  const { adID } = useParams();
  const { adData, loading: adLoading } = useRolePlayAds(adID);

  if (adLoading) {
    return null;
  }

  if (!adData || adData.author._id !== currUserData?._id) {
    return <NotFound />;
  }

  return <>{children}</>;
}
