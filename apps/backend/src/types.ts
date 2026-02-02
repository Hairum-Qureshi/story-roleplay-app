import { HydratedDocument, Types } from 'mongoose';

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
  isReposted: boolean;
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
  PovType,
  RolePlayAdDocument,
  ConversationDocument,
  MessageDocument,
  HydratedConversation,
  HydratedConversationDocument,
  HydratedMessage,
};
