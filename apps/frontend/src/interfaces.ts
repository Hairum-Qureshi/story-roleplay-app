import type { Socket } from "socket.io-client";

interface FeatureColumnProps {
	title: string;
	text: string;
	hasBorder?: boolean;
}

interface UseGoogleAuthHook {
	googleSignInMutation: () => Promise<void>;
	signOut: () => Promise<void>;
}

interface CharacterBio {
	_id: string;
	name: string;
	gender: string;
	age: number;
	appearance: string;
	traits: string[];
	author: string;
	backstory?: string;
	isDeleted: boolean;
	createdAt: string;
	updatedAt: string;
}

interface User {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	profilePicture?: string;
	username?: string;
	characterBios: CharacterBio[];
	conversations: Conversation[];
	rolePlayAds: RolePlayAd[];
	createdAt: string;
}

type PovType = "First Person" | "Second Person" | "Third Person";

interface RolePlayAd {
	_id: string;
	title: string;
	pov: PovType;
	adultRoleplay: boolean;
	premise: string;
	writingExpectations: string[];
	contentNotes: string;
	author: {
		_id: string;
		username: string;
		profilePicture: string;
	};
	isDeleted: boolean;
	isReposted: boolean;
	createdAt: string;
	updatedAt: string;
}

interface Message {
	_id: string;
	sender: {
		_id: string;
		username: string;
		profilePicture?: string;
	};
	conversation: string;
	content: string;
	isEdited: boolean;
	isDeleted: boolean;
	createdAt: string;
	updatedAt: string;
}

interface Conversation {
	_id: string;
	participants: [
		{
			_id: string;
			username: string;
			profilePicture?: string;
		}
	];
	roleplayAd: RolePlayAd;
	title: string;
	messages: Message[];
	chatEnded: boolean;
	characterBios?: string[];
	latestMessage: string | null;
	latestMessageAt: string | null;
	createdAt: string;
}

interface SocketStore {
	socket: Socket | null;
	connectSocket: (userId: string) => void;
	disconnectSocket: () => void;
	rolePlayAd: RolePlayAd | null;
	message: Message | null;
	endedConversationID: string | null;
}

interface AdProps {
	hideButton?: boolean;
	rolePlayAd: RolePlayAd;
}

interface ChatBubbleProps {
	messageData: {
		message: string;
		you: boolean;
		timestamp: string;
	};
	onDelete?: () => void;
	chatEnded: boolean;
	isDeleted: boolean;
	isEdited: boolean;
	messageID: string;
}

export type {
	FeatureColumnProps,
	UseGoogleAuthHook,
	CharacterBio,
	RolePlayAd,
	Conversation,
	Message,
	PovType,
	User,
	SocketStore,
	AdProps,
	ChatBubbleProps
};
