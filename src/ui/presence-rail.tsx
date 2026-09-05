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
    <aside className="col" aria-label="Members">
      <div className="col-head">Members</div>
      <div className="presence">
        {members.length === 0 ? (
          <QuietState title="No one here" body="People in this channel show up when they join." />
        ) : null}
        {members.map((member) => (
          <div className="person" key={member.user.id}>
            <span className="dot" aria-hidden />
            <div>
              <div>{member.user.displayName}</div>
              <small>
                {minutesAgo(member.joinedAt) === 0 ? "Active now" : `Active ${minutesAgo(member.joinedAt)}m ago`}
              </small>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
