import type { ReactNode } from "react";

type Props = {
  clockLabel: string;
  statusLabel: string;
  statusBad?: boolean;
  children: ReactNode;
};

export function NightDesk({ clockLabel, statusLabel, statusBad, children }: Props) {
  return (
    <div className="desk">
      <header className="mast">
        <div>
          <h1>
            realtime<span>-chat</span>
          </h1>
          <p>the hallway light is still on · not a status meeting</p>
        </div>
        <div>
          <div className="status-pill" data-bad={statusBad ? "true" : "false"}>
            {statusLabel}
          </div>
          <p>{clockLabel}</p>
        </div>
      </header>
      <div className="desk-body">{children}</div>
    </div>
  );
}
