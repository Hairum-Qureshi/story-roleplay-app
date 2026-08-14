import { HydratedDocument, Types } from 'mongoose';
import Role from './enums/roles.enum';
import { ReportReason } from './enums/reason.enum';

type CharacterBio = {
  _id: string;
  name: string;
  gender: string;
  age: number;
  appearance: string;
  traits: string[];
  author: Types.ObjectId;
  backstory?: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

enum PovType {
  FirstPerson = 'First Person',
  SecondPerson = 'Second Person',
  ThirdPerson = 'Third Person',
}

type RolePlayAd = {
  _id: Types.ObjectId;
  title: string;
  pov: PovType;
  adultRoleplay: boolean;
  premise: string;
  writingExpectations: string[];
  contentNotes: string;
  author: string;
  isDeleted: boolean;
  isLiked?: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type PopulatedRolePlayAd = {
  _id: Types.ObjectId;
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
  createdAt: Date;
  updatedAt: Date;
};

type Conversation = {
  _id: Types.ObjectId;
  participants: string[];
  roleplayAd: Types.ObjectId;
  title: string;
  messages: Types.ObjectId[];
  chatEnded: boolean;
  notes: string;
  hiddenFor: string[];
  characterBios?: Types.ObjectId[];
  latestMessage: string | null;
  latestMessageAt: Date | null;
  createdAt: Date;
};

type Message = {
  _id: Types.ObjectId | string;
  sender: Types.ObjectId | string;
  conversation: Types.ObjectId | string;
  content: string;
  isEdited: boolean;
  isDeleted: boolean;
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type UserPayload = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: string;
  username?: string;
  characterBios: CharacterBio[];
  conversations: Conversation[];
  rolePlayAds: RolePlayAd[];
  role: Role;
  blockedUsers: string[];
  createdAt: Date;
};

type AuthRequest = Request & {
  user?: UserPayload;
};

type HydratedConversation = {
  _id: string;
  participants: Array<{
    _id: string;
    username: string;
    profilePicture?: string;
  }>;
  roleplayAd: RolePlayAd;
  title: string;
  notes: string;
  messages: HydratedMessage[];
  chatEnded: boolean;
  characterBios?: Types.ObjectId[];
  createdAt: Date;
};

type HydratedMessage = {
  _id: Types.ObjectId | string;
  sender: {
    _id: Types.ObjectId | string;
    username: string;
    profilePicture?: string;
  };
  conversation: Types.ObjectId | string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

type Editor = {
  username: string;
  userID: string;
};

type Notif = {
  userID: string;
  convoID: string;
  unreadCount: number;
};

type ReportMap = {
  'Underage or minor-related sexual content': ReportReason.Underage;
  'Purely sexual or smut-focused ad': ReportReason.SexualContent;
  'Hate speech, slurs, or extremist content': ReportReason.HateSpeech;
  'This ad is plagiarized or stolen content': ReportReason.Plagiarism;
  'Doxxing or sharing personal/contact information': ReportReason.Doxxing;
  'Unrelated content or spam': ReportReason.Spam;
  'AI generated content': ReportReason.AIContent;
  Other: ReportReason.Other;
};

type RolePlayAdDocument = HydratedDocument<RolePlayAd>;
type ConversationDocument = HydratedDocument<Conversation>;
type MessageDocument = HydratedDocument<Message>;
type HydratedConversationDocument = HydratedDocument<HydratedConversation>;

export type {
  UserPayload,
  AuthRequest,
  RolePlayAd,
  CharacterBio,
  Conversation,
  Message,
  RolePlayAdDocument,
  ConversationDocument,
  MessageDocument,
  HydratedConversation,
  HydratedConversationDocument,
  HydratedMessage,
  Editor,
  Notif,
  PopulatedRolePlayAd,
  ReportMap,
};
export { PovType };
