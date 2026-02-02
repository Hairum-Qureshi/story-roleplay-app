import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import useRolePlayAds from "../../hooks/useRolePlayAds";

export default function OwnerRoutesGuard({
	children
}: {
	children: React.ReactNode;
}) {
	const { data: currUserData } = useCurrentUser();
	const { adID } = useParams();
	const { adData, loading: adLoading } = useRolePlayAds(adID);

	if (adLoading) {
		return null;
	}

	if (!adData || adData.author !== currUserData?._id) {
		return <Navigate to="/" />;
	}

	return <>{children}</>;
}
