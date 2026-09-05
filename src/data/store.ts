import { canSendBody, newId, normalizeBody, type ChatMessage, type ChatUser, type PresenceMember, type Room, type RoomId } from "../domain";
import { SEED_MESSAGES, SEED_ROOMS } from "./seed";

export class ChatStore {
  rooms: Room[] = [...SEED_ROOMS];
  messages: ChatMessage[] = [...SEED_MESSAGES];
  presence: PresenceMember[] = [];

  snapshot() {
    return {
      rooms: this.rooms,
      messages: this.messages,
      presence: this.presence,
    };
  }

  roomById(roomId: RoomId): Room | undefined {
    return this.rooms.find((r) => r.id === roomId);
  }

  join(user: ChatUser, roomId: RoomId): PresenceMember[] | null {
    if (!this.roomById(roomId)) return null;
    this.presence = this.presence.filter((m) => m.user.id !== user.id);
    this.presence.push({ user, roomId, joinedAt: new Date().toISOString() });
    return this.presence;
  }

  leave(userId: string): PresenceMember[] {
    this.presence = this.presence.filter((m) => m.user.id !== userId);
    return this.presence;
  }

  say(user: ChatUser, roomId: RoomId, raw: string): ChatMessage | "bad-body" | "unknown-room" {
    if (!this.roomById(roomId)) return "unknown-room";
    if (!canSendBody(raw)) return "bad-body";
    const message: ChatMessage = {
      id: newId("msg"),
      roomId,
      author: user,
      body: normalizeBody(raw),
      sentAt: new Date().toISOString(),
    };
    this.messages = [...this.messages, message];
    return message;
  }
}
