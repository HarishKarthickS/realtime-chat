"use client";

import { FormEvent, useEffect, useState } from "react";
import { clampDisplayName, initialsFromName, type ChatUser } from "@/domain";

type Props = {
  you: ChatUser | null;
  onSave: (you: ChatUser) => void;
};

export function NamePlate({ you, onSave }: Props) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(you?.displayName ?? "");

  useEffect(() => {
    setDraft(you?.displayName ?? "");
  }, [you?.displayName]);

  if (!you) return <p className="preview">unsigned</p>;

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!you) return;
    const displayName = clampDisplayName(draft);
    onSave({ ...you, displayName, initials: initialsFromName(displayName) });
    setOpen(false);
  }

  if (!open) {
    return (
      <button type="button" className="room-btn" style={{ padding: "0.2rem 0" }} onClick={() => setOpen(true)}>
        signing as {you.displayName}
      </button>
    );
  }

  return (
    <form onSubmit={submit}>
      <label className="col-head" htmlFor="you-name" style={{ padding: 0 }}>
        what should the building call you
      </label>
      <div className="composer-row">
        <input
          id="you-name"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          style={{
            background: "#0c0b09",
            border: "1px solid var(--rule)",
            padding: "0.4rem 0.5rem",
          }}
        />
        <button className="send" type="submit">
          keep
        </button>
      </div>
    </form>
  );
}
