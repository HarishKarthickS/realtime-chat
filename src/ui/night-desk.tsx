import type { ReactNode } from "react";

type Props = {
  clockLabel: string;
  statusLabel: string;
  statusBad?: boolean;
  identity?: ReactNode;
  children: ReactNode;
};

export function NightDesk({ clockLabel, statusLabel, statusBad, identity, children }: Props) {
  return (
    <div className="booth">
      <header className="mast">
        <div>
          <h1>
            booth<span> chat</span>
          </h1>
          <p>open all night · chrome rims</p>
        </div>
        <div className="mast-meta">
          <div className="status-pill" data-bad={statusBad ? "true" : "false"}>
            {statusLabel}
          </div>
          <p>{clockLabel}</p>
          {identity}
        </div>
      </header>
      <div className="booth-body">{children}</div>
    </div>
  );
}
