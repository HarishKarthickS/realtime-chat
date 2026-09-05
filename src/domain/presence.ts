import type { PresenceMember, RoomId, UserId } from "./types";

export function membersInRoom(members: PresenceMember[], roomId: RoomId): PresenceMember[] {
  return members
    .filter((m) => m.roomId === roomId)
    .sort((a, b) => a.joinedAt.localeCompare(b.joinedAt));
}

export function isUserPresent(
  members: PresenceMember[],
  roomId: RoomId,
  userId: UserId,
): boolean {
  return members.some((m) => m.roomId === roomId && m.user.id === userId);
}

export function countAwake(members: PresenceMember[], roomId: RoomId): number {
  return membersInRoom(members, roomId).length;
}
