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

  return (
    <section className="col" aria-label="Rooms">
      <div className="col-head">rooms in the building</div>
      {rooms.length === 0 ? (
        <QuietState
          title="The directory is blank"
          body="No rooms on this floor yet. If the wire is down, the names will not show."
        />
      ) : (
      <ul className="room-list">
        {previews.map(({ room, lastBody, lastAt, unread: count }) => (
          <li key={room.id}>
            <button
              type="button"
              className="room-btn"
              data-active={room.id === activeRoomId ? "true" : "false"}
              onClick={() => onPick(room.id)}
            >
              <strong>
                {room.name}
                {count > 0 ? <span className="badge">{count}</span> : null}
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
