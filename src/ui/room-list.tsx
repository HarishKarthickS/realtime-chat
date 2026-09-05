"use client";

import { formatClock, previewForRoom, sortPreviews, type ChatMessage, type Room, type RoomId } from "@/domain";
import { QuietState } from "@/ui/empty-states";

type Props = {
  rooms: Room[];
  messages: ChatMessage[];
  unread: Record<RoomId, number>;
  activeRoomId: RoomId | null;
  onPick: (roomId: RoomId) => void;
};

export function RoomList({ rooms, messages, unread, activeRoomId, onPick }: Props) {
  const previews = sortPreviews(rooms.map((room) => previewForRoom(room, messages, unread)));
  const unreadRooms = previews.filter((item) => item.unread > 0);
  const showBadgeOn = unreadRooms[0]?.room.id ?? null;

  return (
    <section aria-label="Channels">
      <div className="col-head">Channels</div>
      {rooms.length === 0 ? (
        <QuietState title="No channels" body="Channels appear once the socket connects." />
      ) : (
        <ul className="room-list">
          {previews.map(({ room, lastBody, lastAt, unread: count }) => (
            <li key={room.id}>
              <button
                type="button"
                className="ticket"
                data-active={room.id === activeRoomId ? "true" : "false"}
                onClick={() => onPick(room.id)}
              >
                <strong>
                  #{room.name}
                  {count > 0 && room.id === showBadgeOn ? (
                    <span className="badge" title="Unread">
                      Unread
                    </span>
                  ) : null}
                </strong>
                <em>{room.subtitle}</em>
                <span className="preview">
                  {lastBody}
                  {lastAt ? ` · ${formatClock(lastAt)}` : ""}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
