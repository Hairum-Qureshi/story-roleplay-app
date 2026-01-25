import { Types } from 'mongoose';

type CharacterBio = {
  _id: string;
  name: string;
  gender: string;
  age: number;
  appearance: string;
  traits: string[];
  author: Types.ObjectId;
  backstory?: string;
  createdAt: Date;
  updatedAt: Date;
};

enum PovType {
  FirstPerson = 'First Person',
  SecondPerson = 'Second Person',
  ThirdPerson = 'Third Person',
}

type RolePlayAd = {
  _id: string;
  title: string;
  pov: PovType;
  adultRoleplay: boolean;
  premise: string;
  writingExpectations: string[];
  contentNotes: string;
  author: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

type Conversation = {
  _id: string;
  participants: Types.ObjectId[];
  roleplayAd: Types.ObjectId;
  title: string;
  messages: Types.ObjectId[];
  chatEnded: boolean;
  characterBios?: Types.ObjectId[];
  createdAt: Date;
};

type Message = {
  _id: Types.ObjectId | string;
  sender: Types.ObjectId | string;
  conversation: Types.ObjectId | string;
  content: string;
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

export type {
  UserPayload,
  AuthRequest,
  RolePlayAd,
  CharacterBio,
  Conversation,
  Message,
  PovType,
};
