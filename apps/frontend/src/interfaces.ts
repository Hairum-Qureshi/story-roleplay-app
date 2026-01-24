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
	createdAt: Date;
	updatedAt: Date;
}

type PovType = "First Person" | "Second Person" | "Third Person";

interface RolePlayAd {
	_id: string;
	title: string;
	pov: PovType;
	adultRoleplay: boolean;
	premise: string;
	traitsAndSkills: string[];
	writingExpectations: string[];
	contentNotes: string;
	author: string;
	createdAt: Date;
	updatedAt: Date;
}

interface Conversation {
	_id: string;
	participants: string[];
	roleplayAd: string;
	title: string;
	messages: string[];
	chatEnded: boolean;
	characterBios?: string[];
	createdAt: Date;
}

interface Message {
	_id: string;
	sender: string;
	conversation: string;
	content: string;
}

export type {
	FeatureColumnProps,
	UseGoogleAuthHook,
	CharacterBio,
	RolePlayAd,
	Conversation,
	Message,
	PovType
};
