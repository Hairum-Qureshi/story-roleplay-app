import { Navigate } from "react-router-dom";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import type { ReactNode } from "react";

export default function ProtectedRoutesGuard({
	children
}: {
	children: ReactNode;
}) {
	const { data: currUserData, isPending } = useCurrentUser();

	if (!currUserData && !isPending) {
		return <Navigate to="/" />;
	}

	return <>{children}</>;
}
