"use client";

import { useWire } from "@/data";
import { Composer } from "@/ui/composer";
import { WireError } from "@/ui/empty-states";
import { NamePlate } from "@/ui/name-plate";
import { NightDesk } from "@/ui/night-desk";
import { PresenceRail } from "@/ui/presence-rail";
import { RoomList } from "@/ui/room-list";
import { Thread } from "@/ui/thread";

function statusCopy(connection: ReturnType<typeof useWire>["connection"]): { label: string; bad: boolean } {
  if (connection === "live") return { label: "Connected", bad: false };
  if (connection === "connecting") return { label: "Connecting…", bad: false };
  if (connection === "offline") return { label: "Offline", bad: true };
  if (connection === "error") return { label: "Offline", bad: true };
  return { label: "Connecting…", bad: false };
}

export function DeskApp() {
  const wire = useWire();
  const status = statusCopy(wire.connection);
  const live = wire.connection === "live";

  return (
    <NightDesk
      clockLabel=""
      statusLabel={status.label}
      statusBad={status.bad}
      identity={<NamePlate you={wire.you} onSave={wire.renameYou} />}
    >
      <RoomList
        rooms={wire.rooms}
        messages={wire.messages}
        unread={wire.unread}
        activeRoomId={wire.activeRoomId}
        onPick={wire.joinRoom}
      />
      <section className="thread col">
        {wire.errorDetail && wire.connection !== "live" ? (
          <WireError detail={wire.errorDetail} onRetry={wire.retryNow} />
        ) : null}
        <Thread room={wire.activeRoom} you={wire.you} messages={wire.thread} />
        <Composer disabled={!live || !wire.activeRoom} onSend={wire.say} />
      </section>
      <PresenceRail room={wire.activeRoom} presence={wire.presence} />
    </NightDesk>
  );
}
