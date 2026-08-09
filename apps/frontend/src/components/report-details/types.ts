export type ReportedContentType = "ad" | "chat";

export type ReportParticipant = {
  username: string;
  id: string;
};

export type RolePlayAdData = {
  id: string;
  title: string;
  genre: string;
  status: string;
  postedAt: string;
  lookingFor: string;
  tags: string[];
  starterSample: string;
  description: string;
  postUrl: string;
  creator: {
    username: string;
    id: string;
  };
};

export type ChatMessageData = {
  id: string;
  preview: string;
  participants: ReportParticipant[];
};

export type ReportDetailsData = {
  id: string;
  title: string;
  status: string;
  reporter: string;
  reportedUser: string;
  submittedAt: string;
  details: string;
  reportedContentType: ReportedContentType;
  rolePlayAd: RolePlayAdData;
  chatMessage: ChatMessageData;
};
