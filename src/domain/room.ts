import type { ChatMessage, Room, RoomId } from "./types";
import { lastLine } from "./message";

export type RoomPreview = {
  room: Room;
  lastBody: string;
  lastAt: string | null;
  unread: number;
};

export function previewForRoom(
  room: Room,
  messages: ChatMessage[],
  unreadByRoom: Record<RoomId, number>,
): RoomPreview {
  const inRoom = messages.filter((m) => m.roomId === room.id);
  const last = inRoom.at(-1);
  return {
    room,
    lastBody: last ? lastLine(last.body) : "quiet so far",
    lastAt: last?.sentAt ?? null,
    unread: unreadByRoom[room.id] ?? 0,
  };
}

export function sortPreviews(previews: RoomPreview[]): RoomPreview[] {
  return [...previews].sort((a, b) => {
    if (!a.lastAt && !b.lastAt) return a.room.name.localeCompare(b.room.name);
    if (!a.lastAt) return 1;
    if (!b.lastAt) return -1;
    return b.lastAt.localeCompare(a.lastAt);
  });
}
