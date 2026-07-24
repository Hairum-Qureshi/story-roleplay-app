import type { Socket } from "socket.io-client";

interface FeatureColumnProps {
  title: string;
  text: string;
  hasBorder?: boolean;
}

interface UseGoogleAuthHook {
  googleSignInMutation: (credential: string) => Promise<void>;
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
  canBeReposted: boolean;
  isLiked?: boolean;
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
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

interface SocketMessagePayload {
  message: Message;
  senderUID: string;
}

interface Conversation {
  _id: string;
  participants: [
    {
      _id: string;
      username: string;
      profilePicture?: string;
    },
  ];
  roleplayAd: RolePlayAd;
  title: string;
  notes: string;
  messages: Message[];
  chatEnded: boolean;
  characterBios?: string[];
  latestMessage: string | null;
  latestMessageAt: string | null;
  unreadCount: number;
  createdAt: string;
}

interface SocketStore {
  socket: Socket | null;
  connectSocket: (userId: string) => void;
  disconnectSocket: () => void;
  rolePlayAd: RolePlayAd | null;
  message: SocketMessagePayload | null;
  endedConversationID: string | null;
  typing: boolean;
  setTyping: (typing: boolean) => void;
  partnerID: string | null;
  partnerUsername: string | null;
  currentTypingChatID: string | null;
  chatID: string | null;
  currUID: string | null;
  editorUsername: string | null;
  notification: boolean;
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
  isPinned: boolean;
  isEdited: boolean;
  messageID: string;
}

interface ChatHeaderProps {
  fullWidth: boolean;
  fullWidthToggle: () => void;
  endedConversationID: string | null;
  endRolePlayConversation: (conversationID: string) => void;
}

interface MainChatContainerProps {
  noMessageOpened: boolean;
  fullWidth: boolean;
  fullWidthToggle: () => void;
}

interface ChatFooterProps {
  partner: string;
  partnerUsername: string;
}

interface Update {
  id: number;
  heading: string;
  timestamp: string;
  description: string;
}

interface PlannedFeature {
  id: number;
  subheading: string;
  description: string;
}

interface Bug {
  id: number;
  bug: string;
}

interface PinnedMessage {
  _id: string;
  sender: {
    _id: string;
    username: string;
    profilePicture?: string;
  };
  content: string;
  createdAt: string;
}

export type {
  FeatureColumnProps,
  UseGoogleAuthHook,
  CharacterBio,
  RolePlayAd,
  Conversation,
  Message,
  SocketMessagePayload,
  PovType,
  User,
  SocketStore,
  AdProps,
  ChatBubbleProps,
  ChatHeaderProps,
  MainChatContainerProps,
  ChatFooterProps,
  Update,
  PlannedFeature,
  Bug,
  PinnedMessage,
};
