"use client";

import { FormEvent, useState } from "react";
import { canSendBody } from "@/domain";

type Props = {
  disabled: boolean;
  onSend: (body: string) => void;
};

export function Composer({ disabled, onSend }: Props) {
  const [draft, setDraft] = useState("");
  const ok = canSendBody(draft) && !disabled;

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!ok) return;
    onSend(draft);
    setDraft("");
  }

  return (
    <form className="composer" onSubmit={submit}>
      <label htmlFor="note">Message</label>
      <div className="composer-row">
        <textarea
          id="note"
          value={draft}
          disabled={disabled}
          placeholder="Message"
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (ok) {
                onSend(draft);
                setDraft("");
              }
            }
          }}
        />
        <button className="send" type="submit" disabled={!ok}>
          Send
        </button>
      </div>
      {disabled ? <p className="preview">Connecting…</p> : null}
    </form>
  );
}
