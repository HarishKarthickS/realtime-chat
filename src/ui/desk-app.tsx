"use client";

import { useMemo } from "react";
import { useWire } from "@/data";
import { Composer } from "@/ui/composer";
import { NightDesk } from "@/ui/night-desk";
import { PresenceRail } from "@/ui/presence-rail";
import { RoomList } from "@/ui/room-list";
import { Thread } from "@/ui/thread";

function statusCopy(connection: ReturnType<typeof useWire>["connection"]): { label: string; bad: boolean } {
  if (connection === "live") return { label: "wire live", bad: false };
  if (connection === "connecting") return { label: "plugging the lamp in", bad: false };
  if (connection === "offline") return { label: "wire went quiet", bad: true };
  if (connection === "error") return { label: "socket error", bad: true };
  return { label: "idle", bad: false };
}

export function DeskApp() {
  const wire = useWire();
  const status = statusCopy(wire.connection);
  const clock = useMemo(
    () =>
      new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZone: "America/New_York",
      }) + " · east coast",
    [],
  );

  const live = wire.connection === "live";

  return (
    <NightDesk clockLabel={clock} statusLabel={status.label} statusBad={status.bad}>
      <RoomList
        rooms={wire.rooms}
        messages={wire.messages}
        unread={wire.unread}
        activeRoomId={wire.activeRoomId}
        onPick={wire.joinRoom}
      />
      <section className="thread col">
        <Thread room={wire.activeRoom} you={wire.you} messages={wire.thread} />
        <Composer disabled={!live || !wire.activeRoom} onSend={wire.say} />
      </section>
      <PresenceRail room={wire.activeRoom} presence={wire.presence} />
    </NightDesk>
  );
}
