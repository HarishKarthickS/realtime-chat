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

  if (!you) return <p className="preview">no name on the check</p>;

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!you) return;
    const displayName = clampDisplayName(draft);
    onSave({ ...you, displayName, initials: initialsFromName(displayName) });
    setOpen(false);
  }

  if (!open) {
    return (
      <button type="button" className="name-btn" onClick={() => setOpen(true)}>
        check for {you.displayName}
      </button>
    );
  }

  return (
    <form onSubmit={submit}>
      <label className="col-head" htmlFor="you-name" style={{ padding: 0 }}>
        name on the check
      </label>
      <div className="composer-row">
        <input id="you-name" className="name-field" value={draft} onChange={(e) => setDraft(e.target.value)} />
        <button className="send" type="submit">
          keep
        </button>
      </div>
    </form>
  );
}
