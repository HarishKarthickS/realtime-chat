import { Children, type ReactNode } from "react";

type Props = {
  clockLabel: string;
  statusLabel: string;
  statusBad?: boolean;
  identity?: ReactNode;
  children: ReactNode;
};

export function NightDesk({ clockLabel, statusLabel, statusBad, identity, children }: Props) {
  const panes = Children.toArray(children);
  const channels = panes[0];
  const thread = panes[1];
  const presence = panes[2];

  return (
    <div className="workspace">
      <aside className="sidebar">
        <header className="workspace-head">
          <h1>realtime-chat</h1>
          <div className="status-pill" data-bad={statusBad ? "true" : "false"}>
            {statusLabel}
          </div>
          {clockLabel ? <p className="workspace-clock">{clockLabel}</p> : null}
        </header>
        <div className="sidebar-channels">{channels}</div>
        <div className="sidebar-foot">{identity}</div>
      </aside>
      {thread}
      {presence}
    </div>
  );
}
