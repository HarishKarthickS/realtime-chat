"use client";

import { membersInRoom, minutesAgo, type PresenceMember, type Room } from "@/domain";
import { QuietState } from "@/ui/empty-states";

type Props = {
  room: Room | null;
  presence: PresenceMember[];
};

export function PresenceRail({ room, presence }: Props) {
  const members = room ? membersInRoom(presence, room.id) : [];

  return (
    <aside className="col" aria-label="Who is still up">
      <div className="col-head">still up</div>
      <div className="presence">
        {members.length === 0 ? (
          <QuietState
            title="You are the only lamp on"
            body="Join a room and wait. People wander in after the last train."
          />
        ) : null}
        {members.map((member) => (
          <div className="person" key={member.user.id}>
            <span className="dot" aria-hidden />
            <div>
              <div>{member.user.displayName}</div>
              <small>
                in {room?.name.toLowerCase()} · {minutesAgo(member.joinedAt) === 0
                  ? "just now"
                  : `${minutesAgo(member.joinedAt)}m`}
              </small>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
