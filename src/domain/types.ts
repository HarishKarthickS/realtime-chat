export type RoomId = string;
export type UserId = string;
export type MessageId = string;

export type RoomKind = "hallway" | "kitchen" | "shift" | "roof";

export type Room = {
  id: RoomId;
  name: string;
  kind: RoomKind;
  subtitle: string;
};

export type ChatUser = {
  id: UserId;
  displayName: string;
  initials: string;
};

export type ChatMessage = {
  id: MessageId;
  roomId: RoomId;
  author: ChatUser;
  body: string;
  sentAt: string;
};

export type PresenceMember = {
  user: ChatUser;
  roomId: RoomId;
  joinedAt: string;
};

export type ConnectionState = "idle" | "connecting" | "live" | "offline" | "error";
