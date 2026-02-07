import { Navigate, useParams } from "react-router-dom";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import useRolePlayChat from "../../hooks/useRolePlayChat";
import type { Conversation } from "../../interfaces";

export default function IsMemberRoutesGuard({
	children
}: {
	children: React.ReactNode;
}) {
	const { data: currUser } = useCurrentUser();
	const { chatID } = useParams();
	const { rolePlayChats } = useRolePlayChat(chatID || "");
	const chat =
		rolePlayChats?.find((chat: Conversation) => chat._id === chatID) || null;

	if (
		!currUser ||
		chat?.participants.every(participant => participant._id !== currUser._id)
	) {
		return <Navigate to="/" />;
	}

	return <>{children}</>;
}
