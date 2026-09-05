"use client";

import { useEffect, useRef } from "react";
import { formatClock, type ChatMessage, type ChatUser, type Room } from "@/domain";
import { QuietState } from "@/ui/empty-states";

type Props = {
  room: Room | null;
  you: ChatUser | null;
  messages: ChatMessage[];
};

export function Thread({ room, you, messages }: Props) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length, room?.id]);

  if (!room) {
    return (
      <QuietState
        title="Grab a booth"
        body="Fire escape is the loud table. Water tower is for when you want the city small."
      />
    );
  }

  return (
    <>
      <div className="thread-copy">
        <h2>{room.name}</h2>
        <p>{room.subtitle}</p>
      </div>
      <div className="scroll" role="log" aria-live="polite">
        {messages.length === 0 ? (
          <QuietState
            title="Napkin is blank"
            body="The fryer pops. You can be first to write on the check."
          />
        ) : null}
        {messages.map((message) => {
          const mine = message.author.id === you?.id;
          return (
            <article key={message.id} className={mine ? "bubble mine" : "bubble"}>
              <div className="who">
                <b>{message.author.displayName}</b>
                <span>{formatClock(message.sentAt)}</span>
              </div>
              <p className="body">{message.body}</p>
            </article>
          );
        })}
        <div ref={endRef} />
      </div>
    </>
  );
}
