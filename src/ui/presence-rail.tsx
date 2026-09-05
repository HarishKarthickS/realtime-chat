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
    <aside className="col" aria-label="Who is at the counter">
      <div className="col-head">at the counter</div>
      <div className="presence">
        {members.length === 0 ? (
          <QuietState
            title="Just you and the pie case"
            body="Slide into a booth. Regulars wander in after last call."
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
