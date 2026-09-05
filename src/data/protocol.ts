import type { ChatMessage, ChatUser, PresenceMember, Room } from "../domain";

export type ClientFrame =
  | { type: "hello"; user: ChatUser }
  | { type: "join"; roomId: string }
  | { type: "leave"; roomId: string }
  | { type: "say"; roomId: string; body: string };

export type ServerFrame =
  | {
      type: "hello-ok";
      you: ChatUser;
      rooms: Room[];
      messages: ChatMessage[];
      presence: PresenceMember[];
    }
  | { type: "message"; message: ChatMessage }
  | { type: "presence"; presence: PresenceMember[] }
  | { type: "error"; code: "bad-body" | "unknown-room" | "not-hello" | "socket"; detail: string };

export function parseClientFrame(raw: string): ClientFrame | null {
  try {
    const value = JSON.parse(raw) as ClientFrame;
    if (!value || typeof value !== "object" || typeof value.type !== "string") return null;
    return value;
  } catch {
    return null;
  }
}

export function parseServerFrame(raw: string): ServerFrame | null {
  try {
    const value = JSON.parse(raw) as ServerFrame;
    if (!value || typeof value !== "object" || typeof value.type !== "string") return null;
    return value;
  } catch {
    return null;
  }
}
